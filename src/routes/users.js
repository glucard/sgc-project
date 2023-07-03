import express from "express";
import { user } from "../models/index.js";
import { UserController } from "../controller/user.controller.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const userController = new UserController(user);

router.get("/", AuthMiddleware, async (req, res) => {
  console.log(req.user_id)
  const users = await userController.getAll();
  res.json(users);
});

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const resp = await userController.adicionar({ name, email, password });
  if (resp.error) {
    return res.status(400).json(resp);
  }
  es.status(200).json(resp);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const resp = await userController.login({ email, password });

  if (resp.error) {
    return res.status(400).json(resp);
  }
  console.log(resp);
  res.cookie('user_name', resp.user.name);
  res.cookie('token', "Bearer "+resp.token);
  res.status(200).json(resp);
});

router.get("/page/login", async (req, res) => {
  res.render("login.hbs");
});

router.get("/page/logout", async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("user_name");
  res.redirect('back');
});

export default router;
