const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User" //reference to the user collection
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {
        type : String,
        enum : {
            values : ["interested" , "ignored" , "rejected" , "accepted" ],
            message : `{VALUE} is not a valid status`
        }
    }
  },
  {
    timestamps : true,
  } 
)

connectionRequestSchema.pre("save" , function(next){
    const connectionRequest = this;
    //check if fromuserid is same as touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself");
    }

    next();
})

connectionRequestSchema.index({fromUserId : 1 , toUserId : 1});

module.exports = mongoose.model("ConnectionRequest" , connectionRequestSchema);