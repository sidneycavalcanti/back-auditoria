import Fluxopessoa from '../models/Fluxo.js'; // Ajuste conforme o caminho correto
import { Op } from 'sequelize';
import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';

class fluxoService {
  // Método para buscar fluxopessoas com filtros e paginação
  async getFluxopessoa({ 
    page = 1, limit = 10, 
    auditoriaId, 
    categoria, 
    sexo, 
    dataBefore, 
    dataAfter, 
    horaBefore, 
    horaAfter, 
    sort 
  }) {
    let where = {};
    let order = [];


    // Filtro por `auditoriaId`
    if (auditoriaId) {
      where = { ...where, auditoriaId }; // Adiciona auditoriaId ao filtro
    }

    // Filtros
    if (categoria) {
      where = { ...where, categoria: { [Op.like]: `%${categoria}%` } };
    }

    if (sexo) {
      where = { ...where, sexo: { [Op.like]: `%${sexo}%` } };
    }

    if (dataBefore) {
      where = { ...where, data: { [Op.lte]: dataBefore } };
    }

    if (dataAfter) {
      where = { ...where, data: { [Op.gte]: dataAfter } };
    }

    if (horaBefore) {
      where = { ...where, hora: { [Op.lte]: horaBefore } };
    }

    if (horaAfter) {
      where = { ...where, hora: { [Op.gte]: horaAfter } };
    }

    // Ordenação
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    const offset = (page - 1) * limit;
    const fluxopessoa = await Fluxopessoa.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [
        {
            model: Loja,
            as: 'loja',
            attributes: ['id', 'name'],
        },
        {
            model: Auditoria,
            as: 'auditoria', // Alias do usuário relacionado
            attributes: ['id', 'data'],
          },
      ]
    });

    return {
      fluxopessoa: fluxopessoa.rows,
      totalItems: fluxopessoa.count,
      totalPages: Math.ceil(fluxopessoa.count / limit),
      currentPage: page,
    };
  }

  // Método para buscar fluxopessoa por ID
  async getFluxopessoaById(id) {
    return await Fluxopessoa.findByPk(id, {
      attributes: {},
    });
  }

  // Método para criar uma nova fluxopessoa
  async createFluxopessoa(data) {
    return await Fluxopessoa.create(data);
  }

  // Método para atualizar fluxopessoa
  async updateFluxopessoa(id, updateData) {
    const [updated] = await Fluxopessoa.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getFluxopessoaById(id); // Retorna o registro atualizado
    }
    throw new Error('Fluxopessoa não encontrada');
  }

  // Método para excluir fluxopessoa
  async deleteFluxopessoa(id) {
    const fluxopessoa = await this.getFluxopessoaById(id);

    if (!fluxopessoa) {
      throw new Error('Fluxopessoa não encontrada');
    }

    return await fluxopessoa.destroy({
      where: { id }
    });
  }
}

export default new fluxoService();
