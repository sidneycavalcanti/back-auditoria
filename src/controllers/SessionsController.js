import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authConfig from "../config/auth.js";

class SessionsController {
  async create(req, res) {
    const { name, password } = req.body;

    //saber o usuario foi encontrado
    const user = await User.findOne({
      where: { name },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password not match." });
    }

    const { id, cat } = user;

    return res.json({
      user: {
        id,
        name,
        cat,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
  async verifyToken(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      jwt.verify(token, authConfig.secret);
      return res.status(200).json({ message: 'Token is valid.' });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  }
}


export default new SessionsController();
