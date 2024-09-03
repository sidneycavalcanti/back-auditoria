import Anotacoes from '../models/Anotacoes.js';
import { Op } from 'sequelize';

class AnotacoesService {
  async getAnotacoes({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const anotacoes = await Anotacoes.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      anotacoes: anotacoes.rows,
      totalItems: anotacoes.count,
      totalPages: Math.ceil(anotacoes.count / limit),
      currentPage: page,
    };
  }

    async getAnotacoesById(id) {
    return await Anotacoes.findByPk(id, {
      attributes: {},
    });
  }

  async createAnotacoes(data) {
    return await Anotacoes.create(data);
  }

  async updateAnotacoes(id, updateData) {
    const [updated] = await Anotacoes.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getAnotacoesById(id); // Retorna o registro atualizado
    }
    throw new Error('Anotacões não encontrada');
  }


  async deleteAnotacoes(id) {
    // Verifica se a cadquestoes existe
    const anotacoes = await this.getAnotacoesById(id);

    if (!anotacoes) {
      throw new Error('Anotações não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Anotacoes.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AnotacoesService();
