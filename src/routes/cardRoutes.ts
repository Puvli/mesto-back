// import { Router } from "express";
// import {
//   createCard,
//   deleteCard,
//   dislikeCard,
//   getAllCards,
//   getCardById,
//   likeCard,
// } from "../controllers/cardController";
// import { celebrate, Joi } from "celebrate";

// const router = Router();

// router.post(
//   "/",
//   celebrate({
//     params: {
//       name: Joi.string().min(2).max(30).required(),
//       link: Joi.string().uri().required(),
//     },
//   }),
//   createCard
// );

// router.get("/", getAllCards);

// router.delete(
//   "/:cardId",
//   celebrate({
//     params: {
//       cardId: Joi.string().hex().length(24).required(),
//     },
//   }),
//   deleteCard
// );

// router.get(
//   "/:cardId",
//   celebrate({
//     params: {
//       cardId: Joi.string().hex().length(24).required(),
//     },
//   }),
//   getCardById
// );

// router.put(
//   "/:cardId/likes",
//   celebrate({
//     params: {
//       cardId: Joi.string().hex().length(24).required(),
//       userId: Joi.string().hex().length(24).required(),
//     },
//   }),
//   likeCard
// ); // PUT /cards/:cardId/likes - поставить лайк карточке
// router.delete(
//   "/:cardId/likes",
//   celebrate({
//     params: {
//       cardId: Joi.string().hex().length(24).required(),
//       userId: Joi.string().hex().length(24).required(),
//     },
//   }),
//   dislikeCard
// ); // DELETE /cards/:cardId/likes - убрать лайк с карточки

// export default router;
import { Router } from "express";
import {
  createCard,
  deleteCard,
  dislikeCard,
  getAllCards,
  getCardById,
  likeCard,
} from "../controllers/cardController";
import { celebrate, Joi, Segments } from "celebrate";

const router = Router();

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri().required(),
    }),
  }),
  createCard
);

router.get("/", getAllCards);

router.delete(
  "/:cardId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteCard
);

router.get(
  "/:cardId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  getCardById
);

router.put(
  "/:cardId/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeCard
);

router.delete(
  "/:cardId/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeCard
);

export default router;
