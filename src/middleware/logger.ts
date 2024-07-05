import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

const logDirectory = path.join(__dirname, '../../logs'); // Абсолютный путь до директории logs

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'request.log') }), // Используем абсолютный путь для request.log
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log') }), // Используем абсолютный путь для error.log
  ],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
