const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50
    },
    lastName : {
        type : String,
        minLength : 4,
        maxLength : 50
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                //throw new Error("password is not valid")
            }
        }
    },
    age : {
        type : Number,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl : {
        type : String,
    },
    about : {
        type : String,
        default : "This is a default about of the user!",
    },
    skills : {
        type : [String],
    },
    
} , {timestamps : true})

module.exports = mongoose.model("User" , userSchema);

