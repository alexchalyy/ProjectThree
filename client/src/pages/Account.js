import axios from "axios";
import EditNav from "../components/EditNav";
import { isAbsolute } from "path";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import "../Account.css"
import moment from 'moment';
//update user data

class Account extends Component {

    state = {
        address: "",
        city: "",
        state: "",
        zip: "",
        creditCardNumber: "",
        expDate: "",
        cvv: ""
        // redirect: false
    };

    // setRedirect = () => {
    //     this.setState({
    //         redirect: true
    //     }, () =>  this.renderRedirect())

    // }
    handleInputChange = event => {

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log("value is " + value);
    }

    // renderRedirect = () => {
    //     console.log("redirect works!");


    //         return <Redirect to='/sale' />

    // }
    //add functionality where it send the data to the Database
    handleFormSubmit = event => {

        const user = {

            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            creditCardNumber: this.state.creditCardNumber,
            expDate: this.state.expDate,
            cvv: this.state.cvv
        }
        console.log(user);
        console.log(user.userName);

        if (
            user.address && user.city && user.state && this.ValidateZip() && this.ValidateCCNumber() &&
            this.ValidateDate() && (/^[0-9]+$/.test(user.cvv) && user.cvv.length == 3) &&
            this.state.password == this.state.confirm_password && /^[a-zA-Z]+$/.test(user.firstName) &&
            /^[a-zA-Z]+$/.test(user.lastName)) {
            axios.put('api/users', user)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.props.history.push('/sale');
        } else {
            if (user.userName && user.firstName && user.lastName && this.ValidateEmail() && this.ValidatePassword() &&
                user.address && user.city && user.state && this.ValidateZip() && this.ValidateCCNumber() &&
                this.ValidateDate()) {

                console.log("address is valid");
                console.log("city is valid");
                console.log("state is valid");
                console.log("valid zip: " + this.ValidateZip());
                console.log("zip is valid");
                console.log("credit card valid: " + this.ValidateCCNumber());
                console.log("Expiration date is valid: " + this.ValidateDate());
                console.log("Is cvv an integer? " + /^[0-9]+$/.test(user.cvv));
                //console.log("credit card number is valid");
                console.log("wrong registration input");
            }
        }
        // this.props.history.push('/sale');
    }

    componentDidMount() {
        console.log("did mount");
    }

    ValidateDate() {

        // Return today's date and time
        var currentTime = new Date();
        // returns the month (from 0 to 11)
        var month = currentTime.getMonth() + 1;
        // returns the year (four digits)
        var year = currentTime.getFullYear();
        var expired = false;

        if (this.state.expDate.length > 4) {
            var enteredyear = this.state.expDate[3] + this.state.expDate[4];
            var intyear = parseInt(enteredyear, 10) + 2000;
            var enteredmonth = this.state.expDate[0] + this.state.expDate[1];
            var intmonth = parseInt(enteredmonth, 10);
            if ((year > intyear) || (year == intyear && month > intmonth)) {
                expired = true;
            }
        } else {
            expired = true;
        }
        return (moment(this.state.expDate, 'MM/YY', true).isValid() && !expired);
    }

    ValidateCCNumber() {
        /*console.log("Is credit card number integer? " + Number.isInteger(this.state.creditCardNumber));
        console.log("Is credit card number 16 digits? " + this.state.creditCardNumber > 999999999999999);
        return (Number.isInteger(this.state.creditCardNumber) && this.state.creditCardNumber > 999999999999999);*/
        var number = /^[0-9]+$/;
        return (number.test(this.state.creditCardNumber) && this.state.creditCardNumber.length == 16);
    }

    ValidateZip() {
        //console.log(Number.isInteger(this.state.zip));
        //console.log(this.state.zip);
        //return (Number.isInteger(this.state.zip) && this.state.zip > 9999);
        var number = /^[0-9]+$/;
        return (number.test(this.state.zip) && this.state.zip > 9999);
    }

    ValidatePassword() {
        var letter = /^[a-zA-Z0-9]+$/;
        var valid = letter.test(this.state.password); //match a letter _and_ a number
        return valid;
    }

    ValidateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(this.state.email).toLowerCase());
    }

    render() {
        return (
            <div id="account-body">
                <EditNav />
                <div className="account-container">
                    <p id="account-title">Edit Account Info</p>
                    <AvForm>
                        <div className="account-box1">
                            <AvField
                                name="userName"
                                placeholder="username"
                                value={this.state.userName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter user name' }
                                }}
                            />
                            <AvField
                                name="firstName"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter first name' },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' }
                                }}
                            />
                            <AvField
                                name="lastName"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter last name' },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' }
                                }}
                            />
                            <AvField
                                name="email"
                                placeholder="e-mail"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                validate={{
                                    email: { value: true, errorMessage: 'Please enter valid e-mail' },
                                    required: { value: true, errorMessage: 'Please enter e-mail' }
                                }}
                            />
                            <AvField
                                name="password"
                                placeholder="password"
                                type = "password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter password' },
                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                    minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                                }}
                            />
                            <AvField
                                name="confirm_password"
                                type = "password"
                                placeholder="confirm_password"
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter password' },
                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                    minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    match: { value: 'password', errorMessage: 'Passwords must match' }
                                }}

                            />
                        </div>
                        <div className="account-box2">
                            <AvField
                                name="address"
                                placeholder="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter address' }
                                }}
                            />
                            <AvField
                                name="city"
                                placeholder="city"
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter city' }
                                }}
                            />
                            {/* <AvField
                            name="state"
                            placeholder="State"
                            value={this.state.state}
                            onChange={this.handleInputChange}
                        /> */}
                            <AvField
                                type="select"
                                name="state"
                                value={this.state.state}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter state' }
                                }}
                            >
                                <option value="">State</option>
                                <option value="Alaska">AK</option>
                                <option value="Alabama">AL</option>
                                <option value="Arkansas">AR</option>
                                <option value="Arizona">AZ</option>
                                <option value="California">CA</option>
                                <option value="Colorado">CO</option>
                                <option value="Connecticut">CT</option>
                                <option value="Delaware">DE</option>
                                <option value="Florida">FL</option>
                                <option value="Georgia">GA</option>
                                <option value="Hawaii">HI</option>
                                <option value="Iowa">IA</option>
                                <option value="Idaho">ID</option>
                                <option value="Illinios">IL</option>
                                <option value="Indiana">IN</option>
                                <option value="Kansas">KS</option>
                                <option value="Kentucky">KY</option>
                                <option value="Lousiana">LA</option>
                                <option value="Massachusetts">MA</option>
                                <option value="Maryland">MD</option>
                                <option value="Maine">ME</option>
                                <option value="Michigan">MI</option>
                                <option value="Minnesota">MN</option>
                                <option value="Missouri">MO</option>
                                <option value="Mississippi">MS</option>
                                <option value="Montana">MT</option>
                                <option value="North Carolina">NC</option>
                                <option value="North Dakota">ND</option>
                                <option value="Nebraska">NE</option>
                                <option value="New Hampshire">NH</option>
                                <option value="New Jersey">NJ</option>
                                <option value="New Mexico">NM</option>
                                <option value="Nevada">NV</option>
                                <option value="New York">NY</option>
                                <option value="Ohio">OH</option>
                                <option value="Oklahoma">OK</option>
                                <option value="Oregon">OR</option>
                                <option value="Pennsylvania">PA</option>
                                <option value="Rhode Island">RI</option>
                                <option value="South Carolina">SC</option>
                                <option value="South Dakota">SD</option>
                                <option value="Tennessee">TN</option>
                                <option value="Texas">TX</option>
                                <option value="Utah">UT</option>
                                <option value="Virginia">VA</option>
                                <option value="Vermont">VT</option>
                                <option value="Washington">WA</option>
                                <option value="Wisconsin">WI</option>
                                <option value="West Virginia">WV</option>
                                <option value="Wyoming">WY</option>
                            </AvField>
                            <AvField
                                name="zip"
                                placeholder="Zip code"
                                value={this.state.zip}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter zip code' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 5, errorMessage: 'Please enter 5 digit zip code' },
                                    maxLength: { value: 5, errorMessage: 'Please enter 5 digit zip code' }
                                }}
                            />
                            <AvField
                                name="creditCardNumber"
                                placeholder="Credit Card Number"
                                value={this.state.creditCardNumber}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter credit card number' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 16, errorMessage: 'Please enter 16 digit credit card number' },
                                    maxLength: { value: 16, errorMessage: 'Please enter 16 digit credit card number' }
                                }}
                            />
                            <AvField
                                name="expDate"
                                placeholder="Expiration Date"
                                value={this.state.expDate}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter date' },
                                    date: { format: 'MM/YY', errorMessage: 'Please enter date in MM/YY format' }
                                }}
                            />
                            <AvField
                                name="cvv"
                                placeholder="cvv"
                                value={this.state.cvv}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter cvv' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 3, errorMessage: 'Please enter 3 digit cvv' },
                                    maxLength: { value: 3, errorMessage: 'Please enter 3 digit cvv' }
                                }}
                            />
                        </div>
                        <Button className="submit-btn" color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
            </div>



        );
    }
}

export default Account;