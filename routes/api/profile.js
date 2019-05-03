const express =require('express')
const profilerouter =express.Router()

//GET current user profile
profilerouter.get('/me',(req,res)=>res.send('Profile router'))

module.exports = profilerouter