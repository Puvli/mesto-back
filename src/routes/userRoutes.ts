import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateProfile, updateAvatar } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile); // PATCH /users/me - обновление профиля
router.patch('/me/avatar', updateAvatar); // PATCH /users/me/avatar - обновление аватара

export default router;
