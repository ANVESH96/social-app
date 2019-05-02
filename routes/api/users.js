const express =require('express')
const usersrouter =express.Router()
const {check,validationResult} =require("express-validator")

// usersrouter.get('/',(req,res)=>res.send('Users router'))
usersrouter.post('/',(req,res)=>{
    console.log(req.body),
    res.send("post request")
})

module.exports = usersrouter