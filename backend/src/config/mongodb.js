import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on("error", (err) => {
            console.error(`MongoDB connection error: ${err.message}`);
        });
        mongoose.connection.on("connected", () => {
            console.log("✅ MongoDB connected successfully");
        });
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
};

export default connectDB;
