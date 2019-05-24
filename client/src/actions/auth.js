import axios from "axios"
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR} from "./types"
import {setAlert} from "./alert"
import setAuthToken from "../../src/util/setAuthtToken"
//REGISTER USER
export const registerUser=({name,email,password}) => async dispatch =>{
  const config={
      headers:{
          'Content-Type':'application/json'
      }
  }
  const body =JSON.stringify({name,email,password})
  try{

  const res =await axios.post("/users/",body,config)
  const token = await res.data
  dispatch({type:REGISTER_SUCCESS,payload:token})
  }
  catch(err){
      const errors = err.response.data.errors
      if(errors){
          errors.forEach(error=>dispatch(setAlert(error.msg,'Registration failed')))
      }
    dispatch({
        type:REGISTER_FAIL
    })
  }
}
 
//check for login 
export const loadUser=()=>async dispatch =>{
 if(localStorage.token){
  setAuthToken(localStorage.token)
 }
 try{
     const resp = await axios.get("/auth")
     dispatch({
         type:USER_LOADED,
         payload :resp.data
     })
 }
 catch(err){
  dispatch({
      type:AUTH_ERROR
  })
 }
}
