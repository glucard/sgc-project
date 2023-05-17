import express from "express";
import { user } from "../models/index.js";
import { UserController } from "../controller/user.controller.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const userController = new UserController(user);

router.get("/", AuthMiddleware  , async (req, res) => {
  console.log(req.user_id)
  const users = await userController.getAll();
  res.json(users);
});

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const resp = await userController.adicionar({ name, email, password });
  console.log("aqui 2", resp);
  if (resp.error) {
    return res.status(400).json(resp);
  }

  res.status(200).json(resp);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const resp = await userController.login({ email, password });

  if (resp.error) {
    return res.status(400).json(resp);
  }
  res.status(200).json(resp);
});

export default router;
