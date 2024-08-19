import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";


// import multer from "multer";

import Militar from "../models/Militar.js";
import Graduacao from "../models/Graduacao.js";
import User from "../models/User.js";

class MilitaresController {
  //listar
  async index(req, res) {
    const {
      idt,
      grad,
      situacao,
      name,
      num,
      dtultimosvpre,
      dtultimosverm,
      qtddiaf,
      qtddiafvermelha,
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

    if (idt) {
      where = {
        ...where,
        idt: {
          [Op.like]: idt,
        },
      };
    }
    if (grad) {
      where = {
        ...where,
        grad: {
          [Op.like]: grad,
        },
      };
    }
    if (situacao) {
      where = {
        ...where,
        situacao: {
          [Op.like]: situacao,
        },
      };
    }
    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]: `%${name}%`,
        },
      };
    }
    if (num) {
      where = {
        ...where,
        num: {
          [Op.like]: num,
        },
      };
    }
    if (dtultimosvpre) {
      where = {
        ...where,
        dtultimosvpre: {
          [Op.like]: dtultimosvpre,
        },
      };
    }
    if (dtultimosverm) {
      where = {
        ...where,
        dtultimosverm: {
          [Op.like]: dtultimosverm,
        },
      };
    }
    if (qtddiaf) {
      where = {
        ...where,
        qtddiaf: {
          [Op.like]: qtddiaf,
        },
      };
    }
    if (qtddiafvermelha) {
      where = {
        ...where,
        qtddiafvermelha: {
          [Op.like]: qtddiafvermelha,
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

    try {
      const data = await Militar.findAll({
        where,
        include: [{ model: Graduacao, as: "gradId", attributes: ["name"] }],
        order: [["grad", "ASC"]],
        limit,
        offset: limit * page - limit,
      });
      const count = await Militar.count({ where });
      const totalPages = Math.ceil(count / limit);
      return res.status(201).json({ data, totalPages });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Militar already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async index1(req, res) {
    const {
      idt,
      grad,
      situacao,
      name,
      num,
      dtultimosvpre,
      dtultimosverm,
      qtddiaf,
      qtddiafvermelha,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 10000000000000;

    let where = {};
    let order = [];

    if (idt) {
      where = {
        ...where,
        idt: {
          [Op.like]: idt,
        },
      };
    }
    if (grad) {
      where = {
        ...where,
        grad: {
          [Op.like]: grad,
        },
      };
    }
    if (situacao) {
      where = {
        ...where,
        situacao: {
          [Op.like]: situacao,
        },
      };
    }
    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]: name,
        },
      };
    }
    if (num) {
      where = {
        ...where,
        num: {
          [Op.like]: num,
        },
      };
    }
    if (dtultimosvpre) {
      where = {
        ...where,
        dtultimosvpre: {
          [Op.like]: dtultimosvpre,
        },
      };
    }
    if (dtultimosverm) {
      where = {
        ...where,
        dtultimosverm: {
          [Op.like]: dtultimosverm,
        },
      };
    }
    if (qtddiaf) {
      where = {
        ...where,
        qtddiaf: {
          [Op.like]: qtddiaf,
        },
      };
    }
    if (qtddiafvermelha) {
      where = {
        ...where,
        qtddiafvermelha: {
          [Op.like]: qtddiafvermelha,
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

    try {
      const data = await Militar.findAll({
        where,
        include: [{ model: Graduacao, as: "gradId", attributes: ["name"] }],
        order: [["grad", "ASC"]],
        limit,
        offset: limit * page - limit,
      });
      
    
      return res.status(201).json(data);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Militar already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  //listar por id
  async show(req, res) {
    const militar = await Militar.findByPk(req.params.id);

    if (!militar) {
      return res.status(404).json();
    }
    return res.json(militar);
  }
  //criar
  async create(req, res) {
    const schema = Yup.object().shape({
      
      idt: Yup.number().required(),
      // situacao: Yup.boolean(),
      grad: Yup.number().required(),
      name: Yup.string().required(),
      num: Yup.number().required(),

      dtultimosvpre: Yup.date().required(),
      dtultimosverm: Yup.date().required(),

      qtddiaf: Yup.number(),
      qtddiafvermelha: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }
    try {

      const militarExists = await Militar.findOne({
        where: { idt: req.body.idt },
      });
      if (militarExists) {
        return res.status(400).json({ error: "Militar already exists." });
      }

      const militar = await Militar.create(req.body);
      return res.status(201).json(militar);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Militar already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  //atualizar
  async update(req, res) {
    const schema = Yup.object().shape({
      idt: Yup.number(),
      situacao: Yup.boolean(),
      grad: Yup.number(),
      name: Yup.string(),
      num: Yup.number(),
      dtultimosvpre: Yup.date(),
      dtultimosverm: Yup.date(),
      qtddiaf: Yup.number(),
      qtddiafvermelha: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    try{
      const militar = await Militar.findByPk(req.params.id);

      if (!militar) {
        return res.status(404).json();
      }
  
      const updatedMilitar = await militar.update(req.body);
  
      return res.status(201).json(updatedMilitar);
    }catch(error){
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }

    
  }
  //excluir
  async destroy(req, res) {
    const militar = await Militar.findByPk(req.params.id);

    if (!militar) {
      return res.status(404).json();
    }

    await militar.destroy();

    return res.json();
  }
}

export default new MilitaresController();
