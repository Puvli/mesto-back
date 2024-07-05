import express from "express";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import cardRoutes from "./routes/cardRoutes"; // Импортируйте маршруты для карточек
import { Types } from "mongoose";
import errorHandler from "./middleware/errorHandler";
import auth from "./middleware/auth";
import { errorLogger, requestLogger } from "./middleware/logger";
import { Request, Response, NextFunction } from "express";
import { createUser, login } from "./controllers/userController";
import { celebrate, Joi } from "celebrate";
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

// Middleware для логирования запросов
app.use(requestLogger);

// Middleware для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к базе данных
connectDB();

// Роуты
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().uri().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.use(auth);

app.use("/users", userRoutes);
app.use("/cards", cardRoutes); // Подключите маршруты для карточек

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Middleware для логирования ошибок
app.use(errorLogger);

// Middleware для обработки ошибок
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
