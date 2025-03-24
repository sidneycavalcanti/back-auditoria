import Cadavoperacional from '../models/Cadavoperacional.js';
import { Op } from 'sequelize';

class CadavoperacionalService {
  // 🔥 Buscar todas ou apenas perguntas filtradas (paginações e ordenação)
  async getCadavoperacional({
    page = 1,
    limit = 10,
    descricao,
    situacao,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort,
  }) {
    let where = {};

    if (descricao) {
      where.descricao = { [Op.like]: `%${descricao}%` };
    }

    if (situacao !== undefined) {
      where.situacao = situacao === 'true'; // Converte string para booleano
    }

    if (createdBefore) {
      where.createdAt = { [Op.gte]: new Date(createdBefore) };
    }

    if (createdAfter) {
      where.createdAt = { ...where.createdAt, [Op.lte]: new Date(createdAfter) };
    }

    if (updatedBefore) {
      where.updatedAt = { [Op.gte]: new Date(updatedBefore) };
    }

    if (updatedAfter) {
      where.updatedAt = { ...where.updatedAt, [Op.lte]: new Date(updatedAfter) };
    }

    let order = [];
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    } else {
      order = [['createdAt', 'DESC']]; // Padrão: mais recentes primeiro
    }

    const offset = (page - 1) * limit;
    const cadavoperacional = await Cadavoperacional.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      cadavoperacional: cadavoperacional.rows,
      totalItems: cadavoperacional.count,
      totalPages: Math.ceil(cadavoperacional.count / limit),
      currentPage: page,
    };
  }

  // 🔥 Buscar perguntas (ativas ou todas)
  async getPerguntas({ situacao }) {
    try {
      console.log("📡 Buscando cadastro de avaliação...");

      let whereCondition = {};
      if (situacao !== undefined) {
        whereCondition.situacao = situacao === 'true'; // Converte string para booleano
      }

      const perguntas = await Cadavoperacional.findAll({
        where: whereCondition,
        order: [['createdAt', 'DESC']], // Mais recentes primeiro
      });

      console.log(`✅ Cadastro de avaliação encontradas: ${perguntas.length}`);
      return perguntas;
    } catch (error) {
      console.error("❌ Erro ao buscar cadastro de avaliação:", error.message);
      throw new Error("Erro ao buscar cadastro de avaliação.");
    }
  }

  // 🔥 Buscar uma pergunta específica pelo ID
  async getCadavoperacionalById(id) {
    try {
      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Cadastro de avaliação não encontrada.");
      }
      return pergunta;
    } catch (error) {
      console.error("❌ Erro ao buscar cadastro de avaliação pelo ID:", error.message);
      throw new Error("Erro ao buscar cadastro de avaliação.");
    }
  }

  // 🔥 Criar uma nova pergunta
  async createCadavoperacional(data) {
    try {
      console.log("📡 Criando nova cadastro de avaliação...");
      const novaPergunta = await Cadavoperacional.create(data);
      console.log("✅ Cadastro de avaliação criada com sucesso:", novaPergunta);
      return novaPergunta;
    } catch (error) {
      console.error("❌ Erro ao criar cadastro de avaliação:", error.message);
      throw new Error("Erro ao criar cadastro de avaliação.");
    }
  }

  // 🔥 Atualizar uma pergunta existente
  async updateCadavoperacional(id, dadosAtualizados) {
    try {
      console.log(`📡 Atualizando cadastro de avaliação com ID: ${id}`);

      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Cadastro de avaliação não encontrada.");
      }

      await pergunta.update(dadosAtualizados);
      console.log(`✅ Cadastro de avaliação ID ${id} atualizada com sucesso!`);
      return pergunta;
    } catch (error) {
      console.error("❌ Erro ao atualizar cadastro de avaliação:", error.message);
      throw new Error("Erro ao atualizar cadastro de avaliação.");
    }
  }

  // 🔥 Deletar uma pergunta
  async deleteCadavoperacional(id) {
    try {
      console.log(`📡 Deletando cadastro de avaliação com ID: ${id}`);

      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Cadastro de avaliação não encontrada.");
      }

      await pergunta.destroy();
      console.log(`✅ Cadastro de avaliação ID ${id} deletada com sucesso!`);
      return { message: "Cadastro de avaliação deletada com sucesso" };
    } catch (error) {
      console.error("❌ Erro ao deletar cadastro de avaliação:", error.message);
      throw new Error("Erro ao deletar cadastro de avaliação.");
    }
  }
}

export default new CadavoperacionalService();
