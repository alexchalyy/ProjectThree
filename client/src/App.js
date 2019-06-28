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


function App() {
  console.log("in the app.js");
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Enter} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/login" component={Enter} />
          <Route exect path="/forgot" component={Forgot} />
          <Route exact path = "/sale" component = {Sale} />
          <Route exact path = "/orders" component = {Order} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
