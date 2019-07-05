
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
// import OrderNav from "../components/OrdrNav";
import Orders from '../components/Orders';
import { Redirect,  withRouter  } from 'react-router-dom';
import "../Orders.css"


console.log("before Log In function is called.");
const styles = {
  background: "/images/gotmap.jpg"
}
class Sale extends Component {
  constructor() {
    super()
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      creditCardNumber: 3,
      expDate: 1,
      cvv: 4
    }
  }
  
render () {

  return (
    <div style={styles.background} className="App orders-body">
          <Orders/>          
    </div>
  )};
  
}
// console.log("after Log In function is called.");

export default withRouter(Orders);