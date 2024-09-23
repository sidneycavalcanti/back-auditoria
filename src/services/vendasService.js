import Vendas from '../models/Vendas.js';
import { Op } from 'sequelize';

class VendasService {
  async getVendas({ page = 1, limit = 10, id, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (id) {
      where = { ...where, id: { [Op.like]: `%${id}%` } };
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
    const vendas = await Vendas.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      vendas: vendas.rows,
      totalItems: vendas.count,
      totalPages: Math.ceil(vendas.count / limit),
      currentPage: page,
    };
  }

    async getVendasById(id) {
    return await Vendas.findByPk(id, {
      attributes: {},
    });
  }

  async createVendas(data) {
    return await Vendas.create(data);
  }

  async updateVendas(id, updateData) {
    const [updated] = await Vendas.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getVendasById(id); // Retorna o registro atualizado
    }
    throw new Error('Motivo de pausa não encontrada');
  }


  async deleteVendas(id) {
    // Verifica se a cadquestoes existe
    const vendas = await this.getVendasById(id);

    if (!vendas) {
      throw new Error('Motivo de pausa não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Vendas.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new VendasService();
