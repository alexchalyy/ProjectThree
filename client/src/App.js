import Nav from "./components/Nav";
import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
//import React from "react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Enter from "./pages/Enter";
import Forgot from "./pages/Forgot";
import Sale from "./pages/Sale";
import Order from "./pages/Orders";
import Account from "./pages/Account";
 

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: null,
      LoggedInUserData: false
      // userData: false
       
       
    }

    this.getLoggedInUser = this.getLoggedInUser.bind(this)
  }


  setEmail(loggedin) {
    this.state.email = loggedin;
  }

  getEmail() {
    return this.state.email;
  }


  componentDidMount() {
    console.log(this.state.userData);
     
    // this.props.userData;
    

  }
  //do axios call to get logged in user. and pass that object to other pages
  getLoggedInUser(userData) {

    this.setState({ userData });
    // this.setState({ LoggedInUserData: userData });
    // this.state.LoggedInUserData = userData;
    console.log("Hello user data");
    console.log(userData);
  }

  render() {

    return (
      <Router>
        <div>
{/* 
        <Route exact path="/" render={() => (loggedIn ? (<Redirect to="/dashboard"/>) : ( <PublicHomePage/>))}/> */}
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/account" component= {() => <Account userData={this.state.userData} />} />
            {/* <Route exact path="/login" component={() => <Enter foo="bar" />} /> */}
            <Route path="/login" render={() => <Enter getLoggedInUser={this.getLoggedInUser} />} />
            <Route exact path="/forgot" component={Forgot} />
            {/* <Route exact path="/sale" render={() => (this.state.userData.userData.user.isLoggedIn ? (<Sale userData={this.state.userData} />) : ( <Redirect to="/login"/>) )}/> */}
            <Route exact path="/sale" component={() => <Sale userData={this.state.userData} />} /> 
              {/* <Route exact path="/sale" component={Sale} /> */}
            <Route exact path="/orders" component= {() => <Order userData={this.state.userData} />} />
            <Route component={NoMatch} />

            
          </Switch>
        </div>
      </Router>
    );
  }
  

}
export default App;
