import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
import EnterNav from "../components/EnterNav";
import { Link } from "react-router-dom";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Redirect } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Axios from 'axios';
//import UserExists from "../components/UserExists";

class Enter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            hiddenPassword: [],
            redirect: false,
            credentials: [],
            modal: false,
            nestedModal: false,
            closeAll: false,
            maskPassword: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

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
    }

    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    setCredentials = (cred) => {
        this.setState({
            credentials: cred
        })
    }

    handleInputChange = event => {

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log("value is " + value);
        var credentials = [];
        Axios.get('/api/allusers')
            .then(function (response) {
                console.log("inside axios");
                console.log(response);
                for (var c = 0; c < response.data.length; c++) {
                    credentials.push(response.data[c].email);
                    credentials.push(response.data[c].password);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setCredentials(credentials);
        console.log("Credentials: ");
        console.log(this.state.credentials);
    }

    renderRedirect = () => {
        console.log("redirect works!");
        if (this.state.redirect) {
            return <Redirect to='/sale' />
        }
    }

    handleFormSubmit = event => {

        //var users = []; // array of users (including username and password), is populated every time user clicks log in button for input validation

        const user = {

            email: this.state.email,
            password: this.state.password,
            match: false

        }

        console.log("credentials on hitting submit button");
        console.log(this.state.credentials);
        console.log("the first e-mail of credentials");
        console.log(this.state.credentials[0]);
        console.log("submit!");
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
        if (!this.ValidateEmail() || !this.state.password) {
            console.log("incorrect login");
        } else {
            for (var c = 0; c < this.state.credentials.length; c = c + 2) {
                console.log("e-mail #" + c + ": " + this.state.credentials[c]);
                console.log("password #" + c + ": " + this.state.credentials[c + 1]);
                if (this.state.email == this.state.credentials[c] && this.state.password == this.state.credentials[c + 1]) {
                    console.log("entered e-mail: " + this.state.email);
                    console.log("entered password: " + this.state.password);
                    console.log("should redirect to next page!");
                    this.setRedirect();
                    this.renderRedirect();
                    this.props.user = this.state
                }
            }
            console.log("this is credentials array")
            console.log("woof e-mail: " + this.state.credentials[10]);
            console.log("woof password: " + this.state.credentials[11]);
            console.log("b4 toggle");
            if (!this.state.redirect) {
                this.toggleNested();
            }
            console.log("after toggle");
        }
    }

    ValidateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(this.state.email).toLowerCase());
    }

    componentDidUpdate() {
        console.log("updated: ", this.state);
    }

    render() {
        return (
            <div className="App">
                <EnterNav />
                {this.renderRedirect()}
                <div className='container'>
                    <AvForm>
                        <AvField name="email" label="Email" type="email" onChange={this.handleInputChange} validate={{
                            email: { value: true, errorMessage: 'Please enter valid e-mail' },
                            required: { value: true, errorMessage: 'Please enter e-mail' }
                        }} />
                        <AvField name="password" type="password" label="Password" value={this.state.handleInputChange} onChange={this.handleInputChange} validate={{
                            required: { value: true, errorMessage: 'Please enter password' },
                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your password must be composed only with letter and numbers' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 16 characters' },
                            maxLength: { value: 16, errorMessage: 'Your password must be between 6 and 16 characters' }
                        }} />
                        <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
                <div>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>User not registered</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleAll}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Enter;