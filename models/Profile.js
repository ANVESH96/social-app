const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        required:true
    },
    company:{
        type:String
    },
    location:{
        type:String,
        required:true
    },
    website:{
        type:String
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String,
       
    },
    githubusername:{
        type:String,
        required:true
    },
    experience:[
        {
        companyname:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
    }
    ],
    education:[
        {
        schoolname:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        },
        degree:{
            type:String,
            required:true
        },
        major:{
            type:String,
            required:true
        },
    }
    ],
   social:[
        {
        github:{
            type:String,
            required:true
        },
        LinkedIn:{
            type:String,
            required:true
        },
        Instagram:{
            type:String,
            required:true
        },
    }
    ],
    

})

module.exports =Profile=mongoose.model('Profile',profileSchema)