import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to MongoDB")
  }
  catch(error) {
    console.error("Error connecting to DB: ", error)
    throw error
  }
}