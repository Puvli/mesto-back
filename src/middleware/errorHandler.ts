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
  let statusCode = 500;
  let message = 'Ошибка по умолчанию';

  // Проверяем тип ошибки и устанавливаем соответствующий статус код
  // if (err instanceof SyntaxError) {
  //   statusCode = 400;
  //   message = 'Переданы некорректные данные';
  // } else if (err.name === 'ValidationError') {
  //   statusCode = 400;
  //   message = err.message; // Ошибка валидации
  // } else if (err.name === 'CastError') {
  //   statusCode = 404;
  //   message = 'Пользователь не найден';
  // }

  // Отправляем ответ с ошибкой
  res.status(statusCode).json({ message });
};

export default errorHandler;
