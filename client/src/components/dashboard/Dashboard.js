import React,{Fragment,useEffect} from "react"
import {connect} from "react-redux"
import {Link} from"react-router-dom"
import {getProfile} from "../../actions/profile"
import Spinner from "../layout/Spinner"
import Dashboardactions from "./Dashboardactions"
const Dashboard =({auth:{user},profile:{profile,isloading},getProfile}) =>{
    useEffect(()=>{
        getProfile();
    },[getProfile])
    return( isloading && profile ===null ? <Spinner/> :<Fragment>
        <h1 className="large text-primary"> Dashboard</h1> 
        <p className="lead">
        <i class="far fa-smile"></i> Welcome {user && user.name}</p>
        { profile !==null ? <Fragment> <Dashboardactions/></Fragment>:<Fragment><p>You haven't created a profile. Create One and add info</p>
        <Link to ="/create_profile" className="btn btn-primary"> Create Profile</Link></Fragment>}
        </Fragment>
        
    )
    }

const mapStateToProps = state =>({
   auth: state.auth,
   profile: state.profile
})
export default connect(mapStateToProps,{getProfile})(Dashboard)
