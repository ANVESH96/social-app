import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE } from "../actions/types";

const initialState ={
    profile:null,
    profiles:[],
    repos:[],
    isloading:true,
    error:{}
}

export default function(state=initialState,action){

    switch(action.type){
        case GET_PROFILE:
        console.log("reducer",action.payload)
        return{
            ...state,
            profile:action.payload,
            isloading:false
        }
        case UPDATE_PROFILE:
        console.log("update reducer",action.payload)
        return{
            ...state,
            profile:action.payload,
            isloading:false
        }
        case PROFILE_ERROR:
        return{
            ...state,
            error:action.payload.statusText,
            isloading:false
        }
        case CLEAR_PROFILE:
        return{
        ...state,
        profile:null,
        repos:[],
        isloading:false
        }
        default:
        return state
    }
}