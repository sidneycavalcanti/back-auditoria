import Motivodepausa from '../models/Motivodepausa.js';
import { Op } from 'sequelize';

class MotivodepausaService {
  async getMotivodepausa({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const motivodepausa = await Motivodepausa.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      motivodepausa: motivodepausa.rows,
      totalItems: motivodepausa.count,
      totalPages: Math.ceil(motivodepausa.count / limit),
      currentPage: page,
    };
  }

    async getMotivodepausaById(id) {
    return await Motivodepausa.findByPk(id, {
      attributes: {},
    });
  }

  async createMotivodepausa(data) {
    return await Motivodepausa.create(data);
  }

  async updateMotivodepausa(id, updateData) {
    const [updated] = await Motivodepausa.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getMotivodepausaById(id); // Retorna o registro atualizado
    }
    throw new Error('Motivo de pausa não encontrada');
  }


  async deleteCadavoperacional(id) {
    // Verifica se a cadquestoes existe
    const Motivodepausa = await this.getMotivodepausaById(id);

    if (!Motivodepausa) {
      throw new Error('Motivo de pausa não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Motivodepausa.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new CadavoperacionalService();
