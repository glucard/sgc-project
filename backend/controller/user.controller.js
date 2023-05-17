import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth.js";

export class UserController {
  constructor(UserModel) {
    this.user = UserModel;
  }

  async getAll() {
    const users = await this.user.findAll();
    return users;
  }

  async adicionar(userData) {
    let userExist = await this.user.findOne({
      where: { email: userData.email },
    });

    if (userExist) {
      return {
        error: true,
        message: "Usuário já existe",
      };
    }

    const { name, email, password } = userData;
    const userNew = { name, email, password };

    // Criptografar a senha
    userNew.password = await bcrypt.hash(userNew.password, 8);

    try {
      const userCreate = await this.user.create(userNew);
      console.log("aqui 1'", userCreate);
      return userCreate;
    } catch (error) {
      console.log(error);
    }
  }

  async login(userData) {
    let userExist = await this.user.findOne({
      where: { email: userData.email },
    });

    if (!userExist) {
      return {
        error: true,
        message: "Usuário não existe",
      };
    }

    // Como o usuário existe vanmos verificar se a senha está correta
    if (!(await bcrypt.compare(userData.password, userExist.password))) {
      return {
        error: true,
        message: "Senha inválida",
      };
    }

    // Usuário existe E senha correta
    return {
      error: false,
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token: jwt.sign({ id: userExist.id }, auth.secret, {
        expiresIn: auth.expireIn,
      }),
    };
  }
}
