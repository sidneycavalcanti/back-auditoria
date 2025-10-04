import Vendas from '../models/Vendas.js';
import Auditoria from '../models/Auditoria.js';
import Usuario from '../models/Usuario.js';
import Formadepagamento from '../models/Formadepagamento.js';
import Loja from '../models/Loja.js';
import Cadsexo from '../models/Cadsexo.js';

// Se você já tem modelos para Fluxo e Perdas, importe-os aqui.
// Ajuste os nomes se forem diferentes no seu projeto.
import Fluxopessoas from '../models/Fluxo.js';
import Perdasvendas from '../models/Perdas.js';
import Motivoperdas from '../models/Motivoperdas.js';

import { Op } from 'sequelize';

/* ======================= helpers ======================= */
const pad2 = (n) => String(n).padStart(2, '0');
const diasNoMes = (ano, mes1) => new Date(ano, mes1, 0).getDate();

function buildRange({ ano, mes, dia, dateFrom, dateTo }) {
    if (dateFrom && dateTo) {
        return { from: String(dateFrom).slice(0, 10), to: String(dateTo).slice(0, 10) };
    }
    if (ano && mes && dia) {
        const ymd = `${ano}-${pad2(mes)}-${pad2(dia)}`;
        return { from: ymd, to: ymd };
    }
    if (ano && mes) {
        const from = `${ano}-${pad2(mes)}-01`;
        const to = `${ano}-${pad2(mes)}-${pad2(diasNoMes(ano, mes))}`;
        return { from, to };
    }
    return null;
}

function turnoByDatetime(dt) {
    const h = new Date(dt).getHours();
    if (h >= 6 && h < 12) return 'manha';
    if (h >= 12 && h < 18) return 'tarde';
    return 'noite';
}

const emptyTurnos = () => ({
    geral: { valor: 0, qtd: 0 },
    manha: { valor: 0, qtd: 0 },
    tarde: { valor: 0, qtd: 0 },
    noite: { valor: 0, qtd: 0 },
});

function aggregateVendasTurnos(vendas, predicate = () => true) {
    const out = emptyTurnos();
    for (const v of vendas) {
        if (!predicate(v)) continue;
        const dtRef = v.createdAt ?? v.auditoria?.data;
        const t = turnoByDatetime(dtRef);
        const valor = Number(v.valor) || 0;

        out.geral.valor += valor;
        out.geral.qtd += 1;

        out[t].valor += valor;
        out[t].qtd += 1;
    }
    return out;
}

function aggregateFluxoTurnos(regs, predicate = () => true) {
    const out = emptyTurnos();
    for (const f of regs) {
        if (!predicate(f)) continue;
        const dtRef = f.createdAt ?? f.auditoria?.data;
        const t = turnoByDatetime(dtRef);
        const qtd = typeof f.quantidade === 'number' ? f.quantidade : 1;

        out.geral.qtd += qtd;
        out[t].qtd += qtd;
    }
    return out;
}

function normTxt(s) {
    return String(s ?? '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}
function matchMotivo(perda, key) {
    const name = normTxt(perda.motivoperdas?.name ?? perda.motivoName);
    switch (key) {
        case 'preco': return name.includes('preco');
        case 'modelo': return name.includes('modelo');
        case 'tamanho': return name.includes('tamanho');
        case 'cor': return name.includes('cor');
        case 'forma-pagamento': return name.includes('forma') && name.includes('pag');
        case 'falta-mercadoria': return name.includes('falta') || name.includes('mercador') || name.includes('estoque');
        case 'atendimento': return name.includes('atendimento');
        case 'outros': return name.includes('outro');
        default: return false;
    }
}

function auditoriaInclude({ range, lojaId, lojaName }) {
    const whereAud = {};
    if (range) whereAud.data = { [Op.between]: [range.from, range.to] };
    return {
        model: Auditoria,
        as: 'auditoria',
        required: true,
        attributes: ['id', 'data'],
        where: whereAud,
        include: [
            {
                model: Loja,
                as: 'loja',
                attributes: ['id', 'name'],
                ...(lojaId ? { where: { id: lojaId }, required: true } : {}),
                ...(lojaName ? { where: { name: { [Op.like]: `%${lojaName}%` } } } : {}),
            },
            { model: Usuario, as: 'usuario', attributes: ['id', 'name'] },
        ],
    };
}

/* ======================= service ======================= */
class VendasService {
    /* ------- listagem base ------- */
    async getVendas({
        page = 1, limit = 10, id, auditoriaId, usuarioId,
        troca, createdBefore, createdAfter, updatedBefore, updatedAfter, sort,
        lojaId, lojaName, mes, ano, dateFrom, dateTo, dia,
        sexoId, formaPagamentoId,
    }) {
        let where = {};
        let order = [];

        if (id) where = { ...where, id };
        if (auditoriaId) where = { ...where, auditoriaId };
        if (usuarioId) where = { ...where, usuarioId };
        if (typeof troca !== 'undefined') where = { ...where, troca };
        if (sexoId) where = { ...where, sexoId };
        if (formaPagamentoId) where = { ...where, formadepagamentoId: formaPagamentoId };

        if (createdBefore) where.createdAt = { ...where.createdAt, [Op.lte]: new Date(createdBefore) };
        if (createdAfter) where.createdAt = { ...where.createdAt, [Op.gte]: new Date(createdAfter) };
        if (updatedBefore) where = { ...where, updatedAt: { [Op.gte]: updatedBefore } };
        if (updatedAfter) where = { ...where, updatedAt: { [Op.lte]: updatedAfter } };

        if (sort) order = sort.split(',').map((item) => item.split(':'));
        const offset = (page - 1) * limit;

        const range = buildRange({ ano, mes, dia, dateFrom, dateTo });

        const vendas = await Vendas.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            include: [
                auditoriaInclude({ range, lojaId, lojaName }),
                { model: Formadepagamento, as: 'formadepagamento', attributes: ['id', 'name'] },
                { model: Cadsexo, as: 'sexo', attributes: ['id', 'name'] },
            ],
        });

        return {
            vendas: vendas.rows,
            totalItems: vendas.count,
            totalPages: Math.ceil(vendas.count / limit),
            currentPage: page,
        };
    }

    async getVendasById(id) {
        return await Vendas.findByPk(id, {
            attributes: {},
            include: [
                {
                    model: Auditoria,
                    as: 'auditoria',
                    attributes: ['id', 'data'],
                    include: [
                        { model: Loja, as: 'loja', attributes: ['id', 'name'] },
                        { model: Usuario, as: 'usuario', attributes: ['id', 'name'] },
                    ],
                },
                { model: Formadepagamento, as: 'formadepagamento', attributes: ['id', 'name'] },
                { model: Cadsexo, as: 'sexo', attributes: ['id', 'name'] },
            ],
        });
    }

    async createVendas(data) {
        return await Vendas.create(data);
    }

    async updateVendas(id, updateData) {
        const [updated] = await Vendas.update(updateData, { where: { id } });
        if (updated) return await this.getVendasById(id);
        throw new Error('Vendas não encontrada');
    }

    async deleteVendas(id) {
        const vendas = await this.getVendasById(id);
        if (!vendas) throw new Error('Vendas não encontrada');
        return await Vendas.destroy({ where: { id } });
    }

    /* ================== RELATÓRIOS ================== */

    /** agrega linhas para a tabela do resumo (mensal/diário) */
    _buildResumoRows({ vendas, fluxo, perdas }) {
        // VENDAS
        const totalVendas = aggregateVendasTurnos(vendas);
        const femValor = aggregateVendasTurnos(vendas, v => v.sexoId === 2);
        const masValor = aggregateVendasTurnos(vendas, v => v.sexoId === 1);
        const femQtd = aggregateVendasTurnos(vendas, v => v.sexoId === 2);
        const masQtd = aggregateVendasTurnos(vendas, v => v.sexoId === 1);

        // FLUXO
        const fluxoFem = aggregateFluxoTurnos(fluxo, f => String(f.sexo ?? '').toLowerCase() === 'feminino');
        const fluxoMas = aggregateFluxoTurnos(fluxo, f => String(f.sexo ?? '').toLowerCase() === 'masculino');
        const fluxoGeral = aggregateFluxoTurnos(fluxo);

        // PERDAS (apenas contagem)
        const perdasPreco = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'preco'));
        const perdasModelo = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'modelo'));
        const perdasTam = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'tamanho'));
        const perdasCor = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'cor'));
        const perdasFPag = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'forma-pagamento'));
        const perdasFalta = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'falta-mercadoria'));
        const perdasAtend = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'atendimento'));
        const perdasOutros = aggregateFluxoTurnos(perdas, p => matchMotivo(p, 'outros'));

        return [
            { label: 'Total do valor de vendas', kind: 'valor', data: totalVendas },
            { label: 'Total do valor de vendas feminino', kind: 'valor', data: femValor },
            { label: 'Total do valor de vendas masculino', kind: 'valor', data: masValor },

            { label: 'Total do número de vendas feminino', kind: 'qtd', data: femQtd },
            { label: 'Total do número de vendas masculino', kind: 'qtd', data: masQtd },
            { label: 'Total do número de vendas', kind: 'qtd', data: totalVendas },

            { label: 'Total do fluxo feminino', kind: 'fluxo', data: fluxoFem },
            { label: 'Total do fluxo masculino', kind: 'fluxo', data: fluxoMas },
            { label: 'Total do fluxo de público', kind: 'fluxo', data: fluxoGeral },

            { label: 'Total de Vendas Perdidas - Preço', kind: 'perda', data: perdasPreco },
            { label: 'Total de Vendas Perdidas - Modelo', kind: 'perda', data: perdasModelo },
            { label: 'Total de Vendas Perdidas - Tamanho', kind: 'perda', data: perdasTam },
            { label: 'Total de Vendas Perdidas - Cor', kind: 'perda', data: perdasCor },
            { label: 'Total de Vendas Perdidas - Forma de Pagamento', kind: 'perda', data: perdasFPag },
            { label: 'Total de Vendas Perdidas - Falta de Mercadoria', kind: 'perda', data: perdasFalta },
            { label: 'Total de Vendas Perdidas - Atendimento', kind: 'perda', data: perdasAtend },
            { label: 'Total de Vendas Perdidas - Outros', kind: 'perda', data: perdasOutros },
        ];
    }

    /** Resumo mensal (vendas + fluxo + perdas) */
    async resumoMensal({ lojaId, ano, mes }) {
        const range = buildRange({ ano, mes });

        // VENDAS
        const vendas = await Vendas.findAll({
            where: {},
            include: [
                auditoriaInclude({ range, lojaId }),
                { model: Cadsexo, as: 'sexo', attributes: ['id', 'name'] },
            ],
        });

        // FLUXO
        const fluxo = await Fluxopessoas.findAll({
            where: {},
            include: [auditoriaInclude({ range, lojaId })],
        });

        // PERDAS
        const perdas = await Perdasvendas.findAll({
            where: {},
            include: [
                auditoriaInclude({ range, lojaId }),
                { model: Motivoperdas, as: 'motivoperdas', attributes: ['id', 'name'] },
            ],
        });

        return {
            periodo: { ano, mes },
            lojaId,
            rows: this._buildResumoRows({ vendas, fluxo, perdas }),
        };
    }

    /** Resumo diário (vendas + fluxo + perdas) */
    async resumoDiario({ lojaId, date }) {
        const [y, m, d] = date.split('-').map(Number);
        const range = buildRange({ ano: y, mes: m, dia: d });

        const vendas = await Vendas.findAll({
            where: {},
            include: [
                auditoriaInclude({ range, lojaId }),
                { model: Cadsexo, as: 'sexo', attributes: ['id', 'name'] },
            ],
        });

        const fluxo = await Fluxopessoas.findAll({
            where: {},
            include: [auditoriaInclude({ range, lojaId })],
        });

        const perdas = await Perdasvendas.findAll({
            where: {},
            include: [
                auditoriaInclude({ range, lojaId }),
                { model: Motivoperdas, as: 'motivoperdas', attributes: ['id', 'name'] },
            ],
        });

        return {
            lojaId,
            date,
            rows: this._buildResumoRows({ vendas, fluxo, perdas }),
        };
    }

    /** Comparativo por hora (mantém igual ao anterior — só vendas) */
    async comparativoPorHora({ lojaId, dateFrom, dateTo, ano, mes, semana }) {
        let range;
        if (ano && mes && semana) {
            const starts = [1, 8, 15, 22, 29];
            const di = starts[semana - 1];
            const df = Math.min(di + 6, diasNoMes(ano, mes));
            range = { from: `${ano}-${pad2(mes)}-${pad2(di)}`, to: `${ano}-${pad2(mes)}-${pad2(df)}` };
        } else {
            range = buildRange({ dateFrom, dateTo, ano, mes });
        }

        const vendas = await Vendas.findAll({
            where: {},
            include: [auditoriaInclude({ range, lojaId })],
        });

        const horas = Array.from({ length: 15 }, (_, i) => 9 + i); // 9..23
        const matriz = horas.map(() => Array(7).fill(0));

        for (const v of vendas) {
            const dt = new Date(v.createdAt ?? v.auditoria?.data);
            const dow = dt.getDay();
            const h = dt.getHours();
            const valor = Number(v.valor) || 0;
            if (dow >= 0 && dow <= 6 && h >= 9 && h <= 23) {
                matriz[h - 9][dow] += valor;
            }
        }

        const rows = horas.map((h, idx) => {
            const valores = matriz[idx];
            const totalLinha = valores.reduce((a, b) => a + b, 0);
            return { intervalo: `${pad2(h)}:00 / ${pad2(h + 1)}:00`, valores, totalLinha };
        });

        const totaisColuna = Array(7).fill(0);
        for (let c = 0; c < 7; c++) for (let r = 0; r < matriz.length; r++) totaisColuna[c] += matriz[r][c];
        const totalGeral = totaisColuna.reduce((a, b) => a + b, 0);

        const diasCabecalho = (() => {
            if (!range) return Array(7).fill(null);
            const [y, m] = range.from.split('-').map(Number);
            const di = Number(range.from.slice(8, 10));
            const df = Number(range.to.slice(8, 10));
            const out = Array(7).fill(null);
            for (let day = di; day <= df; day++) {
                const d = new Date(y, m - 1, day);
                out[d.getDay()] = day;
            }
            return out;
        })();

        const periodoTexto = (() => {
            if (!range) return '';
            return `PERÍODO ${range.from.slice(8, 10)} À ${range.to.slice(8, 10)}/${range.from.slice(5, 7)}/${range.from.slice(0, 4)}`;
        })();

        return { rows, totaisColuna, totalGeral, diasCabecalho, periodoTexto };
    }
}

export default new VendasService();