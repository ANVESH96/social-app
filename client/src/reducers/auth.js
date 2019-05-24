import {REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR} from "../actions/types"
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated : false,
    isloading : true,
    userdata:null
}

export default function(state=initialState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
        localStorage.setItem('token',action.payload)
        return{
            ...state,
            isAuthenticated:true,
            isloading:false
        }
        case REGISTER_FAIL:
        localStorage.removeItem('token')
        return{
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        case USER_LOADED:
        return{
            ...state,
            isAuthenticated:true,
            isloading:false,
            user: action.payload
        }
        case AUTH_ERROR:
        return{
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        default:
        return state

    }

}