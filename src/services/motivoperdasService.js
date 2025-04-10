import Motivoperdas from '../models/Motivoperdas.js';
import { Op } from 'sequelize';

class MotivoperdasService {
  async getMotivoperdas({ page = 1, limit = 10, name, situacao, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    page = parseInt(page);
    limit = parseInt(limit);
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }
    if (situacao) {
      where = { ...where, situacao: { [Op.like]: `%${name}%` } };
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
    const motivoperdas = await Motivoperdas.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      motivoperdas: motivoperdas.rows,
      totalItems: motivoperdas.count,
      totalPages: Math.ceil(motivoperdas.count / limit),
      currentPage: page,
    };
  }

    async getMotivoperdasById(id) {
    return await Motivoperdas.findByPk(id, {
      attributes: {},
    });
  }

  async createMotivoperdas(data) {
    return await Motivoperdas.create(data);
  }

  async updateMotivoperdas(id, updateData) {
    const [updated] = await Motivoperdas.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getMotivoperdasById(id); // Retorna o registro atualizado
    }
    throw new Error('Avaliação operacional não encontrada');
  }


  async deleteCadavoperacional(id) {
    // Verifica se a cadquestoes existe
    const motivoperdas = await this.getMotivoperdasById(id);

    if (!motivoperdas) {
      throw new Error('Avaliação operacional não encontrada');
    }

    // Exclui a cadquestoes com a condição where
    return await Motivoperdas.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new MotivoperdasService();
