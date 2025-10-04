import VendasService from '../services/vendasService.js';

class VendasController {
    async index(req, res) {
        try {
            const {
                page = 1, limit = 10, auditoriaId, usuarioId, troca,
                createdBefore, createdAfter, updatedBefore, updatedAfter, sort,
                lojaId, lojaName,
                mes, ano, dateFrom, dateTo, dia,
                sexoId, formaPagamentoId,
            } = req.query;

            const vendas = await VendasService.getVendas({
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
                auditoriaId,
                usuarioId,
                troca,
                createdBefore,
                createdAfter,
                updatedBefore,
                updatedAfter,
                sort,
                lojaId: lojaId ? Number(lojaId) : undefined,
                lojaName,
                mes: mes ? Number(mes) : undefined,
                ano: ano ? Number(ano) : undefined,
                dia: dia ? Number(dia) : undefined,
                dateFrom,
                dateTo,
                sexoId: sexoId ? Number(sexoId) : undefined,
                formaPagamentoId: formaPagamentoId ? Number(formaPagamentoId) : undefined,
            });

            return res.status(200).json(vendas);
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
            res.status(500).json({ error: 'Erro ao buscar vendas', detalhes: error.message });
        }
    }

    async show(req, res) {
        try {
            const vendas = await VendasService.getVendasById(req.params.id);
            if (!vendas) return res.status(404).json({ error: 'Vendas não encontrada' });
            return res.status(200).json(vendas);
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
            return res.status(500).json({ error: 'Erro ao buscar Vendas', detalhes: error.message });
        }
    }

    async create(req, res) {
        try {
            const vendas = await VendasService.createVendas(req.body);
            return res.status(201).json(vendas);
        } catch (error) {
            console.error('Erro ao criar Vendas:', error);
            res.status(500).json({ error: 'Erro ao criar Vendas', detalhes: error.message });
        }
    }

    async update(req, res) {
        try {
            const vendas = await VendasService.updateVendas(req.params.id, req.body);
            return res.status(200).json(vendas);
        } catch (error) {
            console.error('Erro ao atualizar vendas:', error);
            res.status(500).json({ error: 'Erro ao atualizar vendas', detalhes: error.message });
        }
    }

    async destroy(req, res) {
        try {
            await VendasService.deleteVendas(req.params.id);
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir vendas:', error);
            res.status(500).json({ error: 'Erro ao excluir vendas', detalhes: error.message });
        }
    }

    /* ======== ENDPOINTS DE RELATÓRIOS ======== */

    // GET /vendas/reports/resumo-mensal?lojaId=123&ano=2025&mes=9
    async resumoMensal(req, res) {
        try {
            const lojaId = req.query.lojaId ? Number(req.query.lojaId) : undefined;
            const ano = Number(req.query.ano);
            const mes = Number(req.query.mes);
            if (!lojaId || !ano || !mes) {
                return res.status(400).json({ error: 'Parâmetros obrigatórios: lojaId, ano, mes' });
            }
            const data = await VendasService.resumoMensal({ lojaId, ano, mes });
            res.status(200).json(data);
        } catch (error) {
            console.error('Erro no resumo mensal:', error);
            res.status(500).json({ error: 'Erro no resumo mensal', detalhes: error.message });
        }
    }

    // GET /vendas/reports/resumo-diario?lojaId=123&date=2025-09-30
    async resumoDiario(req, res) {
        try {
            const lojaId = req.query.lojaId ? Number(req.query.lojaId) : undefined;
            const date = String(req.query.date || '').slice(0, 10);
            if (!lojaId || !date) {
                return res.status(400).json({ error: 'Parâmetros obrigatórios: lojaId, date(YYYY-MM-DD)' });
            }
            const data = await VendasService.resumoDiario({ lojaId, date });
            res.status(200).json(data);
        } catch (error) {
            console.error('Erro no resumo diário:', error);
            res.status(500).json({ error: 'Erro no resumo diário', detalhes: error.message });
        }
    }

    // GET /vendas/reports/por-hora?lojaId=123&ano=2025&mes=9&semana=4
    // ou   /vendas/reports/por-hora?lojaId=123&dateFrom=2025-09-01&dateTo=2025-09-07
    async comparativoHora(req, res) {
        try {
            const lojaId = req.query.lojaId ? Number(req.query.lojaId) : undefined;
            const { dateFrom, dateTo } = req.query;
            const ano = req.query.ano ? Number(req.query.ano) : undefined;
            const mes = req.query.mes ? Number(req.query.mes) : undefined;
            const semana = req.query.semana ? Number(req.query.semana) : undefined;

            if (!lojaId) return res.status(400).json({ error: 'Parâmetro obrigatório: lojaId' });

            const data = await VendasService.comparativoPorHora({
                lojaId, dateFrom, dateTo, ano, mes, semana,
            });
            res.status(200).json(data);
        } catch (error) {
            console.error('Erro no comparativo por hora:', error);
            res.status(500).json({ error: 'Erro no comparativo por hora', detalhes: error.message });
        }
    }
}

export default new VendasController();