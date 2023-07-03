import express from "express";
import { body, validationResult } from "express-validator";
import { cursoController } from "../controller/index.js";
import { user } from "../models/index.js";
import { UserController } from "../controller/user.controller.js";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import AuthMiddlewarePage from "../middlewares/AuthMiddlewarePage.js";

const router = express.Router();
const userController = new UserController(user);


router.get("/", AuthMiddlewarePage, async (req, res) => {
    var content = {};
    content['all_roles'] = [1,2,3];
    if (req.user_role == 1) {
        const users_role = await userController.getRoles()
        content['users_role'] = users_role;
    }
    console.log(content)

    res.render("admin_panel/index.hbs", content);
});

export default router;
