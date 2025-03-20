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
    sort,
    cadavoperacionalId // <-- Pega o cadavoperacionalId do query
  }) {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let where = {};
    let order = [];

    // Filtra por cadavoperacionalId, se vier no query
    if (cadavoperacionalId) {
      where.cadavoperacionalId = cadavoperacionalId;
    }

    // Filtro por nome (like)
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    // Filtros opcionais de data de criação
    if (createdBefore) {
      where.createdAt = { ...where.createdAt, [Op.gte]: createdBefore };
    }
    if (createdAfter) {
      where.createdAt = { ...where.createdAt, [Op.lte]: createdAfter };
    }

    // Filtros opcionais de data de atualização
    if (updatedBefore) {
      where.updatedAt = { ...where.updatedAt, [Op.gte]: updatedBefore };
    }
    if (updatedAfter) {
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
      attributes: ['id', 'name', 'situacao', 'cadavoperacionalId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
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

  // Demais métodos...
}

export default new CadquestoesService();
