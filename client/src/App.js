import Nav from "./components/Nav";
import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Enter from "./pages/Enter";
import Forgot from "./pages/Forgot";
import Sale from "./pages/Sale";
import Order from "./pages/Orders";
import Account from "./pages/Account";
import axios from "axios";


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.getUser()
  }

    updateUser (userObject) {
      this.setState(userObject)
    }

    getUser() {
      axios.get('/user/').then(response => {
        console.log('Get user response: ')
        console.log(response.data)
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')
  
          this.setState({
            loggedIn: true,
            userName: response.data.user.userName
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null
          })
        }
      })
    }
  render(){
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/account" component={Account} />
          <Route path="/login" render={() => <Enter updateUser={this.updateUser} />} />
                                              
     
          <Route exect path="/forgot" component={Forgot} />
          <Route exact path = "/sale" component = {Sale} />
          <Route exact path = "/orders" component = {Order} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  
  )};

}

export default App;
