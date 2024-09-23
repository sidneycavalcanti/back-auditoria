import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';
import Usuario from '../models/Usuario.js';

import { Op } from 'sequelize';

class AuditoriaService {
  async getAuditoria({ page = 1, limit = 10, name, lojaId,  usuarioId, criadorId, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }

    if (lojaId) {
      where = { ...where, lojaId };
    }

    if (usuarioId) {
      where = { ...where, usuarioId };
    }

    if (criadorId) {
      where = { ...where, criadorId };
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

    // Paginação
    const offset = (page - 1) * limit;

    // Consulta ao banco de dados, incluindo os relacionamentos
    const auditoria = await Auditoria.findAndCountAll({
      where,
      order,
      limit,
      offset,
       include: [
        {
          model: Loja,
          as: 'loja', // Alias da associação
          attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Loja
        },
        {
          model: Usuario,
          as: 'usuario', // Alias da associação
          attributes: ['id', 'name'], // Apenas os campos que você quer da tabela Usuario
        },
        {
          model: Usuario,
          as: 'criador', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      auditoria: auditoria.rows,
      totalItems: auditoria.count,
      totalPages: Math.ceil(auditoria.count / limit),
      currentPage: page,
    };
  }

    async getAuditoriaById(id) {
    return await Auditoria.findByPk(id, {
      attributes: {},
    });
  }

  async createAuditoria(data) {
    return await Auditoria.create(data);
  }

  async updateAuditoria(id, updateData) {
    const [updated] = await Auditoria.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getAuditoriaById(id); // Retorna o registro atualizado
    }
    throw new Error('Anotacões não encontrada');
  }


  async deleteAuditoria(id) {
    // Verifica se a cadquestoes existe
    const auditoria = await this.getAuditoriaById(id);

    if (!auditoria) {
      throw new Error('auditoria não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Auditoria.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AuditoriaService();
