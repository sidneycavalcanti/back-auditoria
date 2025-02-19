import Pausa from '../models/Pausa.js';
import Auditoria from '../models/Auditoria.js';
import Usuario from '../models/Usuario.js';
import Motivodepausa from '../models/Motivodepausa.js';
import Loja from '../models/Loja.js';
import { Op } from 'sequelize';

import { Sequelize } from 'sequelize';

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
    return await Pausa.create({
      ...data,
      status: 1, // ✅ Sempre começa como "em pausa"
    });
  }

 async updatePausa(id) {
  try {
    console.log(`🔄 Buscando pausa com ID: ${id}...`);

    const pausa = await Pausa.findByPk(id);
    if (!pausa) {
      console.error("❌ ERRO: Pausa não encontrada!");
      throw new Error('Pausa não encontrada');
    }

    console.log(`✅ Pausa encontrada! Criada em: ${pausa.createdAt}`);

    // 🔥 Atualiza `updatedAt` e muda `status` para 0 (encerrado)
    await pausa.update({
      updatedAt: new Date(),
      status: 0, // ✅ Agora a pausa é considerada encerrada
    });

    console.log(`✅ Pausa encerrada com sucesso! Status atualizado.`);
    return pausa;
  } catch (error) {
    console.error("❌ ERRO no serviço updatePausa:", error.message);
    throw error;
  }
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
