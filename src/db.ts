import config from './config';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbConnectionString);
    console.log('MongoDB connected');
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
