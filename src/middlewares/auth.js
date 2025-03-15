 const adminAuth =  (req , res , next) =>{
    const token = "xyzas";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized === true){
        next();
    }
    else{
        res.status(401).send("unauthorized request");
    }
}

module.exports = {adminAuth};