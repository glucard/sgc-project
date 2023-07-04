import jwt from "jsonwebtoken";
import { auth } from "../config/auth.js";
import { promisify } from "util";
import { user } from "../models/index.js";
import { UserController } from "../controller/user.controller.js";

const userController = new UserController(user);

export default async (req, res, next) => {
  var authorization = req.headers.authorization;

  if (!authorization && req.cookies.token){
    authorization = req.cookies.token;
  }

  if (!authorization) {
    return res.redirect("/users/page/login");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    if (!decoded) {
      return res.redirect("/users/page/login");;
    } else {
      req.user_id = decoded.id;
      const user = await userController.getByID(req.user_id);
      req.user_role = user.dataValues.role;
      next();
    }
  } catch {
    return res.redirect("/users/page/login");
  }
};
