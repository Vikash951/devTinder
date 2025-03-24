const express = require("express");

const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");



userRouter.get("/user/requests/received" , userAuth , async (req , res) =>{
    
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find(
                {
                    toUserId : loggedInUser._id,
                    status : "interested"
                }
        ).populate("fromUserId" , ["firstName" , "lastName"]);

        console.log(connectionRequests);

        res.json({
            message : "Data fetched successfully" , 
            data : connectionRequests
        })
    }
    catch(err){
        res.status(400).send("Error" + err.message);
    }
})

userRouter.get("/user/connections" , userAuth , async (req , res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {toUserId : loggedInUser._id , status : "accepted"},
                {fromUserId : loggedInUser._id , status : "accepted"}
            ]
        }).populate("fromUserId" , "firstName lastName")
          .populate("toUserId" , "firstName lastName")

        const data = connectionRequests.map((row) =>{
            if(row.fromUserId._id.toString() ===  loggedInUser._id.toString()){
                return row.toUserId;
            }

            return row.fromUserId;
        })

        res.send({data : data});
    }
    catch(err){
        res.status(400).send({message : err.message});
    }
})

module.exports = userRouter;