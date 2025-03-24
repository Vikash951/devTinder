//this line import express module into the file
const express = require('express');
const connectDB = require("./config/database");

//this create instance of an express application
const app = express();

const cookieParser = require("cookie-parser");


app.use(cookieParser());

//it reads the json and concert it inot a javascript object and just adds that javascript object back
app.use(express.json());


// app.patch("/update" , async (req , res) =>{
//        try{
//             const data = req.body;
//             const ALLOWED_UPDATES = ["firstName" , "lastName" , "password" ,"photoUrl" , "about" , "gender" , "age" , "skills"];
//             const isUpdateAllowed = Object.keys(data).every((k) =>
//                                         ALLOWED_UPDATES.includes(k)
//             ) 

//             if(!isUpdateAllowed){
//                 throw new Error("You cannot update this field");
//             }
//             if(data?.skills.length > 10){
//                 throw new Error("skills cannot be more than 10");
//             }
//            const userId = req.body.id;
//            await User.findByIdAndUpdate(userId , req.body  , {runValidators:true});
//            res.send("user updated successfully");
//        }
//        catch(err){
//             res.status(404).send("Update failed : " + err.message);
//        }
// })

// app.delete("/deleteUser" , async (req , res) =>{
//     const userEmail = req.body.emailId;
//     console.log(userEmail);
//      try{
//         const userEmail = req.body.emailId;
//         await User.deleteMany({emailId : userEmail});
//         res.send("user deleted successfully");
//      }
//      catch(err){
//         res.status(404).send("Something wrong happened");
//      }
// })

// app.get("/user" ,async (req , res) => {
//     try{
//         //const userEmail = req.body.emailId;
//         const user = await User.find({});
//         if(user.length === 0){
//             res.status(404).send("user not found")
//         }
//         res.send(user);
//     }
//     catch(err){
//         res.status(404).send("something went wrong");
//     }
// })





//sign in api and then email validation logic

const auth = require("./routes/auth");
const profile = require('./routes/profile');
const request = require('./routes/request');
const user = require('./routes/user')

app.use("/" , auth);
app.use('/' , profile);
app.use('/' , request);
app.use('/' , user);



connectDB()
       .then(() =>{
            app.listen(3000 , () =>{
                console.log("server is running successfully on port no 3000");
            })
       })
       .catch((err) =>{
            console.error("database cannot be conneced: " , err);
       })