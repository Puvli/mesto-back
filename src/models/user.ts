import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

// Регулярное выражение для проверки URL аватара
const avatarURLRegex = new RegExp(
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
);

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => {
        return validator.isURL(v) && avatarURLRegex.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // по умолчанию не возвращаем пароль
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
