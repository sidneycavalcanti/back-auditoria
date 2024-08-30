import Avoperacional from '../models/Avoperacional';
import { Op } from 'sequelize';

class AvoperacionalService {
  async getAvoperacional({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const avoperacional = await Avoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      avoperacional: avoperacional.rows,
      totalItems: avoperacional.count,
      totalPages: Math.ceil(avoperacional.count / limit),
      currentPage: page,
    };
  }

    async getAvoperacionalById(id) {
    return await Avoperacional.findByPk(id, {
      attributes: {},
    });
  }

  async createAvoperacional(data) {
    return await Avoperacional.create(data);
  }

  async updateAvoperacional(id, updateData) {
    const [updated] = await Avoperacional.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getAvoperacionalById(id); // Retorna o registro atualizado
    }
    throw new Error('avoperacional não encontrada');
  }


  async deleteAvoperacional(id) {
    // Verifica se a cadquestoes existe
    const avoperacional = await this.getAvoperacionalById(id);

    if (!avoperacional) {
      throw new Error('avoperacional não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await avoperacional.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AvoperacionalService();
