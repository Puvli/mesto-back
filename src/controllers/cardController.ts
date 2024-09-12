import { Request, Response, NextFunction } from "express";
import Card from "../models/card";
import { Types } from "mongoose";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../status/status";
import { CustomRequest } from "./userController";
// interface CustomRequest extends Request {
//   user?: {
//     _id: Types.ObjectId;
//   };
// }

export const createCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const ownerId = req.user?._id;

  if (!ownerId) {
    return next({
      status: BAD_REQUEST,
      message: "Переданы некорректные данные при создании карточки",
    });
  }

  const newCard = new Card({
    name,
    link,
    owner: ownerId,
  });

  try {
    const card = await newCard.save();
    res.status(CREATED).json(card);
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};

export const deleteCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next({
        status: NOT_FOUND,
        message: "Карточка не найдена",
      });
    }
    if (!card.owner.equals(req.user!._id)) {
      return next({
        status: 403,
        message: "Недостаточно прав для удаления карточки",
      });
    }
    await card.deleteOne();
    res.send({ message: "Карточка удалена" });
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};

export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find().populate("owner").populate("likes");
    res.status(OK).json(cards);
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};

export const getCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId)
      .populate("owner")
      .populate("likes");
    if (!card) {
      return next({
        status: NOT_FOUND,
        message: "Карточка не найдена",
      });
    }
    res.status(OK).json(card);
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};

export const likeCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return next({
        status: BAD_REQUEST,
        message: "Переданы некорректные данные для постановки лайка",
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } }, // Добавить _id пользователя в массив likes, если его там еще нет
      { new: true }
    );

    if (!updatedCard) {
      return next({
        status: NOT_FOUND,
        message: "Передан несуществующий _id карточки",
      });
    }

    res.status(OK).json(updatedCard);
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};

export const dislikeCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return next({
        status: BAD_REQUEST,
        message: "Переданы некорректные данные для снятия лайка",
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } }, // Убрать _id пользователя из массива likes
      { new: true }
    );

    if (!updatedCard) {
      return next({
        status: NOT_FOUND,
        message: "Передан несуществующий _id карточки",
      });
    }

    res.status(OK).json(updatedCard);
  } catch (err) {
    next(err); // Передаем ошибку в централизованную обработку ошибок
  }
};
