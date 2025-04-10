import Categoria from '../models/Categoria.js';
import User from '../models/Usuario.js';
import { Op } from 'sequelize';

class UserService {
  async getUsers({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const users = await User.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include:[
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'name']
        }
      ]
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
      include:[
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'name']
        }
      ]
    });
  }

  async createUser(data) {
    // Verifica se já existe um usuário com esse username
    const userExists = await User.findOne({
      where: { username: data.username },
    });

    if (userExists) {
      // Lança um erro caso o username já esteja em uso
      throw new Error('O usuário já existe.');
    }

    // Cria o usuário normalmente
    return await User.create(data);
  }

  async updateUser(id, data) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Se for necessário verificar a unicidade no update, faça algo semelhante aqui
    if (data.username) {
     const userExists = await User.findOne({
        where: { username: data.username, id: { [Op.ne]: id } },
       });
       if (userExists) {
         throw new Error('O usuário já existe.');
     }
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
