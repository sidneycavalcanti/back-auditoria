import Cadavoperacional from '../models/Cadavoperacional.js';
import { Op } from 'sequelize';

class CadavoperacionalService {
  async getCadavoperacional({ page = 1, limit = 10,descricao, situacao, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (descricao) {
      where = { ...where, descricao: { [Op.like]: `%${descricao}%` } };
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
    const cadavoperacional = await Cadavoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      cadavoperacional: cadavoperacional.rows,
      totalItems: cadavoperacional.count,
      totalPages: Math.ceil(cadavoperacional.count / limit),
      currentPage: page,
    };
  }

    async getcadavoperacionalById(id) {
    return await Cadavoperacional.findByPk(id, {
      attributes: {},
    });
  }

  async createCadavoperacional(data) {
    return await Cadavoperacional.create(data);
  }

  async updateCadavoperacional(id, updateData) {
    const [updated] = await Cadavoperacional.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getcadavoperacionalById(id); // Retorna o registro atualizado
    }
    throw new Error('Avaliação operacional não encontrada');
  }


  async deleteCadavoperacional(id) {
    // Verifica se a cadquestoes existe
    const cadavoperacional = await this.getcadavoperacionalById(id);

    if (!cadavoperacional) {
      throw new Error('Avaliação operacional não encontrada');
    }

    // Exclui a cadquestoes com a condição where
    return await Cadavoperacional.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new CadavoperacionalService();
