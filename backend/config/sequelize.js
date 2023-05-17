import { Sequelize } from "sequelize"
import { database } from "./database.js"

const sequelize = new Sequelize(database);

export default sequelize;
