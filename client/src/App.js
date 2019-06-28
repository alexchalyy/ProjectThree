import Nav from "./components/Nav";
import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Enter from "./pages/Enter";
import Forgot from "./pages/Forgot";
import Sale from "./pages/Sale";
import Order from "./pages/Orders";
import Account from "./pages/Account";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hiddenPassword: [],
      redirect: false,
      credentials: [],
      modal: false,
      nestedModal: false,
      closeAll: false,
      maskPassword: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    console.log("redirect works!");
    if (this.state.redirect) {
      return <Redirect to='/sale' />
    }
  }

  handleFormSubmit = event => {

    //var users = []; // array of users (including username and password), is populated every time user clicks log in button for input validation

    const user = {

      email: this.state.email,
      password: this.state.password,
      match: false

    }

    console.log("credentials on hitting submit button");
    console.log(this.state.credentials);
    console.log("the first e-mail of credentials");
    console.log(this.state.credentials[0]);
    console.log("submit!");
    console.log("email: " + this.state.email);
    console.log("password: " + this.state.password);
    if (!this.ValidateEmail() || !this.state.password) {
      console.log("incorrect login");
    } else {
      for (var c = 0; c < this.state.credentials.length; c = c + 2) {
        console.log("e-mail #" + c + ": " + this.state.credentials[c]);
        console.log("password #" + c + ": " + this.state.credentials[c + 1]);
        if (this.state.email == this.state.credentials[c] && this.state.password == this.state.credentials[c + 1]) {
          console.log("entered e-mail: " + this.state.email);
          console.log("entered password: " + this.state.password);
          console.log("should redirect to next page!");
          this.setRedirect();
          this.renderRedirect();
          console.log("after redirect to next page function call.");
        }
      }
      console.log("this is credentials array")
      console.log("woof e-mail: " + this.state.credentials[10]);
      console.log("woof password: " + this.state.credentials[11]);
      console.log("b4 toggle");
      if (!this.state.redirect) {
        this.toggleNested();
      }
      console.log("after toggle");
    }
  }

  ValidateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(this.state.email).toLowerCase());
  }

  setCredentials = (cred) => {
    this.setState({
      credentials: cred
    })
  }

  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("value is " + value);

    var credentials = [];
    Axios.get('/api/allusers')
      .then(function (response) {
        console.log("inside axios");
        console.log(response);
        for (var c = 0; c < response.data.length; c++) {
          credentials.push(response.data[c].email);
          credentials.push(response.data[c].password);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setCredentials(credentials);
    console.log("Credentials: ");
    //console.log(this.state.credentials);
  }

  componentDidUpdate() {
    console.log("updated: ", this.state);
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/login"
            render={(props)=> <Enter {...props}
            redirect={this.redirect}
            toggle={this.toggle}
            toggleAll={this.toggleAll}
            toggleNested={this.toggleNested}
            email={this.state.email}
            password={this.state.password}
            hiddenPassword={this.state.hiddenPassword}
            redirect={this.state.redirect}
            credentials={this.state.credentials}
            modal={this.state.modal}
            nestedModal={this.state.nestedModal}
            closeAll={this.state.closeAll}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            setCredentials={this.setCredentials}
            componentDidUpdate={this.componentDidUpdate}
        />}    />
            {/*                    
              component={Enter}
              component={() => <Enter redirect={this.redirect} />}
              component={() => <Enter toggle={this.toggle} />}
              component={() => <Enter toggleAll={this.toggleAll} />}
              component={() => <Enter toggleNested={this.toggleNested} />}
              component={() => <Enter email={this.state.email} />}
              component={() => <Enter password={this.state.password} />}
              component={() => <Enter hiddenPassword={this.state.hiddenPassword} />}
              component={() => <Enter redirect={this.state.redirect} />}
              component={() => <Enter credentials={this.state.credentials} />}
              component={() => <Enter modal={this.state.modal} />}
              component={() => <Enter nestedModal={this.state.nestedModal} />}
              component={() => <Enter closeAll={this.state.closeAll} />}
              component={() => <Enter handleFormSubmit={this.handleFormSubmit} />}
              component={() => <Enter handleInputChange={this.handleInputChange} />}
              component={() => <Enter setCredentials={this.setCredentials} />}
              component={() => <Enter componentDidUpdate={this.componentDidUpdate} />}
            />*/}
            <Route exect path="/forgot" component={Forgot} />
            <Route exact path="/sale" component={Sale} />
            <Route exact path="/orders" component={Order} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
