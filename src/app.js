import "./dotenv.js";
import express from "express";
import routes from "./routes/index.js";
import sequelize from "./config/sequelize.js";
import cors from "cors";
import path from "path";
import fileDirName from './config/file-dir-name.js';
import { engine } from 'express-handlebars'
import Handlebars from "handlebars";
import cookieParser from "cookie-parser";

const { __dirname, __filename } = fileDirName(import.meta);


const app = express();
const PORT = 3000;

global.__basedir = __dirname;
// Definindo static folder
app.use("/", express.static(path.join(__dirname, "/public")));
app.use(cookieParser());


// Setup Template Engine
app.engine("hbs", engine({
  extname: ".hbs",
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "views/partials"),
  layoutsDir: path.join(__dirname, "views/layouts"),
  helpers: {
    'eq': function () {
      const args = Array.prototype.slice.call(arguments, 0, -1);
      return args.every(function (expression) {
          return args[0] === expression;
      });
    }
  }
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROTAS
app.use("/", routes);

// Conexão com Banco de Dados
sequelize.sync().then(() => {
  console.log("Conectado ao Banco de Dados com sucesso!");
});

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
