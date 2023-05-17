import { Sequelize } from "sequelize"
import sequelize from "../config/sequelize.js"
import Curso from "./curso.model.js"
import User from "./user.model.js"

export const curso = Curso(sequelize, Sequelize.DataTypes)
export const user = User(sequelize, Sequelize.DataTypes)

