import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../status/status";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config";
import { CustomRequest } from "controllers/userController";

// Загружаем переменные окружения из файла .env
dotenv.config();

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload: JwtPayload;

  try {
    // payload = jwt.verify(token, "some-secret-key") as JwtPayload;
    payload = jwt.verify(token, JWT_SECRET,) as JwtPayload;
    req.user = { _id: payload._id };

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(UNAUTHORIZED).send({ message: "Необходима авторизация" });
  }

  // Проверка, что payload содержит userId или _id
  if (!payload || !payload._id) {
    return res.status(UNAUTHORIZED).send({ message: "Необходима авторизация" });
  }
};
