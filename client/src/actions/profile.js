import axios from "axios"
import {setAlert} from "./alert"
import {PROFILE_ERROR,GET_PROFILE,UPDATE_PROFILE} from "./types"

//GET profile of a user
export const getProfile=()=>async dispatch =>{
    try{
        const res= await axios.get("/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }

    catch(err){
        const errors =err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })

    }

}

//Create or Update profile
export const createProfile =(formData,history,edit=false)=>async dispatch =>{
    console.log("action",formData)
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.post("/profile/me",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })

    dispatch(setAlert(edit? 'Profile Updated':'Profile Created','success'))
    console.log(edit)
    if(!edit){
        history.push("/dashboard")
    }
    }
 catch(err){
     const errors =err.response
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}

//Add experience
export const addExperience =({formData,history}) => async dispatch=>{
    console.log("experience form data",formData)
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.put("/profile/experience",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:UPDATE_PROFILE,
        payload:res.data
    })
    dispatch(setAlert('Experience added','success'))
    history.push("/dashboard")
    }
 catch(err){
     const errors =err.response.data.errors
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}

//Add Education
export const addEducation =({formData,history}) => async dispatch=>{
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.put("/profile/education",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:UPDATE_PROFILE,
        payload:res.data
    })
    dispatch(setAlert('Education added','success'))
    history.push("/dashboard")
    }
 catch(err){
     const errors =err.response.data.errors
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}