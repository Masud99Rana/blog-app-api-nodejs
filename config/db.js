const mongoose = require('mongoose');

const connectDB = async () => {
  
  mongoose.set('strictQuery', false);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // console.log("MongoDB connected successfully");
  
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;