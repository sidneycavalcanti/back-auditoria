import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Graduacao from "../models/Graduacao.js";


class GradController {
  // Listagem dos Customers
  async index(req, res) {
    const {
      name,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]: name,
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
      order = sort.split(",").map(item => item.split(":"));
    }
    const data = await Graduacao.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });
    return res.json(data);
  }

  // Recuperar contato
  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }
    return res.json(user);
  }

//   async create(req, res) {
//     console.log(req.body)
//     const schema = Yup.object().shape({
//       //tipo    validação
//       name: Yup.string().required(),
//       cat: Yup.string().required(),
//       password: Yup.string().required().min(8),
//       passwordConfirmation: Yup.string().when("password", (password, field) =>
//         password ? field.required().oneOf([Yup.ref("password")]) : field
//       ),
//     });

//     if (!(await schema.isValid(req.body))) {
      
//       return res.status(400).json({ error: "Error on validate schema." });
//     }

//     const { name, cat, password, createAt, UpdatedAt } = await User.create(
//       req.body
//     );

//     // Mail.send({
//     //   to: email,
//     //   subject: "Bem-vindo(a)",
//     //   text: `Olá ${name}, bem-vindo(a) ao nosso sistema`,
//     // });

//     // await Queue.add(Dummyjob.key, { message: "Hello Jobs"});

//     return res.status(201).json({ name, cat, password, createAt, UpdatedAt });
//   }

//   // Atualiza um Customer
//   async update(req, res) {
//     const schema = Yup.object().shape({
//       name: Yup.string(),
//       oldPassword: Yup.string().min(8),
//       password: Yup.string()
//         .min(8)
//         .when("oldPassword", (oldPassword, field) =>
//           oldPassword ? field.required() : field
//         ),
//       passwordConfirmation: Yup.string().when("password", (password, field) =>
//         password ? field.required().oneOf([Yup.ref("password")]) : field
//       ),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: "Error on validate schema." });
//     }

//     const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return res.status(404).json();
//     }

//     const { oldPassword } = req.body;

//     if (oldPassword && !(await user.checkPassword(oldPassword))) {
//       return res.status(401).json({ error: "User password not match." });
//     }

//     const { id, name, file_id, createdAt, updatedAt } = await user.update(
//       req.body
//     );

//     return res.status(201).json({ id, name, file_id, createdAt, updatedAt });
//   }

//   async destroy(req, res) {
//     const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return res.status(404).json();
//     }

//     await user.destroy();

//     return res.json();
//   }
}

export default new GradController();
