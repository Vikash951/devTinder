//this line import express module into the file
const express = require('express');
const connectDB = require("./config/database");

//this create instance of an express application
const app = express();

const User = require("./models/user");

app.post("/signup" , async (req , res) =>{
    //creating a new instance of the User model
    const user = new User({
        firstName : "Suyash",
        lastName : "Gupta",
        emailId : "suyashkumargupta@gmail.com",
        password: "Suyash@123" ,
        age: "20",
        gender: "male"
    })

    await user.save();

    res.send("user added successfully");
})

connectDB()
       .then(() =>{
            app.listen(3000 , () =>{
                console.log("server is running successfully on port no 3000");
            })
       })
       .catch((err) =>{
            console.error("database cannot be conneced: " , err);
       })