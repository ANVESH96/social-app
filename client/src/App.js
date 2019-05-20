import React from 'react';
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import{BrowserRouter as Router,Route,Switch} from "react-router-dom"
import "./App.css"

function App() {
  return (
      <Router>
      <Navbar/>
      <Route exact path ="/" component={Landing}/>
      <section className="container">
      <Switch>
      <Route exact path ="/Login" component={Login}/>
      <Route exact path ="/Register" component={Register}/>
      </Switch>
      </section>
      </Router>
  );
}

export default App;
