const express = require('express');
const { Chat } = require('../models/chat');
const {userAuth} = require("../middlewares/auth")
const mongoose = require('mongoose');


const chatRouter = express.Router();

chatRouter.get('/chat/:targetUserId' , userAuth ,  async (req , res) => {
    const targetUserId = new mongoose.Types.ObjectId(req.params.targetUserId);
    const userId = req.user._id;
    console.log("User ID:", userId);
    console.log("Target User ID:", targetUserId);

    try{
        let chat = await Chat.findOne({
            participants : {$all : [userId , targetUserId]},
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        })

        if(!chat){
            chat = new Chat({
                participants : [userId , targetUserId], messages : []
            })
            await chat.save();
        }

        res.json(chat);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = chatRouter;