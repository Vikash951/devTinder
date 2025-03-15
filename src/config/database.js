const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://vikashkumargupta951:3Oc6qISaPw2zm08n@nodejs.f7338.mongodb.net/devTinder"); 
        console.log("database connected successfully");
    }
    catch(err) {
        console.error("database connection failed: " , err);
    }
     
};

module.exports = connectDB;
