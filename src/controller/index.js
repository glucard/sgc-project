import { curso, categoria } from "../models/index.js";
import CategoriaController from "./categoria.controller.js";
import CursoController from "./curso.controller.js";
// import CursoCategoriaController from "./cursoCategoria.controller.js";

const categoriaController = new CategoriaController(categoria);
const cursoController = new CursoController(curso);
//const cursoCategoriaController = new CursoCategoriaController(cursoCategoria);

export {
//    cursoCategoriaController,
    categoriaController,
    cursoController
};