//this line import express module into the file
const express = require('express');
const connectDB = require("./config/database");

//this create instance of an express application
const app = express();

//it reads the json and concert it inot a javascript object and just adds that javascript object back
app.use(express.json());

const User = require("./models/user");

app.post("/signup" , async (req , res) =>{

    console.log(req.body);
    //creating a new instance of the User model
    const user = new User(
        // firstName : req.body.firstName,
        // lastName : req.body.lastName,
        // emailId : req.body.emailId,
        // password: req.body.password ,
        // age: req.body.age,
        // gender: req.body.gender
        req.body
    )

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