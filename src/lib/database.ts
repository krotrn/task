import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface globalThisType { __mongooseCache: { conn: typeof mongoose; promise: Promise<typeof mongoose>; }; }

if(!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}




let cached = (globalThis as unknown as globalThisType).__mongooseCache as { conn: typeof mongoose; promise: Promise<typeof mongoose>; };

if (!cached) {
  cached = (globalThis as unknown as globalThisType).__mongooseCache = {conn: mongoose, promise: mongoose.connect(MONGODB_URI)};
}

export const connectToDB = async () => {
  await cached.promise;
  return cached.conn;
}