import mongoose from "mongoose";

export const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("MONGODB Connected!");
  } catch (error) {
    console.error("Error in conecting MONGODB!", error);
    process.exit(1); // exit with db connection failure
  }
};
