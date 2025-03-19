import Avoperacional from '../models/Avoperacional.js';
import Cadavoperacional from '../models/Cadavoperacional.js';
import Cadquestoes from '../models/Cadquestoes.js';
import Usuario from '../models/Usuario.js';
import Loja from '../models/Loja.js';
import Auditoria from '../models/Auditoria.js';

import { Op } from 'sequelize';

class AvoperacionalService {
  async getAvoperacional({
    page = 1,
    limit = 10,
    auditoriaId,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort
  }) {
    // Garantia que page, limit e auditoriaId sejam valores numéricos válidos
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let where = {};
    let order = [['createdAt', 'DESC']];

    // Filtro por AuditoriaID (se fornecido)
    if (auditoriaId) {
      where.auditoriaId = parseInt(auditoriaId, 10);
    }

    // Filtros opcionais de data
    if (createdBefore) {
      where.createdAt = { [Op.gte]: createdBefore };
    }
    if (createdAfter) {
      where.createdAt = { ...where.createdAt, [Op.lte]: createdAfter };
    }
    if (updatedBefore) {
      where.updatedAt = { [Op.gte]: updatedBefore };
    }
    if (updatedAfter) {
      where.updatedAt = { ...where.updatedAt, [Op.lte]: updatedAfter };
    }

    // Opção para ordenação dinâmica (caso venha na requisição)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    console.log('🔍 Buscando avaliação com os seguintes parâmetros:', {
      page,
      limit,
      auditoriaId,
      where,
      order
    });

    // Aqui, adicionamos o include de Cadquestoes para trazer os dados relacionados
    const avoperacional = await Avoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: [
        'id',
        'resposta',
        'nota',        // Se você adicionou o campo "nota" no modelo
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
          attributes: ['id', 'descricao']
        },
        {
          model: Cadquestoes,
          as: 'cadquestoes',            // <-- Incluindo dados de Cadquestoes
          attributes: ['id', 'name', 'situacao']
        },
        {
          model: Auditoria,
          as: 'auditoria',
          attributes: ['id', 'data'],
          include: [
            {
              model: Loja,
              as: 'loja',
              attributes: ['id', 'name']
            },
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });

    return {
      avaliacoes: avoperacional.rows,
      totalItems: avoperacional.count,
      totalPages: Math.ceil(avoperacional.count / limit),
      currentPage: page
    };
  }

  async getAvoperacionalById(id) {
    return await Avoperacional.findByPk(id, {
      attributes: [
        'id',
        'resposta',
        'nota', // Se quiser exibir a nota individualmente
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
          attributes: ['id', 'descricao']
        },
        {
          model: Cadquestoes,
          as: 'cadquestoes', // Incluindo dados de Cadquestoes
          attributes: ['id', 'name', 'situacao']
        },
        {
          model: Auditoria,
          as: 'auditoria',
          attributes: ['id', 'data'],
          include: [
            {
              model: Loja,
              as: 'loja',
              attributes: ['id', 'name']
            },
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
  }

  async createAvoperacional(data) {
    return await Avoperacional.create(data);
  }

  async updateAvoperacional(id, updateData) {
    const [updated] = await Avoperacional.update(updateData, { where: { id } });

    if (updated) {
      return await this.getAvoperacionalById(id);
    }
    throw new Error('Avaliação não encontrada');
  }

  async deleteAvoperacional(id) {
    // Verifica se o registro existe
    const avoperacional = await this.getAvoperacionalById(id);

    if (!avoperacional) {
      throw new Error('avoperacional não encontrada');
    }

    // Exclui o registro
    return await avoperacional.destroy();
  }
}

export default new AvoperacionalService();
