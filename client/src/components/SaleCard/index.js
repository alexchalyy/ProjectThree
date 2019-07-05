import axios from "axios";
import Sale from '../../pages/Sale'
import React, { Component } from "react";
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import SaleNav from '../SaleNav'
import { Redirect, withRouter } from 'react-router-dom';
import hand from './hand.PNG';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import "./style.css";
import item from '../../items.json';
// update a quantity of purchased item
//= (props) =>
class SaleCard extends Component {

  constructor() {
    super()
    this.state = {
      userName: "",
      firstName: "",
      swag1name: "Swag 1",
      swag1quantity: 0,
      swag2name: "Swag 2",
      swag2quantity: 0,
      swag3name: "Swag 3",
      swag3quantity: 0,
      swag4name: "Swag 4",
      swag4quantity: 0,
      swag5name: "Swag 5",
      swag5quantity: 0,
      swag6name: "Swag 6",
      swag6quantity: 0,
      swag7name: "Swag 7",
      swag7quantity: 0,
      swag8name: "Swag 8",
      swag8quantity: 0,
      swag9name: "Swag 9",
      swag9quantity: 0,
      swag10name: "Swag 10",
      swag10quantity: 0,
      email: "",
      loggedInUserName: "",
      loggedInUserEmail: "",
      loggedInUserId: "",
      ccnumber: "",
      cvv: "",
      expdate: "",
      modal: false,
      nestedModal: false,
      closeAll: false
      // redirect: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  };
  //   handleInputChange = event => {

  //     const { name, value } = event.target;
  //     this.setState({
  //         [name]: value
  //     });
  //     console.log("value is " + value);
  // }

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
    setTimeout(() => {this.props.history.push('/account')}, 3000)
    
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  handleFormSubmit = event => {

    const user = {

      //swag1name: this.state.swag1name,
      swag1quantity: this.state.swag1quantity,
      //swag2name: this.state.swag2name,
      swag2quantity: this.state.swag2quantity,
      //swag3name: this.state.swag3name,
      swag3quantity: this.state.swag3quantity,
      //swag4name: this.state.swag4name,
      swag4quantity: this.state.swag4quantity,
      //swag5name: this.state.swag5name,
      swag5quantity: this.state.swag5quantity,
      //swag6name: this.state.swag6name,
      swag6quantity: this.state.swag6quantity,
      //swag7name: this.state.swag7name,
      swag7quantity: this.state.swag7quantity,
      //swag8name: this.state.swag8name,
      swag8quantity: this.state.swag8quantity,
      //swag9name: this.state.swag9name,
      swag9quantity: this.state.swag9quantity,
      //swag10name: this.state.swag10name,
      swag10quantity: this.state.swag10quantity //,
      //user
    }
    console.log(user);

    axios.put("/api/buy", user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    /*
    axios.put('/api/users', user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/

    // this.props.history.push('/orders');



  }


  // render() {
  //   const imageStyle = {
  //     margin: "0 auto"
  //   }

  //   return (


  // <div className="sale-body">
  //   <div className='card-container'>
  //   <div className="row no-gutters">
  //     <div className="card mb-3">
  //         {/* <div className="row no-gutters"> */}
  //           {/* <div className="col-md-4 row align-itmes-center justify-content-center"> */}
  //             <img src={this.props.image} className=' col-md-4 align-itmes-center justify-content-center mt-5 card-image' />
  //           {/* </div> */}
  //           <div className="col-md-8">
  //             <div className="card-body">
  //               <h5 className="card-title">{this.props.name}</h5>
  //               <p className="card-desc">{this.props.description}</p>
  //               <p className="card-price">{this.props.price}</p>
  //               <div className="card-btn">
  //                 <button className='btn btn-outline-dark'>Buy this item</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div> 
  //  bootstrap card

  // )

  // }

  componentDidMount() {
    var loggedInUserName = localStorage.getItem('loggedInUserName');
    var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    var loggedInUserId = localStorage.getItem('loggedInUserId');

    this.setState({ loggedInUserName });
    this.setState({ loggedInUserEmail });
    this.setState({ loggedInUserId });
    console.log("inside sales card index.js");


    const that = this;
    console.log("this is sale card");
    console.log("logged e-mail passed thru local storage is " + loggedInUserEmail);
    axios.get('/api/allusers')
      .then(function (res) {
        console.log("inside sale card axios get all cards call");
        for (var c = 0; c < res.data.length; c++) {
          console.log("inside loop");
          //if (res.data[c].isLoggedIn == 1) {
          if (res.data[c].email == loggedInUserEmail) {
            that.state.email = res.data[c].email;
            console.log("db credit card number: " + res.data[c].creditCardNumber);
            console.log("db cc exp date: " + res.data[c].expDate);

            var ccnum = String(res.data[c].creditCardNumber);
            var expd = String(res.data[c].expDate);
            console.log("ccnum: " + ccnum);
            console.log("expd: " + expd);

            that.setState({
              ccnumber: ccnum
            });

            that.setState({
              cvv: res.data[c].cvv
            });

            that.setState({
              expdate: expd
            });

            // console.log("that.state.email is " + that.state.email);
            // console.log("res.data[" + c + "].email is " + res.data[c].email);
            that.setState({

              email: that.state.loggedInUserEmail

              // email: res.data[c].email
            });
            that.setState({
              swag1quantity: res.data[c].swag1quantity
            });
            that.setState({
              swag2quantity: res.data[c].swag2quantity
            });
            that.setState({
              swag3quantity: res.data[c].swag3quantity
            });
            that.setState({
              swag4quantity: res.data[c].swag4quantity
            });
            that.setState({
              swag5quantity: res.data[c].swag5quantity
            });
            that.setState({
              swag6quantity: res.data[c].swag6quantity
            });
            that.setState({
              swag7quantity: res.data[c].swag7quantity
            });
            that.setState({
              swag8quantity: res.data[c].swag8quantity
            });
            that.setState({
              swag9quantity: res.data[c].swag9quantity
            });
            that.setState({
              swag10quantity: res.data[c].swag10quantity
            });
            console.log("this.state.swag1quantity: " + that.state.swag1quantity);
            console.log("this.state.swag2quantity: " + that.state.swag2quantity);
            console.log("this.state.swag3quantity: " + that.state.swag3quantity);
            console.log("this.state.swag4quantity: " + that.state.swag4quantity);
            console.log("this.state.swag5quantity: " + that.state.swag5quantity);
            console.log("this.state.swag6quantity: " + that.state.swag6quantity);
            console.log("this.state.swag7quantity: " + that.state.swag7quantity);
            console.log("this.state.swag8quantity: " + that.state.swag8quantity);
            console.log("this.state.swag9quantity: " + that.state.swag9quantity);
            console.log("this.state.swag10quantity: " + that.state.swag10quantity);
            console.log("this.state.creditCardNumber: " + that.state.ccnumber);
            console.log("this.state.cvv: " + that.state.cvv);
            console.log("this.state.expdate: " + that.state.expdate);
            /*       
            that.state.swag1quantity = res.data[c].swag1quantity;
            console.log("that.state.swage1quantity: " + that.state.swag1quantity);
            that.state.swag2quantity = res.data[c].swag2quantity;
            console.log("that.state.swage2quantity: " + that.state.swag2quantity);
            that.state.swag3quantity = res.data[c].swag3quantity;
            console.log("that.state.swage3quantity: " + that.state.swag3quantity);
            that.state.swag4quantity = res.data[c].swag4quantity;
            console.log("that.state.swage4quantity: " + that.state.swag4quantity);
            that.state.swag5quantity = res.data[c].swag5quantity;
            console.log("that.state.swage5quantity: " + that.state.swag5quantity);
            that.state.swag6quantity = res.data[c].swag6quantity;
            console.log("that.state.swage6quantity: " + that.state.swag6quantity);
            that.state.swag7quantity = res.data[c].swag7quantity;
            console.log("that.state.swage7quantity: " + that.state.swag7quantity);
            that.state.swag8quantity = res.data[c].swag8quantity;
            console.log("that.state.swage8quantity: " + that.state.swag8quantity);
            that.state.swag9quantity = res.data[c].swag5quantity;
            console.log("that.state.swage9quantity: " + that.state.swag9quantity);
            that.state.swag10quantity = res.data[c].swag5quantity;
            console.log("that.state.swage10quantity: " + that.state.swag10quantity);
            */
          }
        }
      }).catch(function (error) {
        console.log(error);
      });

  }

  buyItem() {
    const that = this;
    console.log("buy item called!");
    console.log("item index is " + this.props.index);
    console.log("item name is " + this.props.name);
    if (this.props.index == 0) {
      that.state.swag1quantity++;
      console.log("swag 1 quantity: " + that.state.swag1quantity);
    } else if (this.props.index == 1) {
      that.state.swag2quantity++;
      console.log("swag 2 quantity: " + that.state.swag2quantity);
    } else if (this.props.index == 2) {
      that.state.swag3quantity++;
      console.log("swag 3 quantity: " + that.state.swag3quantity);
    } else if (this.props.index == 3) {
      that.state.swag4quantity++;
      console.log("swag 4 quantity: " + that.state.swag4quantity);
    } else if (this.props.index == 4) {
      that.state.swag5quantity++;
      console.log("swag 5 quantity: " + that.state.swag5quantity);
    } else if (this.props.index == 5) {
      that.state.swag6quantity++;
      console.log("swag 6 quantity: " + that.state.swag6quantity);
    } else if (this.props.index == 6) {
      that.state.swag7quantity++;
      console.log("swag 7 quantity: " + that.state.swag7quantity);
    } else if (this.props.index == 7) {
      that.state.swag8quantity++;
      console.log("swag 8 quantity: " + that.state.swag8quantity);
    } else if (this.props.index == 8) {
      that.state.swag9quantity++;
      console.log("swag 9 quantity: " + that.state.swag9quantity);
    } else {
      that.state.swag10quantity++;
      console.log("swag 10 quantity: " + that.state.swag10quantity);
    }
    const user = {

      //swag1name: this.state.swag1name,
      swag1quantity: that.state.swag1quantity,
      //swag2name: this.state.swag2name,
      swag2quantity: that.state.swag2quantity,
      //swag3name: this.state.swag3name,
      swag3quantity: that.state.swag3quantity,
      //swag4name: this.state.swag4name,
      swag4quantity: that.state.swag4quantity,
      //swag5name: this.state.swag5name,
      swag5quantity: that.state.swag5quantity,
      //swag6name: this.state.swag6name,
      swag6quantity: that.state.swag6quantity,
      //swag7name: this.state.swag7name,
      swag7quantity: that.state.swag7quantity,
      //swag8name: this.state.swag8name,
      swag8quantity: that.state.swag8quantity,
      //swag9name: this.state.swag9name,
      swag9quantity: that.state.swag9quantity,
      //swag10name: this.state.swag10name,
      swag10quantity: that.state.swag10quantity,

      email: that.state.loggedInUserEmail
      // email: that.state.email
      //user
    }
    console.log(user);
    var _this = this;

    console.log("right b4 purchase");
    console.log("this.state.creditCardNumber: " + that.state.ccnumber);
    console.log("this.state.cvv: " + that.state.cvv);
    console.log("this.state.expdate: " + that.state.expdate);

    if (that.state.expdate && that.state.cvv && that.state.ccnumber) {
      axios.put("/api/buy", user)
        .then(function (response) {
          console.log(response);
          window.location.reload();
          /*
          alert("Item was added to cart");
          // this.props.history.push('/sale');
         */
        
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //alert("please enter credit card information on edit account page.");
      this.toggleNested();
    
      console.log("credit card information is missing.");
    }
  }

  render() {
    const imageStyle = {
      margin: "0 auto",
      padding: "1rem"
    }
    return (
      <div>
        <div className='container-fluid'>
          <div className="card mb-3">
            <div className="row no-gutters">
              {/* <div className="col-md-4 row align-itmes-center justify-content-center"> */}
              <img src={this.props.image} className='col-md-4 row align-itmes-center justify-content-center' style={imageStyle} />
              {/* </div> */}
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.props.name}</h5>
                  <p className="card-text card-desc">{this.props.description}</p>
                  <p className="card-price">{this.props.price}</p>
                  <div className="card-btn">
                    <button className='btn btn-outline-dark' onClick={this.buyItem} itemid={this.props.index}>Buy this item</button>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-2 row align-items-center justify-content-center">
            <p>{this.props.price}</p>
            <button className='btn btn-outline-dark'>Buy this item</button>
          </div> */}
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
            <ModalHeader>Please enter credit card information!</ModalHeader>
            <ModalFooter>
              <Button className="enter-btn" onClick={this.toggleAll}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

    );
  }
};
// Render page



export default withRouter(SaleCard);

