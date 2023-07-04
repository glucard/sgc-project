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
    if (req.user_role < 2) {
        const users_role = await userController.getRoles()
        content['users_role'] = users_role;
    }

    res.render("admin_panel/index.hbs", content);
});

router.get("/page/edit_user/:user_id", AuthMiddlewarePage, async (req, res) => {
    const user_id = req.params.user_id;
    const user = await userController.getByID(user_id)
    const user_data = user.dataValues;
    
    var content = {};
    content['all_role'] = [2,3];
    content['user_data'] = user_data;
    
    console.log(content)

    res.render("admin_panel/edit_user.hbs", content);
});

export default router;
