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
      console.log("📡 Buscando perguntas...");

      let whereCondition = {};
      if (situacao !== undefined) {
        whereCondition.situacao = situacao === 'true'; // Converte string para booleano
      }

      const perguntas = await Cadavoperacional.findAll({
        where: whereCondition,
        order: [['createdAt', 'DESC']], // Mais recentes primeiro
      });

      console.log(`✅ Perguntas encontradas: ${perguntas.length}`);
      return perguntas;
    } catch (error) {
      console.error("❌ Erro ao buscar perguntas:", error.message);
      throw new Error("Erro ao buscar perguntas.");
    }
  }

  // 🔥 Buscar uma pergunta específica pelo ID
  async getCadavoperacionalById(id) {
    try {
      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Pergunta não encontrada.");
      }
      return pergunta;
    } catch (error) {
      console.error("❌ Erro ao buscar pergunta pelo ID:", error.message);
      throw new Error("Erro ao buscar pergunta.");
    }
  }

  // 🔥 Criar uma nova pergunta
  async createCadavoperacional(data) {
    try {
      console.log("📡 Criando nova pergunta...");
      const novaPergunta = await Cadavoperacional.create(data);
      console.log("✅ Pergunta criada com sucesso:", novaPergunta);
      return novaPergunta;
    } catch (error) {
      console.error("❌ Erro ao criar pergunta:", error.message);
      throw new Error("Erro ao criar pergunta.");
    }
  }

  // 🔥 Atualizar uma pergunta existente
  async updateCadavoperacional(id, dadosAtualizados) {
    try {
      console.log(`📡 Atualizando pergunta com ID: ${id}`);

      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Pergunta não encontrada.");
      }

      await pergunta.update(dadosAtualizados);
      console.log(`✅ Pergunta ID ${id} atualizada com sucesso!`);
      return pergunta;
    } catch (error) {
      console.error("❌ Erro ao atualizar pergunta:", error.message);
      throw new Error("Erro ao atualizar pergunta.");
    }
  }

  // 🔥 Deletar uma pergunta
  async deleteCadavoperacional(id) {
    try {
      console.log(`📡 Deletando pergunta com ID: ${id}`);

      const pergunta = await Cadavoperacional.findByPk(id);
      if (!pergunta) {
        throw new Error("Pergunta não encontrada.");
      }

      await pergunta.destroy();
      console.log(`✅ Pergunta ID ${id} deletada com sucesso!`);
      return { message: "Pergunta deletada com sucesso" };
    } catch (error) {
      console.error("❌ Erro ao deletar pergunta:", error.message);
      throw new Error("Erro ao deletar pergunta.");
    }
  }
}

export default new CadavoperacionalService();
