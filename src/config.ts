import dotenv from 'dotenv';
// Загружаем переменные окружения из файла .env
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
import path from 'path';

// Загружаем переменные окружения из файла .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Определяем интерфейс для конфигурации
interface Config {
  dbConnectionString: string;
  port: number;
}

// Проверяем, заданы ли все необходимые переменные окружения
const config: Config = {
  dbConnectionString: process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/mestodb',
  port: parseInt(process.env.PORT || '3000', 10),
};

export default config;
