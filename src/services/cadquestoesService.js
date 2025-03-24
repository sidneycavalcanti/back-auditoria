import Cadquestoes from '../models/Cadquestoes.js';
import Cadavoperacional from '../models/Cadavoperacional.js';
import { Op } from 'sequelize';

class CadquestoesService {
  async getCadquestoes({
    page = 1,
    limit = 10,
    name,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
    sort,
    cadavoperacionalId // <-- Pega o cadavoperacionalId do query
  }) {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let where = {};
    let order = [['createdAt', 'DESC']];

    // Filtra por cadavoperacionalId, se vier no query
    if (cadavoperacionalId) {
      where.cadavoperacionalId = cadavoperacionalId;
    }

    // Filtro por nome (like)
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    // Filtros opcionais de data de criação
    if (createdBefore) {
      where.createdAt = { ...where.createdAt, [Op.gte]: createdBefore };
    }
    if (createdAfter) {
      where.createdAt = { ...where.createdAt, [Op.lte]: createdAfter };
    }

    // Filtros opcionais de data de atualização
    if (updatedBefore) {
      where.updatedAt = { ...where.updatedAt, [Op.gte]: updatedBefore };
    }
    if (updatedAfter) {
      where.updatedAt = { ...where.updatedAt, [Op.lte]: updatedAfter };
    }

    // Ordenação dinâmica (ex: ?sort=createdAt:DESC,updatedAt:ASC)
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    // Busca com paginação
    const cadquestoes = await Cadquestoes.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: ['id', 'name', 'situacao', 'cadavoperacionalId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Cadavoperacional,
          as: 'cadavoperacional',
          attributes: ['id', 'descricao', 'situacao']
        }
      ]
    });

    return {
      cadquestoes: cadquestoes.rows,
      totalItems: cadquestoes.count,
      totalPages: Math.ceil(cadquestoes.count / limit),
      currentPage: page
    };
  }

  async getCadquestoesById(id) {
    try {
      const pergunta = await Cadquestoes.findByPk(id);
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
  async createCadquestoes(data) {
    try {
      console.log("📡 Criando nova pergunta...");
      const novaPergunta = await Cadquestoes.create(data);
      console.log("✅ Pergunta criada com sucesso:", novaPergunta);
      return novaPergunta;
    } catch (error) {
      console.error("❌ Erro ao criar pergunta:", error.message);
      throw new Error("Erro ao criar pergunta.");
    }
  }

  // 🔥 Atualizar uma pergunta existente
  async updateCadquestoes(id, dadosAtualizados) {
    try {
      console.log(`📡 Atualizando pergunta com ID: ${id}`);

      const pergunta = await Cadquestoes.findByPk(id);
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
  async deleteCadquestoes(id) {
    try {
      console.log(`📡 Deletando pergunta com ID: ${id}`);

      const pergunta = await Cadquestoes.findByPk(id);
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

export default new CadquestoesService();
