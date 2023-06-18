import express from "express";
import users from "./users.js";
import cursos from "./cursos.js";
import categoria from "./categoria.js"
import { cursoController } from "../controller/index.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const cursos = await cursoController.getAll();

  res.render("home.hbs", {cursos});
});
router.use("/users", users);
router.use("/cursos", cursos);
router.use("/categoria", categoria)

export default router;
