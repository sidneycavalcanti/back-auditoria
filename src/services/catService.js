import Cat from '../models/Categoria.js';
import { Op } from 'sequelize';

class CatService {
  async getCats({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    page = parseInt(page);
    limit = parseInt(limit);

    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
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
    const cats = await Cat.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      cats: cats.rows,
      totalItems: cats.count,
      totalPages: Math.ceil(cats.count / limit),
      currentPage: page,
    };
  }

    async getCatById(id) {
    return await Cat.findByPk(id, {
      attributes: {},
    });
  }

  async createCat(data) {
    return await Cat.create(data);
  }

  async updateCat(id, updateData) {
    const [updated] = await Cat.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getCatById(id); // Retorna o registro atualizado
    }
    throw new Error('Categoria não encontrada');
  }


  async deletecat(id) {
    // Verifica se a categoria existe
    const categoria = await this.getCatById(id);

    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    // Exclui a categoria com a condição where
    return await Cat.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new CatService();
