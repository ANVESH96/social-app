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

//GET all profiles
//No authentication --acessed public

profilerouter.get('/',async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
    }
    catch(err){
        console.log(err)
    }
})


//GET profilebyId
//No authentication --acessed public

profilerouter.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({message:"no profile"})
        }
        res.json(profile)
    }
    catch(err){
        res.send(500).json({message:"Profile not found"})
    }
})

//Delte profile
// authentication needed --acessed private

profilerouter.delete('/',auth,async(req,res)=>{
    try{
        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        .catch((err)=>{
            console.log(err)
        })
       //remove user
        await User.findOneAndRemove({_id:req.user.id})
        .catch((err)=>{
            console.log(err)
        })

        res.json({message:"User and Profile deleted"})
    }
    catch(err){
        res.send(500).json({message:"Profile not found"})
    }
})


//Update profile experience and education
//authentication needed -- accesed privately
profilerouter.put('/experience',[auth,[check('role','role is required').not().isEmpty(),
check('companyname','Company is required').not().isEmpty(),
check('from','From Date is required').not().isEmpty()
]],async(req,res)=>{
    const validatejson =validationResult(req)
    if(!validatejson.isEmpty()){
       return res.status(400).json({message:validatejson.error()})
    }
  const{
      title,
      companyname,
      role,
      from,
      to,
      description,
      location
  } =req.body

  const Experience={
    title,
    companyname,
    role,
    from,
    to,
    description,
    location
  }
  try{
const profile  =await Profile.findOne({user:req.user.id})
profile.experience.unshift(Experience)
await profile.save()
res.json(profile)
  }
  catch(err){
    res.send(500).json({message:err})
  }
})

//DELETE Experience
//Authentication needed --accesed private
profilerouter.delete('/experience/:exp_id',auth,async(req,res)=>{
 
    try{
    const profile =await Profile.findOne({user:req.user.id})
    const experience_index = await profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
    await profile.experience.splice(experience_index,1)
    await profile.save()
    res.json(profile)
}
    catch(err){
     res.status(500).json({message:err})
    }
})

//Add education
//Authentication needed --accesed private
profilerouter.put('/education',[auth,[check('schoolname','schoolname is required').not().isEmpty(),
check('degree','degreetype is required').not().isEmpty(),
check('major','major is required').not().isEmpty(),
check('from','form date is required').not().isEmpty(),
]],async(req,res)=>{
    const validatejson =validationResult(req)
    if(!validatejson.isEmpty()){
       return res.status(400).json({message:validatejson.error()})
    }
  const{
     schoolname,
     location,
     major,
     degree,
     from,
     to
  } =req.body

  const Education={
    schoolname,
     location,
     major,
     degree,
     from,
     to
  }
  try{
const profile  =await Profile.findOne({user:req.user.id})
profile.education.unshift(Education)
await profile.save()
res.json(profile)
  }
  catch(err){
    res.send(500).json({message:err})
  }
})

//DELETE Education
//Authentication needed --accesed private
profilerouter.delete('/education/:edu_id',auth,async(req,res)=>{
 
    try{
    const profile =await Profile.findOne({user:req.user.id})
    const education_index = await profile.education.map(item=>item.id).indexOf(req.params.edu_id)
    await profile.education.splice(education_index,1)
    await profile.save()
    res.json(profile)
}
    catch(err){
     res.status(500).json({message:err})
    }
})

module.exports = profilerouter