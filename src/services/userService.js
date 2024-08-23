import User from '../models/Usuario.js';
import { Op } from 'sequelize';

class UserService {
  async getUsers({ page = 1, limit = 10, name, cat, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }

    if (cat) {
      where = { ...where, cat: { [Op.like]: cat } };
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
    const users = await User.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      users: users.rows,
      totalItems: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
    };
  }

  async getUserById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password', 'password_hash'] },
    });
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateUser(id, data) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await user.update(data);
  }

  async deleteUser(id) {
    // Verifica se a categoria existe
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('Usuário não encontrada');
    }

    // Exclui a categoria com a condição where
    return await user.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new UserService();
