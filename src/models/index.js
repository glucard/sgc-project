import { Sequelize } from "sequelize"
import sequelize from "../config/sequelize.js"
import Curso from "./curso.model.js"
import User from "./user.model.js"
import Categoria from "./categoria.model.js"

const curso = Curso(sequelize, Sequelize.DataTypes);
const categoria = Categoria(sequelize, Sequelize.DataTypes);
const user = User(sequelize, Sequelize.DataTypes);

curso.belongsToMany(categoria, {through: "CursoCategoria"});
categoria.belongsToMany(curso, {through: "CursoCategoria"});

export {curso, categoria, user};