import Avoperacional from '../models/Avoperacional.js';
import Cadavoperacional from '../models/Cadavoperacional.js';
import Usuario from '../models/Usuario.js';
import Loja from '../models/Loja.js';
import Auditoria from '../models/Auditoria.js';

import { Op } from 'sequelize';


class AvoperacionalService {
  async getAvoperacional({ page = 1, limit = 10, auditoriaId, createdBefore, createdAfter, updatedBefore, updatedAfter, sort }) {
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
    console.log("🔍 Buscando avaliação com os seguintes parâmetros:", { page, limit, auditoriaId, where, order });

    // 🚀 Busca as perdas com paginação
    const avoperacional = await Avoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [

        {
          model: Cadavoperacional,
          as: 'cadavoperacional', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'descricao'],
        },
        {
          model: Auditoria,
          as: 'auditoria', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'data'],
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
          ]

        }
      ],
    });

    return {
      avaliacoes: avoperacional.rows,
      totalItems: avoperacional.count,
      totalPages: Math.ceil(avoperacional.count / limit),
      currentPage: page,
    };
  }

  async getAvoperacionalById(id) {
    return await Avoperacional.findByPk(id, {
      attributes: ['id', 'resposta', 'createdAt', 'updatedAt'],
      include: [

        {
          model: Cadavoperacional,
          as: 'cadavoperacional', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'descricao'],
        },
        {
          model: Auditoria,
          as: 'auditoria', // Alias da associação para o criador (se for diferente de usuario)
          attributes: ['id', 'data'],
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
          ]

        }
      ],
    });
  }
  

  async createAvoperacional(data) {
    return await Avoperacional.create(data);
  }

  async updateAvoperacional(id, updateData) {
    const [updated] = await Avoperacional.update(updateData, { where: { id } });

    if (updated) {
      return await this.getAvoperacionalById(id);
    }
    throw new Error('Avaliação não encontrada');
  }

  async deleteAvoperacional(id) {
    // Verifica se a cadquestoes existe
    const avoperacional = await this.getAvoperacionalById(id);

    if (!avoperacional) {
      throw new Error('avoperacional não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await avoperacional.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AvoperacionalService();
