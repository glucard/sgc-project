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

  async getRoles() {
    const users = await this.user.findAll();
    const users_roles = users.map(u => {
      const data = u.dataValues;
      return {
        id: data.id,
        name: data.name,
        email: data.email, 
        role: data.role,
      };
    });

    return users_roles;
  }

  async getByID(id) {
    const user = await this.user.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(userDTO) {
    const {id, name, email, role, number, endereco} = userDTO;

    try {
      const user = await this.user.findOne({
        where: {
          id: id
        }
      });
      user.set({
        name: name,
        email: email,
        role: role,
        number: number,
        endereco: endereco,
      });
      user.save();
    } catch(error){
      console.log(error);
    }
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
    const role = 3;
    const { name, email, password } = userData;
    const userNew = { name, email, password, role };

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
        role: userExist.role,
      },
      token: jwt.sign({ id: userExist.id }, auth.secret, {
        expiresIn: auth.expireIn,
      }),
    };
  }
}
