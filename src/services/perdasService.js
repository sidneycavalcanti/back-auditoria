import Perdas from '../models/Perdas.js';
import { Op } from 'sequelize';

class PerdaService {
  async getPerdas({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const perdas = await Perdas.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      perdas: perdas.rows,
      totalItems: perdas.count,
      totalPages: Math.ceil(perdas.count / limit),
      currentPage: page,
    };
  }

    async getPerdasById(id) {
    return await Perdas.findByPk(id, {
      attributes: {},
    });
  }

  async createPerdas(data) {
    return await Perdas.create(data);
  }

  async updatePerdas(id, updateData) {
    const [updated] = await Perdas.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getPerdasById(id); // Retorna o registro atualizado
    }
    throw new Error('Perda não encontrada');
  }


  async deletePerda(id) {
    // Verifica se a cadquestoes existe
    const Perdas = await this.getPerdaById(id);

    if (!Perdas) {
      throw new Error('Perda não encontrada');
    }

    // Exclui a Motivo de Perda com a condição where
    return await Perdas.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new PerdaService();
