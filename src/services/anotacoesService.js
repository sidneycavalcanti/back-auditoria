import Anotacoes from '../models/Anotacoes.js';
import Loja from '../models/Loja.js';
import Auditoria from '../models/Auditoria.js';
import Usuario from '../models/Usuario.js';

import { Op } from 'sequelize';

class AnotacoesService {
  async getAnotacoes({ page = 1, auditoriaId, limit = 10 }) {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
  
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
  
    let where = {};
    let order = [['createdAt', 'DESC']]; // Ordenar por data de criação decrescente
  
    if (auditoriaId) {
      where.auditoriaId = Number(auditoriaId); // 🔥 Garante que auditoriaId seja um número
    }
  
    const offset = (page - 1) * limit;
  
    try {
      const anotacoes = await Anotacoes.findAndCountAll({
        where,
        order,
        limit,
        offset,
        include: [
          {
            model: Auditoria,
            as: 'auditoria',
            attributes: ['id', 'data'],
            include: [
              {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'name']
              },
              {
                model: Loja,
                as: 'loja',
                attributes: ['id', 'name'],
              },
            ]
          }
        ]
      });
  
      console.log("📡 Resultado da busca de anotações:", anotacoes.rows);
  
      return {
        anotacoes: anotacoes.rows,
        totalItems: anotacoes.count,
        totalPages: Math.ceil(anotacoes.count / limit),
        currentPage: page,
      };
  
    } catch (error) {
      console.error("❌ Erro ao buscar anotações:", error);
      throw new Error("Erro ao buscar anotações no banco de dados.");
    }
  }
  
  

  async getAnotacoesById(id) {
    return await Anotacoes.findByPk(id, {
      attributes: {},
      include: [
        {
          model: Auditoria,
          as: 'auditoria', // Alias da associação
          attributes: ['id', 'data'], //apenas campos da tabela auditoria.
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'name']
            },
            {
              model: Loja,
              as: 'loja', // Alias da associação
              attributes: ['id', 'name'],// Apenas os campos que você quer da tabela Loja
             
            },
          ]
        }
      ]
    });
  }

  async createAnotacoes(data) {
    return await Anotacoes.create(data);
  }

  async updateAnotacoes(id, updateData) {
    const [updated] = await Anotacoes.update(updateData, {
      where: { id } // Especifica qual registro deve ser atualizado
    });

    if (updated) {
      return await this.getAnotacoesById(id); // Retorna o registro atualizado
    }
    throw new Error('Anotacões não encontrada');
  }


  async deleteAnotacoes(id) {
    // Verifica se a cadquestoes existe
    const anotacoes = await this.getAnotacoesById(id);

    if (!anotacoes) {
      throw new Error('Anotações não encontrada');
    }

    // Exclui a Motivo de pausa com a condição where
    return await Anotacoes.destroy({
      where: { id } // Especifica o registro a ser excluído
    });
  }
}

export default new AnotacoesService();
