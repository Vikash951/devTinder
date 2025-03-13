//this line import express module into the file
const express = require('express');

//this create instance of an express application
const app = express();



app.use("/hello" , (req , res) =>{
    res.send("hello page ki entry hogai")
})


//this will match all the HTTP method API calls to /test
app.use("/test" , (req , res) =>{
    res.send("test page")
})

//this will only handle GET call to /user
app.get("/user" , (req , res) =>{
    res.send({"firstName" : "Vikash" , "lastName" : "Gupta"} )
})

app.post("/user" , (req , res) =>{
    res.send("user database updated successfully")
})

app.delete("/user" , (req , res) =>{
    res.send("user deleted successfully")
})

app.use("/" ,(req , res) => {
    res.send("home page")
})



//
app.listen(3000 , () => {
    console.log('server is running successfully on port no. 3000')
})