import Cadsexo from '../models/Cadsexo.js';
import { Op } from 'sequelize';

class CadsexoService {
  async getCadsexo({ page = 1, limit = 10, name, situacao, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const cadsexo = await Cadsexo.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      cadsexo: cadsexo.rows,
      totalItems: cadsexo.count,
      totalPages: Math.ceil(cadsexo.count / limit),
      currentPage: page,
    };
  }

    async getCadsexoById(id) {
    return await Cadsexo.findByPk(id, {
      attributes: {},
    });
  }

  async createCadsexo(data) {
    return await Cadsexo.create(data);
  }

  async updateCadsexo(id, updateData) {
    const [updated] = await Cadsexo.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getCadsexoById(id); // Retorna o registro atualizado
    }
    throw new Error('sexo não encontrada');
  }


  async deleteCadsexo(id) {
    // Verifica se a cadquestoes existe
    const Cadsexo = await this.getCadsexoById(id);

    if (!Cadsexo) {
      throw new Error('sexo não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Cadsexo.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new CadsexoService();
