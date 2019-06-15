/*import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p>GoT Swag?</p>
      </div>
    );
  }
}
/*<Route exact path="/login" component={Enter} />
export default App;*/
import Nav from "./components/Nav";
import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Enter from "./pages/Enter";

function App() {
  console.log("in the app.js");
  return (
    <Router>
      <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Enter} />
        <Route component={NoMatch} />
      </Switch>  
      </div>
    </Router>
  );
}

export default App;
