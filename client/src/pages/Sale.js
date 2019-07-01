import axios from "axios";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
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
  componentWillReceiveProps() {

    console.log(this.props.userData);
  }
  //testing sale page
  componentDidMount() {
    console.log("did mount");
    //  this.setState({ userName: this.props.userData.userName});
    console.log(this.props.userData.userData);
    var id = this.props.userData.userData.user.id;
    console.log(id);
   var userName = this.props.userData.userData.user.userName;
    console.log(userName);
    var email = this.props.userData.userData.user.email;
    console.log(email);

    axios.get('api/allusers')
      .then(function (res) {

        console.log("this is sale page");
        for (var c = 0; c < res.data.length; c++) {
          if (res.data[c].isLoggedIn == 1) {
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

    if (this.props.userData.userData) {
      return <Redirect to={{ pathname: '/login' }} />
    } else {
      return (
        <div className="App" style={background}>
          <SaleNav
            userData={this.props.userData}

          />
          {/* <p>Welcome {this.state.userName}</p>
        <p>Sale page</p> */}
          {this.state.item.map(item => (
            <SaleCard
              userData={this.props.userData}
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}

            />
          ))}

        </div>
      );
      console.log("after Log In function is called.");

    }
  }

}

export default Sale;