import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

class OrderNav extends Component {

  state = {
    hi: "",
    email: ""
    //navbarImg = <img className="d-none d-lg-inline sale-nav-img" src="/images/hand.jpg" alt="sword" />;
  };

  Logout() {
    // Log out function.
    var id;

    console.log("this is order nav");
    console.log("log out function called.");
    axios.get('api/allusers')
      .then(function (res) {
        //const firstName = firstName.res.data;
        //this.setState({ firstName });
        var id;
        console.log("this is order navigation bar.");
        for (var c = 0; c < res.data.length; c++) {
          if (res.data[c].isLoggedIn == 1) {
            id = res.data[c].id;
            console.log("logged in id is " + id);
            var url = "/api/logout/" + id;
            axios.put(url)
              .then(function (res) {
                console.log("user is logged out.")
              }).catch(function (error) {
                console.log("user is not logged out");
              });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log("logging out");
    //axios.put('/api/logout/', 
  }

  render() {
    return (
      <header>
        {/* <nav className="navbar navbar-light bg-light">
       <Link to="/login">Log In</Link> &nbsp; | &nbsp;
            <Link to="/register">Register</Link>
   
    </nav> */}

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">GoT Swag</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/sale">Buy Items<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/account">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick = {this.Logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default OrderNav;
