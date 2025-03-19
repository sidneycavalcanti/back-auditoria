import Cadquestoes from '../models/Cadquestoes.js';
import Cadavoperacional from '../models/Cadavoperacional.js';
import { Op } from 'sequelize';

class CadquestoesService {
  async getCadquestoes({
    page = 1,
    limit = 10,
    name,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort
  }) {
    // Convertendo para número
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let where = {};
    let order = [];

    // Filtro por nome (like)
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    // Filtros opcionais de data de criação
    if (createdBefore) {
      // createdAt >= createdBefore
      where.createdAt = { ...where.createdAt, [Op.gte]: createdBefore };
    }
    if (createdAfter) {
      // createdAt <= createdAfter
      where.createdAt = { ...where.createdAt, [Op.lte]: createdAfter };
    }

    // Filtros opcionais de data de atualização
    if (updatedBefore) {
      // updatedAt >= updatedBefore
      where.updatedAt = { ...where.updatedAt, [Op.gte]: updatedBefore };
    }
    if (updatedAfter) {
      // updatedAt <= updatedAfter
      where.updatedAt = { ...where.updatedAt, [Op.lte]: updatedAfter };
    }

    // Ordenação dinâmica (ex: ?sort=createdAt:DESC,updatedAt:ASC)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    // Busca com paginação
    const cadquestoes = await Cadquestoes.findAndCountAll({
      where,
      order,
      limit,
      offset,
      // Escolha os atributos que deseja retornar
      attributes: ['id', 'name', 'situacao', 'cadavoperacionalId', 'createdAt', 'updatedAt'],
      // Inclua o relacionamento com Cadavoperacional
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
          // Defina os campos de Cadavoperacional que você quer retornar
          attributes: ['id', 'descricao', 'situacao']
        }
      ]
    });

    return {
      cadquestoes: cadquestoes.rows,
      totalItems: cadquestoes.count,
      totalPages: Math.ceil(cadquestoes.count / limit),
      currentPage: page
    };
  }

  async getcadquestoesById(id) {
    return await Cadquestoes.findByPk(id, {
      // Defina os campos de Cadquestoes que você quer retornar
      attributes: ['id', 'name', 'situacao', 'cadavoperacionalId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
          attributes: ['id', 'descricao', 'situacao']
        }
      ]
    });
  }

  async createCadquestoes(data) {
    return await Cadquestoes.create(data);
  }

  async updateCadquestoes(id, updateData) {
    const [updated] = await Cadquestoes.update(updateData, {
      where: { id }
    });

    if (updated) {
      return await this.getcadquestoesById(id);
    }
    throw new Error('cadquestoes não encontrada');
  }

  async deleteCadquestoes(id) {
    // Verifica se a cadquestoes existe
    const cadquestoes = await this.getcadquestoesById(id);

    if (!cadquestoes) {
      throw new Error('cadquestoes não encontrada');
    }

    // Exclui o registro
    return await Cadquestoes.destroy({ where: { id } });
  }
}

export default new CadquestoesService();
