import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://Zworking:sidhu123@cluster0.muuu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('✅ DB connected...');
    } catch (error) {
        console.error('❌ DB connection failed:', error.message);
    }
}

export default connectDB;
