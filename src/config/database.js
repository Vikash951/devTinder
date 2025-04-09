const mongoose = require('mongoose');

require('dotenv').config();

const dbSecret = process.env.DB_CONNECTION_SECRET;





const connectDB = async () => {
    try{
        await mongoose.connect(dbSecret); 
        console.log("database connected successfully");
    }
    catch(err) {
        console.error("database connection failed: " , err);
    }
     
};

module.exports = connectDB;
