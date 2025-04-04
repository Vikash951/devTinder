const express = require("express");

const {validateSignupData} = require("../utils/validation");

const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

authRouter.post("/signup" , async (req , res) =>{
    
    try{
        //validation of data
        validateSignupData(req);

        // console.log(req);
       
        const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;

         //encryption of password
        const passwordHash = await bcrypt.hash(password , saltRounds)
        

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            photoUrl,
            about,
            skills
        });
        const savedUser = await user.save();
        const token = await savedUser.getJWT(); 
        res.cookie("token" , token , {expires : new Date(Date.now() + 16*3600000)});
        res.json({message : "user added successfully", data:savedUser});
    }
    catch(err){
        res.status(404).send("error message :" + err);
    }
})

authRouter.post("/login" , async (req , res) =>{
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
            const sendUser =  await User.findOne({emailId}).select("firstName lastName age gender about skills photoUrl");
            res.send(sendUser);
        }
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    }
    catch (err) {
        res.status(500).json({ message: "Error: " + err.message });
    }
})

authRouter.post("/logout" , (req , res) =>{
    res.cookie("token" , null , {expires : new Date(Date.now())});

    res.send("logout successfully");
})

module.exports = authRouter;