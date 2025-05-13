import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.URI;
    if (!uri) throw new Error("MONGODB_URI not found in .env");

    await mongoose.connect(uri, {
     
     // optional: specify db name if needed
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
