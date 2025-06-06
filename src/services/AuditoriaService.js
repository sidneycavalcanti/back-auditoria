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
    limit = 10,
    search,
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
    page = parseInt(page);
    limit = parseInt(limit);

    let where = {};
    let order = [];

    // Filtros simples
    if (lojaId) where.lojaId = lojaId;
    if (usuarioId) where.usuarioId = usuarioId;
    if (criadorId) where.criadorId = criadorId;
    if (data) where.data = data;
    if (horaInicial) where.horaInicial = horaInicial;
    if (horaFinal) where.horaFinal = horaFinal;

    // Filtros por datas de criação e atualização
    if (createdBefore) {
      where.createdAt = { ...(where.createdAt || {}), [Op.lte]: createdBefore };
    }
    if (createdAfter) {
      where.createdAt = { ...(where.createdAt || {}), [Op.gte]: createdAfter };
    }
    if (updatedBefore) {
      where.updatedAt = { ...(where.updatedAt || {}), [Op.lte]: updatedBefore };
    }
    if (updatedAfter) {
      where.updatedAt = { ...(where.updatedAt || {}), [Op.gte]: updatedAfter };
    }

    // Busca global por nome em relacionamentos
    if (search) {
      const searchTerm = `%${search}%`;
      where[Op.or] = [
        literal(`EXISTS (SELECT 1 FROM lojas WHERE lojas.id = Auditoria.lojaId AND lojas.name LIKE ${sequelize.escape(searchTerm)})`),
        literal(`EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = Auditoria.usuarioId AND usuarios.name LIKE ${sequelize.escape(searchTerm)})`),
        literal(`EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = Auditoria.criadorId AND usuarios.name LIKE ${sequelize.escape(searchTerm)})`)
      ];
    }

    // Ordenação (ex: sort=data:desc,horaInicial:asc)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    } else {
      order = [['data', 'DESC']];
    }

    const offset = (page - 1) * limit;

    const include = [
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
    ];

    const auditoria = await Auditoria.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: [
        'id', 'lojaId', 'usuarioId', 'criadorId',
        'data', 'horaInicial', 'horaFinal',
        'createdAt', 'updatedAt'
      ],
      include,
      distinct: true,
    });

    return {
      auditoria: auditoria.rows,
      totalItems: auditoria.count,
      totalPages: Math.ceil(auditoria.count / limit),
      currentPage: page,
    };
  }

  // Busca auditoria por ID
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

  // Criação simples de auditoria
  async createAuditoria(data) {
    return await Auditoria.create(data);
  }

  // Atualização de auditoria
  async updateAuditoria(id, updateData) {
    const [updated] = await Auditoria.update(updateData, {
      where: { id },
    });

    if (updated) {
      return await this.getAuditoriaById(id);
    }

    throw new Error('Auditoria não encontrada para atualizar.');
  }

  // Exclusão de auditoria e seus fluxos
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

  // Busca auditorias de um usuário
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
