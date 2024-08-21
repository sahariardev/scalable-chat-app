import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connection established');
    } catch (error) {
        console.log('MongoDB connection established failed', error.message);
    }
}

export default connectToMongoDB;