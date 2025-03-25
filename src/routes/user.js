const express = require("express");

const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");



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

userRouter.get("/feed" , userAuth , async (req , res) =>{
    try{
        //user should see all the user cards except 
        // 0. his own card
        // 1. his connections
        // 2. ignored people
        // 3. already sent the connection request
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
           $and: [ {_id : {$nin: Array.from(hideUsersFromFeed)},} ,
                    {_id : {$ne : loggedInUser._id}}
           ]
        }).select("firstName lastName age gender about skills").skip(skip).limit(limit);

       // console.log(users);

       // console.log(hideUsersFromFeed);

        res.send(users);

    }
    catch(err){
        res.send({"Error" : err.message});
    }
})

module.exports = userRouter;