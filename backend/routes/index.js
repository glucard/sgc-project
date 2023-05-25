import express from "express";
import users from "./users.js";
import cursos from "./cursos.js";
import categoria from "./categoria.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina inicial");
});

router.use("/users", users);
router.use("/cursos", cursos);
router.use("/categoria", categoria)

export default router;
