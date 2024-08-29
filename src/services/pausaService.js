import Pausa from '../models/Pausa.js';
import { Op } from 'sequelize';

class PausaService {
  async getPausa({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }

    if (situacao) {
      where = { ...where, name: { [Op.like]: `%${situacao}%` } };
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
    const pausa = await Pausa.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      pausa: pausa.rows,
      totalItems: pausa.count,
      totalPages: Math.ceil(pausa.count / limit),
      currentPage: page,
    };
  }

    async getPausaById(id) {
    return await Loja.findByPk(id, {
      attributes: {},
    });
  }

  async createPausa(data) {
    return await Loja.create(data);
  }

  async updatePausa(id, updateData) {
    const [updated] = await Pausa.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getPausaById(id); // Retorna o registro atualizado
    }
    throw new Error('Pausa não encontrada');
  }


  async deletePausa(id) {
    // Verifica se a cadquestoes existe
    const pausa = await this.getPausaById(id);

    if (!pausa) {
      throw new Error('Pausa não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Pausa.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new PausaService();