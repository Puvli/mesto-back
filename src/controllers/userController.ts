import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";
import errorHandler from "../middleware/errorHandler";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../status/status";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res
        .status(NOT_FOUND)
        .send({ message: "Пользователь по указанному _id не найден" });
    }
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about, avatar } = req.body;
  const newUser = new User({
    name,
    about,
    avatar,
  });

  try {
    const user = await newUser.save();
    if (!user) {
      return res
        .status(BAD_REQUEST)
        .send({
          message: "Переданы некорректные данные при создании пользователя",
        });
    }
    res.status(CREATED).json(user);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

// Обновление профиля пользователя
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return res
        .status(NOT_FOUND)
        .send({ message: "404 — Пользователь с указанным _id не найден" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body }, // Обновляем профиль пользователя согласно пришедшему телу запроса
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(BAD_REQUEST)
        .send({
          message: " Переданы некорректные данные при обновлении профиля",
        });
    }

    res.status(OK).json(updatedUser);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

// Обновление аватара пользователя
export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return res
        .status(NOT_FOUND)
        .send({ message: "Пользователь с указанным _id не найден" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar }, // Обновляем аватар пользователя
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(BAD_REQUEST)
        .send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
    }

    res.status(OK).json(updatedUser);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};
