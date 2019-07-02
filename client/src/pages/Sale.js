import axios from "axios";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
//import Enter from "Enter.js";
import SaleNav from "../components/SaleNav";
import SaleCard from "../components/SaleCard";
import item from "../items.json"

//minor change for push update
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
    cvv: 4,
    item
    }
  }

  componentDidMount() {
    console.log("did mount");
  //  this.setState({ userName: this.props.userData.userName});
    console.log( this.props.userData);
    // console.log( this.props.LoggedInUserData.user.userName);
    //console.log("imported email: " + Enter.state.email);
    axios.get('api/allusers')
      .then(function (res) {
        //const firstName = firstName.res.data;
        //this.setState({ firstName });
        console.log("this is sale page");
        for (var c = 0; c < res.data.length; c++) {
          if (res.data[c].isLoggedIn == 1)  {
            console.log(res.data[c].email + " is logged in!");
            console.log("id: " + res.data[c].id);
          }
  
       }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.state.userName);
  }

  render() {
    const background = {
      background: 'rgb(52,58,64)'
    }
    
    console.log("before Log In function is called.");
    return (
      <div className="App Sale-Page" style={background}>
        <SaleNav />
        {/* <p>Welcome {this.state.userName}</p>
        <p>Sale page</p> */}
        {this.state.item.map(item => (
          <SaleCard
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            index={item.index}
          />
        ))}

      </div>
    );
    console.log("after Log In function is called.");

  }

}

export default Sale;