import Loja from '../models/Loja.js';
import { Op } from 'sequelize';

class LojaService {
  async getLoja({ page = 1, limit = 10, name, situacao, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    page = parseInt(page);
    limit = parseInt(limit);

    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }

    if (situacao) {
      where = { ...where, situacao: { [Op.like]: `%${situacao}%` } };
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
    const loja = await Loja.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      loja: loja.rows,
      totalItems: loja.count,
      totalPages: Math.ceil(loja.count / limit),
      currentPage: page,
    };
  }

    async getLojaById(id) {
    return await Loja.findByPk(id, {
      attributes: {},
    });
  }

  async createLoja(data) {
    return await Loja.create(data);
  }

  async updateLoja(id, updateData) {
    const [updated] = await Loja.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getLojaById(id); // Retorna o registro atualizado
    }
    throw new Error('Loja não encontrada');
  }


  async deleteLoja(id) {
    // Verifica se a cadquestoes existe
    const loja = await this.getLojaById(id);

    if (!loja) {
      throw new Error('Loja não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Loja.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new LojaService();
