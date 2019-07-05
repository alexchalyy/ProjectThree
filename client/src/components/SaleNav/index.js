import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

class SaleNav extends Component {
  constructor() {
    super()
    this.state = {
      hi: "",
      userName: "Please log in",
      user: "",
      loggedInUserName:"",
      loggedInUserEmail:"",
      loggedInUserId:""
    }

  }


componentDidMount() {
  var loggedInUserName = localStorage.getItem('loggedInUserName');
  var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  var loggedInUserId = localStorage.getItem('loggedInUserId');
  
  this.setState({ loggedInUserName });
  this.setState({ loggedInUserEmail });
  this.setState({ loggedInUserId });
 
  // this.props.userData;
  // this.setState({ userName: this.props.userData.user.userName });
  // console.log(this.props.userData);
  }

Logout()  {
   
  var email = localStorage.getItem('loggedInUserEmail');
  localStorage.clear();
  var url = "/api/logout/" + email;
  console.log("logged in e-mail is " + email);
  console.log("log out function called.");
        axios.put(url)
        .then(function(res) {
          localStorage.clear();
          window.location.reload();
         //merge
         
          console.log("clear local storage")
          console.log("user is logged out.")
        }).catch(function (error) {
          console.log("user is not logged out");
        });
      
}
 
render()  {
  return (
    <header>
    {/*}  <nav className="navbar navbar-dark bg-dark">
        <Link to="#">Hello</Link> &nbsp; | &nbsp;
      <Link to="/Account">Account</Link> &nbsp; | &nbsp;
      <Link to="/Sale">Buy Items</Link> &nbsp; | &nbsp;
      <Link to="/">Log Out</Link> &nbsp; | &nbsp;
  </nav>*/}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">GoT Swag</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="#">Welcome {this.state.loggedInUserName}<span className="sr-only">(current)</span></a>
            </li>{/*{navbarImg}*/}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/account">Account</a>
            </li>{/*{navbarImg}*/}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/orders">Orders</a>
            </li>{/*{navbarImg}*/}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/" onClick = {this.Logout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
}

export default SaleNav;
