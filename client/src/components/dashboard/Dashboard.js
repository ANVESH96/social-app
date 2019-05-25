import React,{Fragment,useEffect} from "react"
import {connect} from "react-redux"
import {getProfile} from "../../actions/profile"


const Dashboard =({auth,profile,getProfile}) =>{
    useEffect(()=>{
        getProfile();
    },[getProfile])
    return(
        <Fragment>
        <div>
            Dashboard
            </div>
            </Fragment>
    )

    }

const mapStateToProps = state =>({
   auth: state.auth,
   profile: state.profile
})
export default connect(mapStateToProps,{getProfile})(Dashboard)
