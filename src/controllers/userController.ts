// import { Request, Response, NextFunction } from "express";
// import User, { IUser } from "../models/user";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import errorHandler from "../middleware/errorHandler";
// import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../status/status";
// import { JWT_SECRET } from "../config";

// export const getAllUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };

// export const getUserById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
//     }
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };

// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, about, avatar, email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Email и пароль обязательны" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name: name || "Жак-Ив Кусто",
//       about: about || "Исследователь",
//       avatar:
//         avatar ||
//         "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
//       email: email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(CREATED).json({
//       _id: newUser._id,
//       name: newUser.name,
//       about: newUser.about,
//       avatar: newUser.avatar,
//       email: newUser.email,
//     });
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Неправильные почта или пароль" });
//     }

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Неправильные почта или пароль" });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Неправильные почта или пароль" });
//     }

//     // const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//     const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//     res.cookie("token", token, { httpOnly: true });
//     res.status(OK).json({ token });
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };

// export const updateProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { ...req.body },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Переданы некорректные данные" });
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };

// export const updateAvatar = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { avatar: req.body.avatar },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: "Переданы некорректные данные" });
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     next(err); // Передача ошибки в errorHandler
//   }
// };
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorHandler from "../middleware/errorHandler";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../status/status";
import { JWT_SECRET } from "../config";
import { Types } from "mongoose";

// Расширение интерфейса Request для добавления свойства user
export interface CustomRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    // Добавьте другие свойства пользователя, если нужно
  };
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
    }
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Email и пароль обязательны" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name || "Жак-Ив Кусто",
      about: about || "Исследователь",
      avatar:
        avatar ||
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(CREATED).json({
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Неправильные почта или пароль" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Неправильные почта или пароль" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Неправильные почта или пароль" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true });
    res.status(OK).json({ token });
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};

export const updateProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Переданы некорректные данные" });
    }

    res.json(updatedUser);
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};

export const updateAvatar = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(NOT_FOUND).json({ message: "Пользователь не найден" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Переданы некорректные данные" });
    }

    res.json(updatedUser);
  } catch (err) {
    next(err); // Передача ошибки в errorHandler
  }
};
