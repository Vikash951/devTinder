const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName , lastName , emailId , password , age , gender , photoUrl , about , skills} = req.body;

    
    if(!firstName || !lastName){
        throw new Error("first name or last name is not valid");
    }
    if(firstName.length<4 || firstName.length > 50){
        throw new Error("first name should be between 4 and 50");
    }
    if(lastName.length<4 || lastName.length>50){
        throw new Error("last name should be between 4 and 50")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("emailId is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName" , "lastName" , "age" , "gender" , "skills" , "about" , "photoUrl"]

    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field);
    })

    return isEditAllowed;
}

module.exports = {validateSignupData , validateEditProfileData};