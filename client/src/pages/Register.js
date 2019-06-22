
import Nav from "../components/Nav";
import { isAbsolute } from "path";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import "../Register.css"
// import Users from "./routes/users";
class Register extends Component {

    state = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        creditCardNumber: "",
        expDate: "",
        cvv: "",
        redirect: false
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log("value is " + value);
    }




    renderRedirect = () => {
        console.log("redirect works!");
        if (this.state.redirect) {
            return <Redirect to='/sale' />
        }
    }

    handleFormSubmit = event => {
        console.log("submit!");
        console.log("uername: " + this.state.userName);
        console.log("firstname: " + this.state.firstName);
        console.log("lastname: " + this.state.lastName);
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
        if (!this.state.email) {
            console.log("e-mail empty");
        } else {
            this.setRedirect();
            this.renderRedirect();
        }
    }
    render() {
        return (
            <div>
                <Nav />
                <p>Registration page</p>
                
                <AvForm>
                <div className="reg-box1">
                    <Input
                        name="username"
                        placeholder="username "
                        value={this.state.userName}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="First Name"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="Last Name"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="email"
                        placeholder="e-mail"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="confirm password"
                        placeholder="confirm password"

                    />
                </div>
                <div className="reg-box2">
                    <Input
                        name="address"
                        placeholder="street address"
                        value={this.state.address}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="city"
                        placeholder="city"
                        value={this.state.city}
                        onChange={this.handleInputChange}
                    />
                    {/* <Input
                        name="State"
                        placeholder="State"
                        value={this.state.state}
                        onChange={this.handleInputChange}
                    /> */}
                     <AvField type="select" name="state" onChange={this.handleInputChange} value={this.state.state}>
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
                    <Input
                        name="Zip code"
                        placeholder="Zip code"
                        value={this.state.zip}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="Credit card number"
                        placeholder="Credit Card Number"
                        value={this.state.creditCardNumber}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="Expiration Date"
                        placeholder="Expiration Date"
                        value={this.state.expDate}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="cvv"
                        placeholder="cvv"
                        value={this.state.cvv}
                        onChange={this.handleInputChange}
                    />
                </div>
                
                    <Button className="submit-btn" color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
                </AvForm>
                {/* <Link to='/sale'>Sale Page</Link> */}
            </div>
        );
    }
}

export default Register;