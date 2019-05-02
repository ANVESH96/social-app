const express =require('express')
const profilerouter =express.Router()


profilerouter.get('/',(req,res)=>res.send('Profile router'))

module.exports = profilerouter