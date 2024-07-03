import express from 'express';
import connectDB from './db';
import userRoutes from './routes/userRoutes';
import cardRoutes from './routes/cardRoutes'; // Импортируйте маршруты для карточек
import { Types } from 'mongoose';
import errorHandler from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// Подключение к базе данных
connectDB();

app.use(express.json()); // Для парсинга JSON-тел запросов

app.use((req, res, next) => {
  req.user = {
    _id: new Types.ObjectId('6682957cf94bdfc0490f2ebd'), // Используйте Types.ObjectId для создания ObjectId
  };
  next();
});

// Роуты
app.use('/users', userRoutes);
app.use('/cards', cardRoutes); // Подключите маршруты для карточек

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Middleware для обработки ошибок
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
