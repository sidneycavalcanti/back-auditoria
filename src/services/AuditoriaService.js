import Auditoria from '../models/Auditoria.js';
import Loja from '../models/Loja.js';
import Usuario from '../models/Usuario.js';
import Fluxo from '../models/Fluxo.js';
import sequelize from '../config/database.js'; 

import { Op } from 'sequelize';

class AuditoriaService {


  //novo metodo para criação de auditoria e fluxo de pessoas
  async createAuditoriaComFluxos(data) {
    const t = await sequelize.transaction();
    try {
      // Cria a auditoria
      const novaAuditoria = await Auditoria.create(data, { transaction: t });

      // Dados fixos que você quer criar
      const categorias = ['outros', 'acompanhante', 'especulador']; //array de categoria
      const sexos = ['masculino', 'feminino']; // array de sexo

      // Cria os 6 fluxos
      for (const categoria of categorias) {
        for (const sexo of sexos) {
          await Fluxo.create({
            lojaId: novaAuditoria.lojaId,  // ou data.lojaId
            auditoriaId: novaAuditoria.id,
            categoria,
            sexo,
            quantidade: 0,
          }, { transaction: t });
        }
      }

      // Confirma a transação
      await t.commit();
      return novaAuditoria;
    } catch (error) {
      // Se algo deu errado, desfaz tudo
      await t.rollback();
      throw error;
    }
  }

  // Método para buscar auditorias com filtros
  
  async getAuditoria({
    page = 1,
    limit = 10,
    lojaId,
    usuarioId,
    criadorId,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort,
  }) {
    let where = {};
    let order = [];

    // Filtro por loja
    if (lojaId) {
      where = { ...where, lojaId };
    }

    // Filtro por usuário logado
    if (usuarioId) {
      where = { ...where, usuarioId };
    }

    // Filtro por criador (se houver)
    if (criadorId) {
      where = { ...where, criadorId };
    }

    // Filtros por datas
    if (createdBefore) {
      where = { ...where, createdAt: { [Op.lte]: createdBefore } };
    }

    if (createdAfter) {
      where = { ...where, createdAt: { [Op.gte]: createdAfter } };
    }

    if (updatedBefore) {
      where = { ...where, updatedAt: { [Op.lte]: updatedBefore } };
    }

    if (updatedAfter) {
      where = { ...where, updatedAt: { [Op.gte]: updatedAfter } };
    }

    // Ordenação
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    // Paginação
    const offset = (page - 1) * limit;

    // Consulta ao banco com associações
    const auditoria = await Auditoria.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [
        {
          model: Loja,
          as: 'loja', // Alias da associação
          attributes: ['id', 'name'], // Campos desejados
        },
        {
          model: Usuario,
          as: 'usuario', // Alias do usuário relacionado
          attributes: ['id', 'name'],
        },
        {
          model: Usuario,
          as: 'criador', // Alias do criador (se houver)
          attributes: ['id', 'name'],
        },
      ],
    });

    // Retorna auditorias com metadados de paginação
    return {
      auditoria: auditoria.rows,
      totalItems: auditoria.count,
      totalPages: Math.ceil(auditoria.count / limit),
      currentPage: page,
    };
  }

  // Método para buscar uma auditoria por ID
  async getAuditoriaById(id) {
    console.log('Buscando auditoria com ID:', id); // Verifica o ID recebido
  
    const auditoria = await Auditoria.findByPk(id, {
      include: [
        {
          model: Loja,
          as: 'loja',
          attributes: ['id', 'name'],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'name'],
        },
        {
          model: Usuario,
          as: 'criador',
          attributes: ['id', 'name'],
        },
      ],
    });
  
    if (!auditoria) {
      console.error('Auditoria não encontrada com ID:', id); // Log detalhado
      throw new Error('Auditoria não encontrada.');
    }
  
    return auditoria;
  }
  

  // Método para criar uma nova auditoria
  async createAuditoria(data) {
    return await Auditoria.create(data);
  }

  // Método para atualizar uma auditoria existente
  async updateAuditoria(id, updateData) {
    const [updated] = await Auditoria.update(updateData, {
      where: { id },
    });

    if (updated) {
      return await this.getAuditoriaById(id); // Retorna o registro atualizado
    }

    throw new Error('Auditoria não encontrada para atualizar.');
  }

  // Método para deletar uma auditoria
  async deleteAuditoria(id) {
    const t = await sequelize.transaction();
    try {
      // Verifica se a auditoria existe
      const auditoria = await Auditoria.findByPk(id, { transaction: t });
      if (!auditoria) {
        throw new Error('Auditoria não encontrada para exclusão.');
      }
  
      // Exclui todos os fluxos vinculados a essa auditoria
      await Fluxo.destroy({ 
        where: { auditoriaId: id },
        transaction: t
      });
  
      // Exclui a auditoria
      await Auditoria.destroy({
        where: { id },
        transaction: t
      });
  
      // Confirma a transação
      await t.commit();
      return { message: 'Auditoria e fluxos excluídos com sucesso.' };
    } catch (error) {
      // Se der erro, faz rollback
      await t.rollback();
      throw error;
    }
  }
  async getAuditoria({ usuarioId, ...filters }) {
    const where = {};
  
    // Filtro para auditorias do usuário logado
    if (usuarioId) {
      where.usuarioId = usuarioId;
    }
  
    // Adicione outros filtros aqui, se necessário
    if (filters.lojaId) {
      where.lojaId = filters.lojaId;
    }
  
    const auditorias = await Auditoria.findAll({
      where,
      include: [
        {
          model: Loja,
          as: 'loja',
          attributes: ['id', 'name'],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'name'],
        },
      ],
    });
  
    return auditorias;
  }
}

export default new AuditoriaService();
