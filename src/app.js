// //this line import express module into the file
// const express = require('express');
// const connectDB = require("./config/database");

// //this create instance of an express application
// const app = express();

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const cookieParser = require("cookie-parser");

// const jwt = require("jsonwebtoken");

// app.use(cookieParser);

// const validator = require("validator");

// const isValid = validator.isEmail("xyz@gmail");
// console.log(isValid);

//it reads the json and concert it inot a javascript object and just adds that javascript object back
// app.use(express.json());

// const User = require("./models/user");

// const {encryption} =  require("./utils/encryption");

// const {validateSignupData} = require("./utils/validation")

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

// app.post("/signup" , async (req , res) =>{   
    
//     try{
//         //validation of data
//         validateSignupData(req);

//         //encryption of password
//         const {firstName , lastName , emailId , password} = req.body;

//         const passwordHash = await bcrypt.hash(password , saltRounds)
        

//         const user = new User({firstName , lastName ,emailId , password : passwordHash}); 
//         await user.save();
//         res.send("user added successfully");
//     }
//     catch(err){
//         res.status(404).send("error message :" + err);
//     }
// })

// app.get("/profile" , async (req , res) => {
//     const cookies = req.cookies;

//     const {token} = cookies;

//     //validate my token

//     console.log(cookies);
//     res.send("Reading cookies");
// })

// //sign in api and then email validation logic

// app.post("/login", async (req, res) => {
//     try {
//         const { emailId, password } = req.body;
//         const user = await User.findOne({ emailId });

//         if (!user) {
//             return res.status(400).send("Invalid credentials");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).send("Invalid credentials");
//         }

//         // // Generate JWT token (even for learning, setting expiry is a good practice)
//         // const token = await jwt.sign({ _id: user._id }, "Devtinder@1906", { expiresIn: "1h" });

//         // console.log(token); // Just for debugging
//         // res.cookie("token", token);
//         res.status(200).send("Login successful");
//     } catch (err) {
//         res.status(500).send("Failure: " + err.message);
//     }
// });


// connectDB()
//        .then(() =>{
//             app.listen(3000 , () =>{
//                 console.log("server is running successfully on port no 3000");
//             })
//        })
//        .catch((err) =>{
//             console.error("database cannot be conneced: " , err);
//        })



//this line import express module into the file
const express = require('express');
const connectDB = require("./config/database");

//this create instance of an express application
const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const {userAuth }= require("./middlewares/auth.js");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

app.use(cookieParser());

// const validator = require("validator");

// const isValid = validator.isEmail("xyz@gmail");
// console.log(isValid);

//it reads the json and concert it inot a javascript object and just adds that javascript object back
app.use(express.json());

const User = require("./models/user");

const {encryption} =  require("./utils/encryption");

const {validateSignupData} = require("./utils/validation")

app.patch("/update" , async (req , res) =>{
       try{
            const data = req.body;
            const ALLOWED_UPDATES = ["firstName" , "lastName" , "password" ,"photoUrl" , "about" , "gender" , "age" , "skills"];
            const isUpdateAllowed = Object.keys(data).every((k) =>
                                        ALLOWED_UPDATES.includes(k)
            ) 

            if(!isUpdateAllowed){
                throw new Error("You cannot update this field");
            }
            if(data?.skills.length > 10){
                throw new Error("skills cannot be more than 10");
            }
           const userId = req.body.id;
           await User.findByIdAndUpdate(userId , req.body  , {runValidators:true});
           res.send("user updated successfully");
       }
       catch(err){
            res.status(404).send("Update failed : " + err.message);
       }
})

app.delete("/deleteUser" , async (req , res) =>{
    const userEmail = req.body.emailId;
    console.log(userEmail);
     try{
        const userEmail = req.body.emailId;
        await User.deleteMany({emailId : userEmail});
        res.send("user deleted successfully");
     }
     catch(err){
        res.status(404).send("Something wrong happened");
     }
})

app.get("/user" ,async (req , res) => {
    try{
        //const userEmail = req.body.emailId;
        const user = await User.find({});
        if(user.length === 0){
            res.status(404).send("user not found")
        }
        res.send(user);
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
})

app.post("/signup" , async (req , res) =>{

    //console.log(req.body);
    //creating a new instance of the User model
    //const user = new User(
        // firstName : req.body.firstName,
        // lastName : req.body.lastName,
        // emailId : req.body.emailId,
        // password: req.body.password ,
        // age: req.body.age,
        // gender: req.body.gender
        //req.body
    //)

   
    
    try{
        //validation of data
        validateSignupData(req);

        //encryption of password
        const {firstName , lastName , emailId , password} = req.body;

        const passwordHash = await bcrypt.hash(password , saltRounds)
        

        const user = new User({firstName , lastName ,emailId , password : passwordHash}); 
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(404).send("error message :" + err);
    }
})

app.get("/profile" , userAuth ,async (req , res) =>{

    try{

        const user = req.user;

        

        if(!user){
            throw new Error("user doesn't exist");
        }
        
        res.send( "displaying profile");
    }
    catch(err){
        res.status(400).send("Error " + err.message);
    }
})

//sign in api and then email validation logic

app.post("/login" , async (req , res) =>{
    try{
        const {emailId , password} = req.body;

        const user = await User.findOne({emailId});

        if(!user){
            throw new Error("Invalid credential")
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT(); 

            res.cookie("token" , token , {expires : new Date(Date.now() + 16*3600000)});
            res.send("login successful");
        }
        else{
            throw new Error("Invalid credential")
        }

    }
    catch(err){
        res.send("failure :" + err);
    }
})

app.post("/sendConnectionRequest" , userAuth ,  async (req , res) =>{
    try{
        
        const user = req.user;

        if(!user){
            throw new Error("not able to send connection request");
        }
        
        res.send(user.firstName + " sent connection request ");
    }
    catch(err){
        res.status(400).send("Error " + err.message);
    }
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