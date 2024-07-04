import { INTERNAL_SERVER_ERROR } from '../status/status';
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

  // Отправляем ответ с ошибкой
  res.status(INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandler;
