const express =require("express")
const app =express()
const dbconnection =require('./config/connect')


dbconnection()

app.get("/",(req,res)=>res.send("EXPRESS IS RUNNING"))

const PORT =process.env.PORT||4000

app.listen(PORT,()=>{
    console.log("SERVER is listening")
})