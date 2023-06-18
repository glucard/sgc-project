import jwt from "jsonwebtoken";
import { auth } from "../config/auth.js";
import { promisify } from "util";

export default async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: true,
      message: "O token de autorização não existe",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    if (!decoded) {
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token está inválido!",
    });
  }
};
