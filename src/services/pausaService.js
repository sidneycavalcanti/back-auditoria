import Pausa from '../models/Pausa.js';
import Auditoria from '../models/Auditoria.js';
import Usuario from '../models/Usuario.js';
import Motivodepausa from '../models/Motivodepausa.js';
import Loja from '../models/Loja.js';
import { Op } from 'sequelize';

class PausaService {
  async getPausas({ page = 1, limit = 10, auditoriaId, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    let order = [['createdAt', 'DESC']];

    if (auditoriaId) {
      where.auditoriaId = parseInt(auditoriaId, 10);
    }

    if (createdBefore) where.createdAt = { [Op.lte]: new Date(createdBefore) };
    if (createdAfter) where.createdAt = { ...where.createdAt, [Op.gte]: new Date(createdAfter) };
    if (updatedBefore) where.updatedAt = { [Op.lte]: new Date(updatedBefore) };
    if (updatedAfter) where.updatedAt = { ...where.updatedAt, [Op.gte]: new Date(updatedAfter) };

    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    console.log("🔍 Buscando pausas com os seguintes parâmetros:", { page, limit, auditoriaId, where, order });

    const pausas = await Pausa.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: ['id', 'createdAt', 'updatedAt'],
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
          model: Motivodepausa,
          as: 'motivodepausa',
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      pausas: pausas.rows,
      totalItems: pausas.count,
      totalPages: Math.ceil(pausas.count / limit),
      currentPage: page,
    };
  }

  async getPausaById(id) {
    return await Pausa.findByPk(id, {
      attributes: ['id', 'createdAt', 'updatedAt'],
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
          model: Motivodepausa,
          as: 'motivodepausa',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async createPausa(data) {
    return await Pausa.create(data);
  }

  async updatePausa(id, updateData) {
    // 🔍 Busca a pausa antes de atualizar
    const pausa = await Pausa.findByPk(id);
    if (!pausa) {
      throw new Error('Pausa não encontrada');
    }
  
    // 🔄 Atualiza a pausa e salva no banco
    await pausa.update(updateData);
  
    console.log("✅ Pausa atualizada com sucesso:", pausa);
  
    return pausa; // 🔥 Retorna o objeto atualizado
  }
  

  async deletePausa(id) {
    const pausa = await this.getPausaById(id);
    if (!pausa) {
      throw new Error('Pausa não encontrada');
    }
    return await Pausa.destroy({ where: { id } });
  }
}

export default new PausaService();
