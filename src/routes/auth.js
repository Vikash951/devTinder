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

authRouter.post("/logout" , (req , res) =>{
    res.cookie("token" , null , {expires : new Date(Date.now())});

    res.send("logout successfully");
})

module.exports = authRouter;