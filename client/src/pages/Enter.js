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
            redirect: false,
            credentials: [],
            modal: false,
            nestedModal: false,
            closeAll: false,
            redirectTo: null
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
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

    }

    renderRedirect = () => {
        console.log("redirect works!");
        if (this.state.redirect) {
            return <Redirect to='/sale' />
        }
    }



    handleFormSubmit(event) {
        const user = {

            email: this.state.email,
            password: this.state.password,
            match: false
        }
        console.log('sign-up handleSubmit, username: ')
        console.log(this.state.password)
        event.preventDefault()
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());
        var letter = /^[a-zA-Z0-9]+$/;
        var ValidatePassword = letter.test(this.state.password); //match a letter _and_ a number
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());

        //request to server to add a new username/password
        if (ValidateEmail && ValidatePassword
        ) {
            Axios
                .post('/enter', {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(response => {
                    console.log('login response: ')
                    console.log(response)
                    if (response.status === 200) {
                        // update App.js state
                        alert("Logged in")
                        this.props.updateUser({
                            loggedIn: true,
                            userName: response.data.userName

                        })

                        // update the state to redirect to home
                        // this.props.history.push('/sale');
                        this.setState({
                            redirectTo: '/sale'
                        })
                    }
                }).catch(err => {
                    console.log('login error: ')
                    console.log(err);
                    alert("not logged in");

                })
        }
    }


    // ValidateEmail() {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //     return re.test(String(this.state.email).toLowerCase());
    // }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
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
                            <AvField name="password" label="Password" type="text" onChange={this.handleInputChange} validate={{
                                required: { value: true, errorMessage: 'Please enter password' },
                                pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },

                                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                            }} />
                            <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>
                        </AvForm>
                    </div>
                    <div>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>User not logged in</ModalHeader>
                            <ModalBody>Please check your email and password</ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggleAll}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                </div>
            )
        }
    }
}

export default Enter;