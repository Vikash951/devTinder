const express = require("express");
const {userAuth }= require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest" , userAuth ,  async (req , res) =>{
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

module.exports = requestRouter;