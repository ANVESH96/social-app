const express =require('express')
const authrouter =express.Router()


authrouter.get('/',(req,res)=>res.send('Auth router'))

module.exports = authrouter