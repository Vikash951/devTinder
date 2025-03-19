const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryption = (req) => {
    bcrypt.hash(req.body.password , saltRounds)
    .then((hash) =>{
        
        return req.body.password =  hash;
    })
    
}

module.exports = {encryption};