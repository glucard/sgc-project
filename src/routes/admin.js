import express from "express";
import { body, validationResult } from "express-validator";
import { cursoController } from "../controller/index.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import AuthMiddlewarePage from "../middlewares/AuthMiddlewarePage.js";

const router = express.Router();


router.get("/", AuthMiddlewarePage, async (req, res) => {
  res.render("admin_panel/index.hbs");
});

export default router;
