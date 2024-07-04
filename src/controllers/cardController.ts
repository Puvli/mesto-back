import { Request, Response, NextFunction } from "express";
import Card from "../models/card";
import { Types } from "mongoose";
import errorHandler from "../middleware/errorHandler";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../status/status";
interface CustomRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

export const createCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const ownerId = req.user?._id;

  if (!ownerId) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Переданы некорректные данные при создании карточки" });
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
    errorHandler(err as Error, req, res, next);
  }
};

// Удалить карточку
export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);

    if (!deletedCard) {
      return res
        .status(NOT_FOUND)
        .json({ message: "Карточка с указанным _id не найдена" });
    }

    res.status(OK).json(deletedCard);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
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
    errorHandler(err as Error, req, res, next);
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
      return res.status(NOT_FOUND).json({ message: "Карточка не найдена" });
    }
    res.status(OK).json(card);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

// Поставить лайк карточке
export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Переданы некорректные данные для постановки лайка" });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } }, // Добавить _id пользователя в массив likes, если его там еще нет
      { new: true }
    );

    if (!updatedCard) {
      return res
        .status(NOT_FOUND)
        .send({ message: "Передан несуществующий _id карточки" });
    }

    res.status(OK).json(updatedCard);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};

// Убрать лайк с карточки
export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // Получаем _id пользователя из req.user, если он существует

    if (!userId) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Переданы некорректные данные для снятия лайка" });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } }, // Убрать _id пользователя из массива likes
      { new: true }
    );

    if (!updatedCard) {
      return res
        .status(NOT_FOUND)
        .send({ message: "Передан несуществующий _id карточки" });
    }

    res.status(OK).json(updatedCard);
  } catch (err) {
    errorHandler(err as Error, req, res, next);
  }
};
