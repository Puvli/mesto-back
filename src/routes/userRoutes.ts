import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateProfile, updateAvatar, login } from '../controllers/userController';
import { celebrate, Joi } from 'celebrate';
import errorHandler from '../middleware/errorHandler';

const router = Router();

// Middleware для централизованной обработки ошибок
router.use(errorHandler);

// Роуты с валидацией
router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().hex().length(24).required(),
  },
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), updateAvatar);

export default router;
