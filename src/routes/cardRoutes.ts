import { Router } from "express";
import {
  createCard,
  deleteCard,
  dislikeCard,
  getAllCards,
  getCardById,
  likeCard,
} from "../controllers/cardController";

const router = Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.delete("/:cardId", deleteCard);
router.get("/:cardId", getCardById);
router.put("/:cardId/likes", likeCard); // PUT /cards/:cardId/likes - поставить лайк карточке
router.delete("/:cardId/likes", dislikeCard); // DELETE /cards/:cardId/likes - убрать лайк с карточки

export default router;
