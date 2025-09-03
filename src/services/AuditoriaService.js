import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';
import Usuario from '../models/Usuario.js';
import Fluxo from '../models/Fluxo.js';
import sequelize from '../config/database.js';
import { Op, literal } from 'sequelize';

class AuditoriaService {
  // Criação de auditoria com fluxos automáticos
  async createAuditoriaComFluxos(data) {
    const t = await sequelize.transaction();
    try {
      const novaAuditoria = await Auditoria.create(data, { transaction: t });
      const categorias = ['outros', 'acompanhante', 'especulador'];
      const sexos = ['masculino', 'feminino'];

      for (const categoria of categorias) {
        for (const sexo of sexos) {
          await Fluxo.create({
            lojaId: novaAuditoria.lojaId,
            auditoriaId: novaAuditoria.id,
            categoria,
            sexo,
            quantidade: 0,
          }, { transaction: t });
        }
      }

      await t.commit();
      return novaAuditoria;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // Busca auditorias com filtros e busca por texto em nomes relacionados
  async getAuditoria({
  page = 1,
  limit,            // pode vir como limit…
  quantidade,       // …ou como quantidade (do front)
  search,           // pode vir como search…
  q,                // …ou como q (do front)
  lojaId,
  usuarioId,
  criadorId,
  data,
  horaInicial,
  horaFinal,
  createdBefore,
  createdAfter,
  updatedBefore,
  updatedAfter,
  sort,
}) {
  // normaliza params
  const take = parseInt(limit ?? quantidade ?? 10);
  const pageNum = Math.max(1, parseInt(page));

  const where = {};
  if (lojaId) where.lojaId = lojaId;
  if (usuarioId) where.usuarioId = usuarioId;
  if (criadorId) where.criadorId = criadorId;
  if (data) where.data = data;
  if (horaInicial) where.horaInicial = horaInicial;
  if (horaFinal) where.horaFinal = horaFinal;

  if (createdBefore) where.createdAt = { ...(where.createdAt || {}), [Op.lte]: createdBefore };
  if (createdAfter)  where.createdAt = { ...(where.createdAt || {}), [Op.gte]: createdAfter  };
  if (updatedBefore) where.updatedAt = { ...(where.updatedAt || {}), [Op.lte]: updatedBefore };
  if (updatedAfter)  where.updatedAt = { ...(where.updatedAt || {}), [Op.gte]: updatedAfter  };

  // busca livre: aceita ?search= ou ?q=
  const term = ((search ?? q) || '').toString().trim().toLowerCase();
  if (term) {
    const lojaTable      = Loja.getTableName();
    const usuarioTable   = Usuario.getTableName();
    const auditoriaTable = Auditoria.getTableName();
    const like = `%${term}%`;

    // Usa LOWER(...) LIKE ? e referencia tabela da Auditoria também pelo nome real
    where[Op.or] = [
      literal(`EXISTS (SELECT 1 FROM \`${lojaTable}\` WHERE \`${lojaTable}\`.id = \`${auditoriaTable}\`.lojaId AND LOWER(\`${lojaTable}\`.name) LIKE ${sequelize.escape(like)})`),
      literal(`EXISTS (SELECT 1 FROM \`${usuarioTable}\` WHERE \`${usuarioTable}\`.id = \`${auditoriaTable}\`.usuarioId AND LOWER(\`${usuarioTable}\`.name) LIKE ${sequelize.escape(like)})`),
      literal(`EXISTS (SELECT 1 FROM \`${usuarioTable}\` WHERE \`${usuarioTable}\`.id = \`${auditoriaTable}\`.criadorId AND LOWER(\`${usuarioTable}\`.name) LIKE ${sequelize.escape(like)})`),
    ];
  }

  const order = sort
    ? String(sort).split(',').map((i) => i.split(':'))
    : [['data', 'DESC'], ['createdAt', 'DESC']];

  const include = [
    { model: Loja,     as: 'loja',    attributes: ['id','name'], required: false },
    { model: Usuario,  as: 'usuario', attributes: ['id','name'], required: false },
    { model: Usuario,  as: 'criador', attributes: ['id','name'], required: false },
  ];

  // conta total primeiro (com include para manter LEFT JOIN)
  const totalItems = await Auditoria.count({ where, include, distinct: true });
  const totalPages = Math.max(1, Math.ceil(totalItems / take));
  const safePage   = Math.min(pageNum, totalPages);

  const auditoria = await Auditoria.findAll({
    where, include, order,
    limit: take,
    offset: (safePage - 1) * take,
    attributes: [
      'id','lojaId','usuarioId','criadorId',
      'data','horaInicial','horaFinal','createdAt','updatedAt'
    ],
    distinct: true,
  });

  return {
    auditoria,
    totalItems,
    totalPages,
    currentPage: safePage,
  };
}

  async getAuditoriaById(id) {
    try {
      const auditoria = await Auditoria.findByPk(id, {
        attributes: [
          'id', 'lojaId', 'usuarioId', 'criadorId',
          'data', 'horaInicial', 'horaFinal',
          'createdAt', 'updatedAt'
        ],
        include: [
          {
            model: Loja,
            as: 'loja',
            attributes: ['id', 'name'],
          },
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['id', 'name'],
          },
          {
            model: Usuario,
            as: 'criador',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!auditoria) {
        throw new Error('Auditoria não encontrada.');
      }

      return auditoria;
    } catch (error) {
      throw error;
    }
  }

  async createAuditoria(data) {
    return await Auditoria.create(data);
  }

  async updateAuditoria(id, updateData) {
    const [updated] = await Auditoria.update(updateData, {
      where: { id },
    });

    if (updated) {
      return await this.getAuditoriaById(id);
    }

    throw new Error('Auditoria não encontrada para atualizar.');
  }

  async deleteAuditoria(id) {
    const t = await sequelize.transaction();
    try {
      const auditoria = await Auditoria.findByPk(id, { transaction: t });
      if (!auditoria) {
        throw new Error('Auditoria não encontrada para exclusão.');
      }

      await Fluxo.destroy({
        where: { auditoriaId: id },
        transaction: t
      });

      await Auditoria.destroy({
        where: { id },
        transaction: t
      });

      await t.commit();
      return { message: 'Auditoria e fluxos excluídos com sucesso.' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getAuditoriaUser({ usuarioId, page = 1, limit = 10, ...filters }) {
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const where = {};

    if (usuarioId) {
      where.usuarioId = usuarioId;
    }
    if (filters.lojaId) {
      where.lojaId = filters.lojaId;
    }
    if (filters.data) {
      where.data = filters.data;
    }
    if (filters.horaInicial) {
      where.horaInicial = filters.horaInicial;
    }
    if (filters.horaFinal) {
      where.horaFinal = filters.horaFinal;
    }

    const auditorias = await Auditoria.findAndCountAll({
      where,
      limit,
      offset,
      order: [['data', 'DESC']],
      attributes: [
        'id', 'lojaId', 'usuarioId',
        'data', 'horaInicial', 'horaFinal',
        'createdAt', 'updatedAt'
      ],
      include: [
        {
          model: Loja,
          as: 'loja',
          attributes: ['id', 'name'],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      auditoria: auditorias.rows,
      totalItems: auditorias.count,
      totalPages: Math.ceil(auditorias.count / limit),
      currentPage: page,
    };
  }
}

export default new AuditoriaService();
