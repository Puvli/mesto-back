import { INTERNAL_SERVER_ERROR, CONFLICT } from '../status/status';
import { Request, Response, NextFunction } from 'express';

// Middleware для обработки ошибок
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Ошибка:', err);

  // Определяем стандартный код ошибки
  let message = 'На сервере произошла ошибка';

   // Обработка ошибок Mongoose по коду 11000 (дубликат уникального поля)
   if (err.name === 'MongoError' && (err as any).code === 11000) {
    message = 'Пользователь с таким email уже существует';
    return res.status(CONFLICT).json({ message });
  }

  // Отправляем ответ с ошибкой
  res.status(INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandler;
