import Questoes from '../models/Questoes.js';
import { Op } from 'sequelize';

class QuestoesService {
  async getQuestoes({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const questoes = await Questoes.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      questoes: questoes.rows,
      totalItems: questoes.count,
      totalPages: Math.ceil(questoes.count / limit),
      currentPage: page,
    };
  }

    async getQuestoesById(id) {
    return await Questoes.findByPk(id, {
      attributes: {},
    });
  }

  async createQuestoes(data) {
    return await Questoes.create(data);
  }

  async updateQuestoes(id, updateData) {
    const [updated] = await Questoes.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getQuestoesById(id); // Retorna o registro atualizado
    }
    throw new Error('questoes não encontrada');
  }


  async deleteQuestoes(id) {
    // Verifica se a cadquestoes existe
    const questoes = await this.getQuestoesById(id);

    if (!questoes) {
      throw new Error('questoes não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await questoes.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new QuestoesService();
