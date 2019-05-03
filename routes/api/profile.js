const express =require('express')
const profilerouter =express.Router()
const Profile = require("../../models/Profile")
const User =require("../../models/User")
const auth = require("../../middleware/auth")
const {check,validationResult} =require("express-validator/check")
//GET current user profile
profilerouter.get('/me',auth,async(req,res)=>{
    
    try{
        const profile =await Profile.findOne({user:req.user.id}).populate("User",['avatar,name'])
        if(!profile){
            return res.status(400).json({message:"Profile doesnot exists"})
        }
        res.json(profile)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
})

profilerouter.post('/me',[check('status',"Status is required").not().isEmpty(),
check('location',"Location should be valid").not().isEmpty(),
check('skills',"Skills are required").not().isEmpty()
],auth,async (req,res)=>{
    //check for input validations
    const valid =validationResult(req)
    if(!valid.isEmpty()){
        return res.status(400).json({errors:valid.array()})
    }

    //Get profile objects
    const{ company,location,website,status,bio,githubusername,skills,LinkedIn,github,Instagram} =req.body
    const profileParams ={
    } 
    
    //Assign profile objects to profileparams
    profileParams.user =req.user.id
    if(company) profileParams.company =company
    if(location) profileParams.location =location
    if(website) profileParams.website =website
    if(status) profileParams.status =status
    if(bio) profileParams.bio =bio
    if(githubusername) profileParams.githubusername =githubusername
    if(skills) {profileParams.skills =skills.split(",").map(skill=>
        skill.trim()
    )}

    //Build Social objects for profile
    profileParams.social={}
    if(github) profileParams.social.github = github
    if(LinkedIn) profileParams.social.LinkedIn=LinkedIn
    if(Instagram) profileParams.social.Instagram =Instagram

    //Create and Update a profile
try{
    let profile = await Profile.findOne({user:req.user.id})
    if (profile){
        //then update
        profile = await Profile.findOneAndUpdate({user:req.user.id},{$set :profileParams},{new :true})
        return res.json({profile})
    }
    //create a profile
    profile = new Profile(profileParams)
    await profile.save()
    return res.json(profile)
}
catch(err){
    console.log(err)
}
    res.status(400)
})
module.exports = profilerouter