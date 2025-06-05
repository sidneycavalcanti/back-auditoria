import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';
import Usuario from '../models/Usuario.js';
import Fluxo from '../models/Fluxo.js';
import sequelize from '../config/database.js'; 

import { Op } from 'sequelize';

class AuditoriaService {

  //novo metodo para criação de auditoria e fluxo de pessoas
  async createAuditoriaComFluxos(data) {
    const t = await sequelize.transaction();
    try {
      // Cria a auditoria
      const novaAuditoria = await Auditoria.create(data, { transaction: t });

      // Dados fixos que você quer criar
      const categorias = ['outros', 'acompanhante', 'especulador']; //array de categoria
      const sexos = ['masculino', 'feminino']; // array de sexo

      // Cria os 6 fluxos
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

  // Método para buscar auditorias com filtros e busca por texto nos nomes
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

    // Ordenação (ex: sort=data:desc,horaInicial:asc)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    } else {
      order = [['data', 'DESC']]; // padrão
    }

    const offset = (page - 1) * limit;

    // Monta os includes ajustados para busca por texto
    let include = [
      {
        model: Loja,
        as: 'loja',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
      {
        model: Usuario,
        as: 'criador',
        attributes: ['id', 'name'],
        ...(search ? { where: { name: { [Op.like]: `%${search}%` } }, required: false } : {}),
      },
    ];

    // Executa consulta
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
      distinct: true, // evita contagem duplicada se houver joins
    });

    return {
      auditoria: auditoria.rows,
      totalItems: auditoria.count,
      totalPages: Math.ceil(auditoria.count / limit),
      currentPage: page,
    };
  }

  // Método para buscar uma auditoria por ID
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
        console.error(`Auditoria não encontrada com ID: ${id}`);
        throw new Error('Auditoria não encontrada.');
      }

      return auditoria;
    } catch (error) {
      console.error('Erro ao buscar auditoria:', error.message);
      throw error;
    }
  }

  // Método para criar uma nova auditoria
  async createAuditoria(data) {
    return await Auditoria.create(data);
  }

  // Método para atualizar uma auditoria existente
  async updateAuditoria(id, updateData) {
    const [updated] = await Auditoria.update(updateData, {
      where: { id },
    });

    if (updated) {
      return await this.getAuditoriaById(id);
    }

    throw new Error('Auditoria não encontrada para atualizar.');
  }

  // Método para deletar uma auditoria
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

  // Busca auditorias do usuário (mantido como estava)
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
