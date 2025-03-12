//this line import express module into the file
const express = require('express');

//this create instance of an express application
const app = express();

app.use((req , res) => {
    res.send("hello from nodejs server")
})

//
app.listen(3000 , () => {
    console.log('server is running successfully on port no. 3000')
})