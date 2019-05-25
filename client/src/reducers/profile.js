import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState ={
    profile:null,
    profiles:[],
    repo:[],
    isloading:true,
    error:{}
}

export default function(state=initialState,action){

    switch(action.type){
        case GET_PROFILE:
        console.log(action.payload)
        return{
            ...state,
            profile:action.payload,
            isloading:true
        }
        case PROFILE_ERROR:
        return{
            ...state,
            error:action.payload.statusText,
            isloading:true
        }
        default:
        return state
    }
}