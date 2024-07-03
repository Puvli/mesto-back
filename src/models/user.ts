import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  avatar: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
