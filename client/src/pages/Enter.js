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
<<<<<<< HEAD
            redirectTo: null
=======
            maskPassword: ""
>>>>>>> 85903d10aa1d9441706cc70018b2eecf11329746
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

<<<<<<< HEAD
=======
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
                }
            }
            console.log("this is credentials array")
            console.log("woof e-mail: " + this.state.credentials[10]);
            console.log("woof password: " + this.state.credentials[11]);
            console.log("b4 toggle");
            if (!this.state.redirect) {
                this.toggleNested();
            }
            //this.toggleTrue();
            console.log("after toggle");
            /*
            for (var c = 0; c < this.state.credentials.length; c++) {
                if (this.state.email == this.state.credentials[c].cred[0] && 
            }*/
            /*
                        Axios.get('/api/allusers')
                        .then(function(response)    {
                            console.log(response);
                            for (var c = 0; c < response.data.length; c++)  {
                                if (response.data[c].email == user.email && response.data[c].password == user.password) {
                                    console.log("user is in user table!");
                                    console.log("e-mail: " + response.data[c].email);
                                    console.log("password: " + response.data[c].password);
                                    user.match = true;
                                    console.log("user match is " + user.match);
                                }
                            }
>>>>>>> 85903d10aa1d9441706cc70018b2eecf11329746
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

    handleMaskedPassword = event => {
        const generateMask = () => {
            if (this.state.password) {
                const lengthOfMask = this.state.password.length;
                let mask = "";
                for (let i = 0; i < lengthOfMask; i++) {
                    mask += "*";
                }

                return mask;
            }

            return "";

        }

        const passwordTracker = () => {
            let letter = this.state.password.split("");
            letter = letter[letter.length - 1];
            console.log("password tracker, letter: ", letter);
            let hidden = this.state.hiddenPassword.slice();

            hidden.push(letter);
            return hidden;
        }

        const { name, value } = event.target;

        console.log("inside handle password, name: ", name);
        console.log("inside handle password, value: ", value);

        this.setState({
            [name]: value,
            maskPassword: generateMask(),
            hiddenPassword: passwordTracker()
        })


    }

    componentDidUpdate() {
        console.log("updated: ", this.state);
    }

    render() {
<<<<<<< HEAD
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

=======
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
                        <AvField name="password" type = "password" label="Password" value={this.state.handleInputChange} onChange={this.handleInputChange} validate={{
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
>>>>>>> 85903d10aa1d9441706cc70018b2eecf11329746
                </div>
            )
        }
    }
}

export default Enter;