import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Servico from "../models/Servico.js";
import Militar from "../models/Militar.js";
import Graduacao from "../models/Graduacao.js";
import User from "../models/User.js";
// import Mail from "../../lib/Mail";
// import Queue from "../../lib/Queue";
// import Dummyjob from "../jobs/Dummyjob";

class ServicosController {
  //listar

  async index(req, res) {
    const {
      id,
      bi,
      escala,
      data,
      oficial_id,
      sgtdia_id,
      cbgd_id,
      rancho_id,
      moto_id,
      parmcav_id,

      auxrancho1_id,
      auxrancho2_id,
      auxrancho3_id,

      frente1_id,
      frente2_id,
      frente3_id,

      tras1_id,
      tras2_id,
      tras3_id,

      aloj1_id,
      aloj2_id,
      aloj3_id,

      garagem1_id,
      garagem2_id,
      garagem3_id,

      pavsup1_id,
      pavsup2_id,

      armeiro_id,

      patrulha,
      instrucao,
      geraladm,
      jusdis,

      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 8;

    let where = {};
    let order = [];

    if (id) {
      where = {
        ...where,
        id: {
          [Op.like]: id,
        },
      };
    }

    if (bi) {
      where = {
        ...where,
        bi: {
          [Op.like]: bi,
        },
      };
    }

    if (escala) {
      where = {
        ...where,
        escala: {
          [Op.like]: escala,
        },
      };
    }

    if (data) {
      where = {
        ...where,
        data: {
          [Op.eq]: moment(data).format("YYYY-MM-DD"),
        },
      };
    }
    if (oficial_id) {
      where = {
        ...where,
        oficial_id: {
          [Op.like]: oficial_id,
        },
      };
    }
    if (sgtdia_id) {
      where = {
        ...where,
        sgtdia_id: {
          [Op.like]: sgtdia_id,
        },
      };
    }
    if (cbgd_id) {
      where = {
        ...where,
        cbgd_id: {
          [Op.like]: cbgd_id,
        },
      };
    }
    if (rancho_id) {
      where = {
        ...where,
        rancho_id: {
          [Op.like]: rancho_id,
        },
      };
    }
    if (moto_id) {
      where = {
        ...where,
        moto_id: {
          [Op.like]: moto_id,
        },
      };
    }
    if (parmcav_id) {
      where = {
        ...where,
        parmcav_id: {
          [Op.like]: parmcav_id,
        },
      };
    }
    if (auxrancho1_id) {
      where = {
        ...where,
        auxrancho1_id: {
          [Op.like]: auxrancho1_id,
        },
      };
    }
    if (auxrancho2_id) {
      where = {
        ...where,
        auxrancho2_id: {
          [Op.like]: auxrancho2_id,
        },
      };
    }
    if (auxrancho3_id) {
      where = {
        ...where,
        auxrancho3_id: {
          [Op.like]: auxrancho3_id,
        },
      };
    }
    if (frente1_id) {
      where = {
        ...where,
        frente1_id: {
          [Op.like]: frente1_id,
        },
      };
    }
    if (frente2_id) {
      where = {
        ...where,
        frente2_id: {
          [Op.like]: frente2_id,
        },
      };
    }
    if (frente3_id) {
      where = {
        ...where,
        frente3_id: {
          [Op.like]: frente3_id,
        },
      };
    }
    if (tras1_id) {
      where = {
        ...where,
        tras1_id: {
          [Op.like]: tras1_id,
        },
      };
    }
    if (tras2_id) {
      where = {
        ...where,
        tras2_id: {
          [Op.like]: tras2_id,
        },
      };
    }
    if (tras3_id) {
      where = {
        ...where,
        tras3_id: {
          [Op.like]: tras3_id,
        },
      };
    }
    if (aloj1_id) {
      where = {
        ...where,
        aloj1_id: {
          [Op.like]: aloj1_id,
        },
      };
    }
    if (aloj2_id) {
      where = {
        ...where,
        aloj2_id: {
          [Op.like]: aloj2_id,
        },
      };
    }
    if (aloj3_id) {
      where = {
        ...where,
        aloj3_id: {
          [Op.like]: aloj3_id,
        },
      };
    }
    if (garagem1_id) {
      where = {
        ...where,
        garagem1_id: {
          [Op.like]: garagem1_id,
        },
      };
    }
    if (garagem2_id) {
      where = {
        ...where,
        garagem2_id: {
          [Op.like]: garagem2_id,
        },
      };
    }
    if (garagem3_id) {
      where = {
        ...where,
        garagem3_id: {
          [Op.like]: garagem3_id,
        },
      };
    }
    if (pavsup1_id) {
      where = {
        ...where,
        pavsup1_id: {
          [Op.like]: pavsup1_id,
        },
      };
    }
    if (pavsup2_id) {
      where = {
        ...where,
        pavsup2_id: {
          [Op.like]: pavsup2_id,
        },
      };
    }
    if (armeiro_id) {
      where = {
        ...where,
        armeiro_id: {
          [Op.like]: armeiro_id,
        },
      };
    }
    if (patrulha) {
      where = {
        ...where,
        patrulha: {
          [Op.like]: patrulha,
        },
      };
    }
    if (instrucao) {
      where = {
        ...where,
        instrucao: {
          [Op.like]: instrucao,
        },
      };
    }
    if (geraladm) {
      where = {
        ...where,
        geraladm: {
          [Op.like]: geraladm,
        },
      };
    }
    if (jusdis) {
      where = {
        ...where,
        jusdis: {
          [Op.like]: jusdis,
        },
      };
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }
    try{
      const data = await Servico.findAll({
      where,
      include: [
        {
          model: Militar,
          as: "oficialId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "sgtdiaId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "cbgdId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "motoId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "ranchoId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "parmcavId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "auxrancho1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "frente1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "tras1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "aloj1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "garagem1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "pavsup1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "pavsup2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "armeiroId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
      ],
      order: [["data", "DESC"]],
      limit,
      offset: limit * page - limit,
    });
    const count = await Servico.count({ where });
    const totalPages = Math.ceil(count / limit);
    return res.status(201).json({ data, totalPages });
   }
   catch(error){
 if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Serviço already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    } 
  }

  async index1(req, res) {
    const {
      id,
      bi,
      escala,
      data,
      oficial_id,
      sgtdia_id,
      cbgd_id,
      rancho_id,
      moto_id,
      parmcav_id,

      auxrancho1_id,
      auxrancho2_id,
      auxrancho3_id,

      frente1_id,
      frente2_id,
      frente3_id,

      tras1_id,
      tras2_id,
      tras3_id,

      aloj1_id,
      aloj2_id,
      aloj3_id,

      garagem1_id,
      garagem2_id,
      garagem3_id,

      pavsup1_id,
      pavsup2_id,

      armeiro_id,

      patrulha,
      instrucao,
      geraladm,
      jusdis,

      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 10000000000000000;

    let where = {};
    let order = [];

    if (id) {
      where = {
        ...where,
        id: {
          [Op.like]: id,
        },
      };
    }

    if (bi) {
      where = {
        ...where,
        bi: {
          [Op.like]: bi,
        },
      };
    }

    if (escala) {
      where = {
        ...where,
        escala: {
          [Op.like]: escala,
        },
      };
    }

    if (data) {
      where = {
        ...where,
        data: {
          [Op.eq]: moment(data).format("YYYY-MM-DD"),
        },
      };
    }
    if (oficial_id) {
      where = {
        ...where,
        oficial_id: {
          [Op.like]: oficial_id,
        },
      };
    }
    if (sgtdia_id) {
      where = {
        ...where,
        sgtdia_id: {
          [Op.like]: sgtdia_id,
        },
      };
    }
    if (cbgd_id) {
      where = {
        ...where,
        cbgd_id: {
          [Op.like]: cbgd_id,
        },
      };
    }
    if (rancho_id) {
      where = {
        ...where,
        rancho_id: {
          [Op.like]: rancho_id,
        },
      };
    }
    if (moto_id) {
      where = {
        ...where,
        moto_id: {
          [Op.like]: moto_id,
        },
      };
    }
    if (parmcav_id) {
      where = {
        ...where,
        parmcav_id: {
          [Op.like]: parmcav_id,
        },
      };
    }
    if (auxrancho1_id) {
      where = {
        ...where,
        auxrancho1_id: {
          [Op.like]: auxrancho1_id,
        },
      };
    }
    if (auxrancho2_id) {
      where = {
        ...where,
        auxrancho2_id: {
          [Op.like]: auxrancho2_id,
        },
      };
    }
    if (auxrancho3_id) {
      where = {
        ...where,
        auxrancho3_id: {
          [Op.like]: auxrancho3_id,
        },
      };
    }
    if (frente1_id) {
      where = {
        ...where,
        frente1_id: {
          [Op.like]: frente1_id,
        },
      };
    }
    if (frente2_id) {
      where = {
        ...where,
        frente2_id: {
          [Op.like]: frente2_id,
        },
      };
    }
    if (frente3_id) {
      where = {
        ...where,
        frente3_id: {
          [Op.like]: frente3_id,
        },
      };
    }
    if (tras1_id) {
      where = {
        ...where,
        tras1_id: {
          [Op.like]: tras1_id,
        },
      };
    }
    if (tras2_id) {
      where = {
        ...where,
        tras2_id: {
          [Op.like]: tras2_id,
        },
      };
    }
    if (tras3_id) {
      where = {
        ...where,
        tras3_id: {
          [Op.like]: tras3_id,
        },
      };
    }
    if (aloj1_id) {
      where = {
        ...where,
        aloj1_id: {
          [Op.like]: aloj1_id,
        },
      };
    }
    if (aloj2_id) {
      where = {
        ...where,
        aloj2_id: {
          [Op.like]: aloj2_id,
        },
      };
    }
    if (aloj3_id) {
      where = {
        ...where,
        aloj3_id: {
          [Op.like]: aloj3_id,
        },
      };
    }
    if (garagem1_id) {
      where = {
        ...where,
        garagem1_id: {
          [Op.like]: garagem1_id,
        },
      };
    }
    if (garagem2_id) {
      where = {
        ...where,
        garagem2_id: {
          [Op.like]: garagem2_id,
        },
      };
    }
    if (garagem3_id) {
      where = {
        ...where,
        garagem3_id: {
          [Op.like]: garagem3_id,
        },
      };
    }
    if (pavsup1_id) {
      where = {
        ...where,
        pavsup1_id: {
          [Op.like]: pavsup1_id,
        },
      };
    }
    if (pavsup2_id) {
      where = {
        ...where,
        pavsup2_id: {
          [Op.like]: pavsup2_id,
        },
      };
    }
    if (armeiro_id) {
      where = {
        ...where,
        armeiro_id: {
          [Op.like]: armeiro_id,
        },
      };
    }
    if (patrulha) {
      where = {
        ...where,
        patrulha: {
          [Op.like]: patrulha,
        },
      };
    }
    if (instrucao) {
      where = {
        ...where,
        instrucao: {
          [Op.like]: instrucao,
        },
      };
    }
    if (geraladm) {
      where = {
        ...where,
        geraladm: {
          [Op.like]: geraladm,
        },
      };
    }
    if (jusdis) {
      where = {
        ...where,
        jusdis: {
          [Op.like]: jusdis,
        },
      };
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }
    try{
      
      const data = await Servico.findAll({
      where,
      include: [
        {
          model: Militar,
          as: "oficialId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "sgtdiaId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "cbgdId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "motoId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "ranchoId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "parmcavId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "auxrancho1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "frente1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "tras1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "aloj1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "garagem1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "pavsup1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "pavsup2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "armeiroId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
      ],
      order: [["data", "DESC"]],
      limit,
      offset: limit * page - limit,
    });
    const count = await Servico.count({ where });
    const totalPages = Math.ceil(count / limit);
    return res.status(201).json({ data, totalPages });
   }
   catch(error){
 if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Serviço already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    } 
  }

  async show(req, res) {
    // findbypk
    const servico = await Servico.findByPk(req.params.id, {
      include: [
        {
          model: Militar,
          as: "oficialId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "sgtdiaId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "cbgdId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "ranchoId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "motoId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "parmcavId",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "auxrancho1Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho2Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "auxrancho3Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "frente1Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente2Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "frente3Id",
          attributes: ["name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "tras1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "tras3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "aloj1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "aloj3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "garagem1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem2Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "garagem3Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "pavsup1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
        {
          model: Militar,
          as: "pavsup1Id",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },

        {
          model: Militar,
          as: "armeiroId",
          attributes: ["grad", "name"],
          include: {
            model: Graduacao,
            as: "gradId",
            attributes: ["name"],
          },
        },
      ],
    });
    // const militar = await Militar.findByPk(id, {
    //   include: [{model: Graduacao, as: 'gradId', attributes: ['name'] }]});

    if (!servico) {
      return res.status(404).json();
    }
    return res.json(servico);
  }
  //criar
  async create(req, res) {
    const schema = Yup.object().shape({
      data: Yup.date().required(),

      bi: Yup.number().required(),
      escala: Yup.boolean().required(),

      oficial_id: Yup.number().required(),
      sgtdia_id: Yup.number().required(),
      cbgd_id: Yup.number().required(),
      moto_id: Yup.number().required(),
      rancho_id: Yup.number().required(),
      parmcav_id: Yup.number().required(),

      auxrancho1_id: Yup.number().required(),
      auxrancho2_id: Yup.number().required(),
      auxrancho3_id: Yup.number().required(),

      frente1_id: Yup.number().required(),
      frente2_id: Yup.number().required(),
      frente3_id: Yup.number().required(),

      tras1_id: Yup.number().required(),
      tras2_id: Yup.number().required(),
      tras3_id: Yup.number().required(),

      aloj1_id: Yup.number().required(),
      aloj2_id: Yup.number().required(),
      aloj3_id: Yup.number().required(),

      garagem1_id: Yup.number().required(),
      garagem2_id: Yup.number().required(),
      garagem3_id: Yup.number().required(),

      pavsup1_id: Yup.number().required(),
      pavsup2_id: Yup.number().required(),

      armeiro_id: Yup.number().required(),

      patrulha: Yup.string().required(),
      instrucao: Yup.string().required(),
      geraladm: Yup.string().required(),
      jusdis: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }
    try {

      const servicoExists = await Servico.findOne({
        where: { data: req.body.data },
      });
      if (servicoExists) {
        return res.status(400).json({ error: "Serviço already exists." });
      }

      const servico = await Servico.create(req.body);

      return res.status(201).json(servico);
    } catch (error) {
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  //atualizar
  async update(req, res) {
    console.log("chegou aqui 1");
    const schema = Yup.object().shape({
      data: Yup.date(),

      bi: Yup.number(),
      escala: Yup.number(),

      oficial_id: Yup.number(),
      sgtdia_id: Yup.number(),
      cbgd_id: Yup.number(),
      moto_id: Yup.number(),
      rancho_id: Yup.number(),
      permcav_id: Yup.number(),

      auxrancho1_id: Yup.number(),
      auxrancho2_id: Yup.number(),
      auxrancho3_id: Yup.number(),

      frente1_id: Yup.number(),
      frente2_id: Yup.number(),
      frente3_id: Yup.number(),

      tras1_id: Yup.number(),
      tras2_id: Yup.number(),
      tras3_id: Yup.number(),

      aloj1_id: Yup.number(),
      aloj2_id: Yup.number(),
      aloj3_id: Yup.number(),

      garagem1_id: Yup.number(),
      garagem2_id: Yup.number(),
      garagem3_id: Yup.number(),

      pavsup1_id: Yup.number(),
      pavsup2_id: Yup.number(),

      armeiro_id: Yup.number(),

      patrulha: Yup.string(),
      instrucao: Yup.string(),
      geraladm: Yup.string(),
      jusdis: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json();
    }

    const updatedServico = await servico.update(req.body);

    return res.status(201).json(updatedServico);
  }
  //excluir
  async destroy(req, res) {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json();
    }

    await servico.destroy();

    return res.json();
  }
}

export default new ServicosController();
