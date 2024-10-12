import Pausa from '../models/Pausa.js';
import Auditoria from '../models/Auditoria.js';
import Usuario from '../models/Usuario.js';
import Motivodepausa from '../models/Motivodepausa.js';
import Loja from '../models/Loja.js';
import { Op } from 'sequelize';



class PausaService {
  async getPausa({ page = 1, limit = 10, motivodepausaId, usuarioId, auditoriaId, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (motivodepausaId) {
      where = { ...where, motivodepausaId };
    }

    if (usuarioId) {
      where = { ...where, usuarioId };
    }

    if (auditoriaId) {
      where = { ...where, auditoriaId };
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
    const pausa = await Pausa.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [
        {
          model: Auditoria,
          as: 'auditoria',
          attributes: ['id', 'usuarioId','lojaId'],  // Aqui você busca o 'lojaId' na auditoria
          include: [
            {
              model: Loja,
              as: 'loja',
              attributes: ['id', 'name'],  // A partir do 'lojaId', traz o nome da loja
            },
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'name']
            }
          ],
        },
       
        {
          model: Motivodepausa,
          as: 'motivodepausa',
          attributes: ['id','name'],
        },
      ]
    });

    return {
      pausa: pausa.rows,
      totalItems: pausa.count,
      totalPages: Math.ceil(pausa.count / limit),
      currentPage: page,
    };
  }

    async getPausaById(id) {
    return await Pausa.findByPk(id, {
      attributes: {},
    });
  }

  async createPausa(data) {
    return await Pausa.create(data);
  }

  async updatePausa(id, updateData) {
    const [updated] = await Pausa.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getPausaById(id); // Retorna o registro atualizado
    }
    throw new Error('Pausa não encontrada');
  }


  async deletePausa(id) {
    // Verifica se a cadquestoes existe
    const pausa = await this.getPausaById(id);

    if (!pausa) {
      throw new Error('Pausa não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Pausa.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new PausaService();
