const express = require('express');
const app = express()
const config = require('dotenv').config()

app.get('/',(req, res)=>{
    res.send("Hello Node API")
})

app.listen(3000, ()=>{
    console.log("Server listening to PORT : ", process.env.PORT)
})

