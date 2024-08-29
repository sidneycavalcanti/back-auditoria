import Formadepagamento from '../models/Formadepagamento.js';
import { Op } from 'sequelize';

class FormadepagamentoService {
  async getFormadepagamento({ page = 1, limit = 10, name, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    const Formadepagamento = await Formadepagamento.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      Formadepagamento: Formadepagamento.rows,
      totalItems: Formadepagamento.count,
      totalPages: Math.ceil(Formadepagamento.count / limit),
      currentPage: page,
    };
  }

    async getFormadepagamentoById(id) {
    return await Formadepagamento.findByPk(id, {
      attributes: {},
    });
  }

  async createFormadepagamento(data) {
    return await Formadepagamento.create(data);
  }

  async updateFormadepagamento(id, updateData) {
    const [updated] = await Formadepagamento.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getFormadepagamentoById(id); // Retorna o registro atualizado
    }
    throw new Error('Forma de pagamento não encontrada');
  }


  async deleteFormadepagamento(id) {
    // Verifica se a cadquestoes existe
    const Formadepagamento = await this.getFormadepagamentoById(id);

    if (!Formadepagamento) {
      throw new Error('Forma de pagamento não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Formadepagamento.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new FormadepagamentoService();