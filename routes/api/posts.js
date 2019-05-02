const express =require('express')
const postsrouter =express.Router()


postsrouter.get('/',(req,res)=>res.send('Posts router'))

module.exports = postsrouter