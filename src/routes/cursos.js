import express from "express";
import { body, validationResult } from "express-validator";
import { cursoController } from "../controller/index.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import AuthMiddlewarePage from "../middlewares/AuthMiddlewarePage.js";

const router = express.Router();

router.get("/:curso_id", AuthMiddleware, async (req, res) => {
  const curso_id = req.params.curso_id;
  if (curso_id != 'undefined') {
    const cursos = await cursoController.getByID(curso_id)
    res.json(cursos);
  } else {
    res.send(404);
  }
});

router.delete("/:curso_id", AuthMiddleware, async (req, res) => {
  const curso_id = req.params.curso_id;
  if (curso_id != 'undefined') {
    const cursos = await cursoController.delete(curso_id)
    res.json(cursos);
  } else {
    res.send(404);
  }
});

router.get("/", AuthMiddleware, async (req, res) => {
  const cursos = await cursoController.getAll();
  res.json(cursos);
});


router.get("/page/c/:curso_id", AuthMiddlewarePage, async (req, res) => {
  const curso_id = req.params.curso_id;
  const curso = await cursoController.getByID(curso_id)
  const dataValues = curso.dataValues;
  res.render("pagina-curso.hbs", {dataValues});
});

router.get("/page/create", AuthMiddlewarePage, async (req, res) => {
  res.render("cadastro_curso.hbs");
});

router.post(
  "/",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
    body("categoria_ids").notEmpty().isArray().withMessage("O campo categoria_ids deve ser inteiro é obrigatório"),
  ], AuthMiddleware,
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const {id, nome, ch, categoria_ids, imagem, descricao} = req.body;
    await cursoController.adicionar({id, nome, ch, categoria_ids, imagem, descricao});
    res.status(201).send("Curso criado com sucesso!");
  }
);

router.patch(
  "/:curso_id",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("imagem").notEmpty().trim().withMessage("O campo imagem é obrigatório"),
    body("descricao").notEmpty().trim().withMessage("O campo descricao é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
    body("categoria_ids").notEmpty().isArray().withMessage("O campo categoria_ids deve ser inteiro é obrigatório"),
  ], AuthMiddleware,
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.curso_id;
    //se os dados forem válidos, o sistema executará aqui
    const { nome, ch, categoria_ids, imagem, descricao } = req.body;
    await cursoController.update({id, nome, ch, categoria_ids, imagem, descricao});
    res.status(201).send("Curso atualizado com sucesso!");
  }
);

export default router;
