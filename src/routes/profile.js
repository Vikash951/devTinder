const express = require("express");
const {userAuth }= require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require('validator');

const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view" , userAuth ,async (req , res) =>{

    try{

        const user = await User.findById(req.user._id).select("firstName lastName age gender about skills")
        if(!user){
            throw new Error("user doesn't exist");
        }
        
        res.send( "displaying profile" + user);
    }
    catch(err){
        res.status(400).send("Error " + err.message);
    }
})

profileRouter.patch("/profile/edit" , userAuth , async ( req , res) =>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        const updatedData = req.body;

        Object.keys(req.body).forEach((key)=> loggedInUser[key] = updatedData[key])

        await loggedInUser.save();

       res.json({message : `${loggedInUser.firstName}, your Profile edited successfully`,  data : loggedInUser});
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

profileRouter.patch("/profile/password" , async (req , res) => {
    try{
        const {emailId , currentPassword , newPassword} = req.body;
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("password is not strong");
        }
        
        const user = await User.findOne({emailId});
    
        if(!user){
            throw new Error("Invalid credential");
        }
    
        const isPasswordValid = await user.validatePassword(currentPassword);

        if(!isPasswordValid){
            throw new Error("current password is not valid");
        }
    
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        
        user.password = hashedPassword;
        await user.save();
        
    
        res.send("password updated successfully");
    
    }
    catch(err){
        res.send("Error :" + err.message);
    }
   
})

module.exports = profileRouter;
