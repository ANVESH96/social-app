import React from "react"
import {Link} from "react-router-dom"
const Landing=()=>{
    return(
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, knowledge transfer and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to="/Register" className="btn btn-primary">Sign Up</Link>
              <Link to="/Login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Landing
