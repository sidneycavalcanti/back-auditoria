import Perdas from '../models/Perdas.js';
import { Op } from 'sequelize';
import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';
import Usuario from '../models/Usuario.js';
import Motivoperdas from '../models/Motivoperdas.js';

class PerdaService {
  async getPerdas({ page = 1, limit = 10, auditoriaId, createdBefore, createdAfter, updatedBefore, updatedAfter, lojaId, lojaName, sort }) {
    // 🚀 Garantia que `page`, `limit`, e `auditoriaId` são valores numéricos válidos
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let where = {};
    let order = [['createdAt', 'DESC']]; // 🔥 Garante que os mais recentes venham primeiro

    // Filtro por AuditoriaID (se fornecido)
    if (auditoriaId) {
      where.auditoriaId = parseInt(auditoriaId, 10);
    }

    // Filtros opcionais de data
    if (createdBefore) where.createdAt = { [Op.gte]: createdBefore };
    if (createdAfter) where.createdAt = { ...where.createdAt, [Op.lte]: createdAfter };
    if (updatedBefore) where.updatedAt = { [Op.gte]: updatedBefore };
    if (updatedAfter) where.updatedAt = { ...where.updatedAt, [Op.lte]: updatedAfter };

    // Opção para ordenação dinâmica (caso venha na requisição)
    if (sort) order = sort.split(',').map((item) => item.split(':'));

    // 🔍 Log para depuração - mostra os filtros aplicados
    console.log("🔍 Buscando perdas com os seguintes parâmetros:", { page, limit, auditoriaId, where, order });

    // 🚀 Busca as perdas com paginação
    const perdas = await Perdas.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: ['id', 'obs', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Auditoria,
          as: 'auditoria',
          attributes: ['id', 'usuarioId', 'lojaId'],
          include: [
            { model: 
              Loja, as: 'loja',
               attributes: ['id', 'name'],
              ...(lojaId ? { where: { id: lojaId } } : {}),
              ...(lojaName ? { where: { name: { [Op.like]: `%${lojaName}%` } } } : {})
              },
            { model: Usuario, as: 'usuario', attributes: ['id', 'name'] },
          ],
        },
        {
          model: Motivoperdas,
          as: 'motivoperdas',
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      perdas: perdas.rows,
      totalItems: perdas.count,
      totalPages: Math.ceil(perdas.count / limit),
      currentPage: page,
    };
  }

  async getPerdasById(id) {
    return await Perdas.findByPk(id, {
      attributes: ['id', 'obs', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Auditoria,
          as: 'auditoria',
          attributes: ['id', 'usuarioId', 'lojaId'],
          include: [
            { model: Loja, as: 'loja', attributes: ['id', 'name'] },
            { model: Usuario, as: 'usuario', attributes: ['id', 'name'] },
          ],
        },
        {
          model: Motivoperdas,
          as: 'motivoperdas',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async createPerdas(data) {
    return await Perdas.create(data);
  }

  async updatePerdas(id, updateData) {
    const [updated] = await Perdas.update(updateData, { where: { id } });

    if (updated) {
      return await this.getPerdasById(id);
    }
    throw new Error('Perda não encontrada');
  }

  async deletePerda(id) {
    const perda = await this.getPerdasById(id);
    if (!perda) throw new Error('Perda não encontrada');

    return await Perdas.destroy({ where: { id } });
  }
}

export default new PerdaService();
