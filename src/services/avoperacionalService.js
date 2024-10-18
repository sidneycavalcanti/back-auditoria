import Avoperacional from '../models/Avoperacional.js';
import Cadavoperacional from '../models/Cadavoperacional.js';
import Usuario from '../models/Usuario.js';
import Loja from '../models/Loja.js';
import Auditoria from '../models/Auditoria.js';

import { Op } from 'sequelize';


class AvoperacionalService {
  async getAvoperacional({ page = 1, limit = 10, id, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (id) {
      where = { ...where, name: { [Op.like]: `%${id}%` } };
    }

    if (createdBefore) {
      where = { ...where, createdAt: { [Op.gte]: createdBefore } };
    }

    if (createdAfter) {
      where = { ...where, createdAt: { [Op.lte]: createdAfter } };
    }


    if (updatedBefore) {
      where = { ...where, updatedAt: { [Op.gte]: updatedBefore } };
    }

    if (updatedAfter) {
      where = { ...where, updatedAt: { [Op.lte]: updatedAfter } };
    }

    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    const offset = (page - 1) * limit;
    const avoperacional = await Avoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [

        {
          model: Cadavoperacional,
          as: 'cadavoperacional', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'descricao'],
        },
        {
          model: Auditoria,
          as: 'auditoria', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'data'],
          include: [
            {
              model: Loja,
              as: 'loja', // Alias da associação
              attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Loja
            },
            {
              model: Usuario,
              as: 'usuario', // Alias da associação
              attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Usuario
            },
          ]

        }
      ],
    });

    return {
      avoperacional: avoperacional.rows,
      totalItems: avoperacional.count,
      totalPages: Math.ceil(avoperacional.count / limit),
      currentPage: page,
    };
  }

  async getAvoperacionalById(id) {
    return await Avoperacional.findByPk(id, {
      attributes: {},
      include: [

        {
          model: Cadavoperacional,
          as: 'cadavoperacional', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'descricao'],
        },
        {
          model: Auditoria,
          as: 'auditoria', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'data'],
          include: [
            {
              model: Loja,
              as: 'loja', // Alias da associação
              attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Loja
            },
            {
              model: Usuario,
              as: 'usuario', // Alias da associação
              attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Usuario
            },
          ]

        }
      ],
    });
  }

  async createAvoperacional(data) {
    return await Avoperacional.create(data);
  }

  async updateAvoperacional(id, updateData) {
    const [updated] = await Avoperacional.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getAvoperacionalById(id); // Retorna o registro atualizado
    }
    throw new Error('avoperacional não encontrada');
  }


  async deleteAvoperacional(id) {
    // Verifica se a cadquestoes existe
    const avoperacional = await this.getAvoperacionalById(id);

    if (!avoperacional) {
      throw new Error('avoperacional não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await avoperacional.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AvoperacionalService();
