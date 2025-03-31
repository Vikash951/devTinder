const jwt = require("jsonwebtoken");
const User = require("../models/user")


const userAuth = async (req , res , next) =>{

    try{
        //read the token from the request coookies
        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            return res.status(401).send("Please Login!");
        }
        const decodeObj = await jwt.verify(token , "Devtinder@1906");
        const {_id} = decodeObj;

        const user = await User.findById(_id);
        //validate the token

        if(!user){
            throw new Error("user not found");
        }

        req.user = user;

        next();
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
    

}

module.exports = {userAuth};