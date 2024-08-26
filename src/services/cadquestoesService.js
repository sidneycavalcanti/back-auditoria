import Cadquestoes from '../models/Cadquestoes.js';
import { Op } from 'sequelize';

class CadquestoesService {
  async getCadquestoes({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
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
    const cadquestoes = await Cadquestoes.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      cadquestoes: cadquestoes.rows,
      totalItems: cadquestoes.count,
      totalPages: Math.ceil(cadquestoes.count / limit),
      currentPage: page,
    };
  }

    async getcadquestoesById(id) {
    return await Cadquestoes.findByPk(id, {
      attributes: {},
    });
  }

  async createCadquestoes(data) {
    return await Cadquestoes.create(data);
  }

  async updateCadquestoes(id, updateData) {
    const [updated] = await Cadquestoes.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getcadquestoesById(id); // Retorna o registro atualizado
    }
    throw new Error('cadquestoes não encontrada');
  }


  async deleteCadquestoes(id) {
    // Verifica se a cadquestoes existe
    const cadquestoes = await this.getcadquestoesById(id);

    if (!cadquestoes) {
      throw new Error('cadquestoes não encontrada');
    }

    // Exclui a cadquestoes com a condição where
    return await Cadquestoes.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new CadquestoesService();
