import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    console.log("MongoDB URI: ", process.env.MONGODB_URI);

    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("MONGODB connection ERROR: ", error.message);
        process.exit(1);
    }
};


export default connectDB;