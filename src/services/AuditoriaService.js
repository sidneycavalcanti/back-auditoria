import Auditoria from '../models/Auditoria.js';
import { Op } from 'sequelize';

class AuditoriaService {
  async getAuditoria({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
    let where = {};
    let order = [];

    if (name) {
      where = { ...where, name: { [Op.like]: `%${name}%` } };
    }

    if (situacao) {
      where = { ...where, name: { [Op.like]: `%${situacao}%` } };
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
    const auditoria = await Auditoria.findAndCountAll({
      where,
      order,
      limit,
      offset,
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
