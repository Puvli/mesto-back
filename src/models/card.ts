import mongoose, { Document, Schema, Types } from 'mongoose';
import User from './user'; // Импортируем модель User
import { urlRegex } from '../validation/validation';
import validator from 'validator';

// Интерфейс для карточки
interface ICard extends Document {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

// Схема карточки
const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => {
        return validator.isURL(v) && urlRegex.test(v);
      },
      message: 'Некорректный URL',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Модель карточки
const Card = mongoose.model<ICard>('card', cardSchema);

export default Card;
