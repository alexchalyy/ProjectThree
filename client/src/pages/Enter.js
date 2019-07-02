import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
import EnterNav from "../components/EnterNav";
import { Link } from "react-router-dom";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Redirect } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Axios from 'axios';
import "../enter.css"
//import UserExists from "../components/UserExists";

class Enter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName:"",
            isLoggedIn: 0,
            redirect: false,
            modal: false,
            nestedModal: false,
            closeAll: false,
          
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
    }

    componentDidUpdate() {
       
        // console.log("updated: ", this.state);
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
        console.log("inside setRedirect");
        this.setState({
            redirect: true
        })
        console.log(this.state.redirect);
    }

    setCredentials = (cred) => {
        this.setState({
            credentials: cred
        })
    }

    updateIsLoggedIn = () => {
       
    Axios.put('/login', {
        email: this.state.email,
        isLoggedIn: 1   
    }).then((res) => {
        console.log("redirect to sale page"); 
        this.props.history.push('/sale');
      
               
    }).catch(error => {
        console.log('Login error: ')
        console.log(error)

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
        console.log("inside renderRedirect");
        console.log(this.state.redirect); 
        if (this.state.redirect) {
            return <Redirect to='/sale' />
        }
    }

    handleFormSubmit = event => {

        event.preventDefault()
       
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());
        var letter = /^[a-zA-Z0-9]+$/;
        var ValidatePassword = letter.test(this.state.password); //match a letter _and_ a number
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());
        if ( ValidateEmail && ValidatePassword) {
            console.log( ValidateEmail && ValidatePassword);
            Axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                console.log("axios post login fired"); 
            
				console.log(res)
				if (res.data.message) {
                    console.log("response message");
                    console.log(res.data.message);
                    console.log(res.data);
                    console.log('successful login')
                    this.props.getLoggedInUser({
                        
                        userData: res.data
                    })
                    this.setRedirect();
                    this.updateIsLoggedIn();
				} else {
                    console.log('Login information does not match')
                    alert("Login information does not match");
				}
			}).catch(error => {
				console.log('Login error: ');
                console.log(error);
                console.log("response.data = ");
                console.log(error.message);
                this.toggleNested();
            })
        }
    }

  

    render() {
        return (
            <div className="enter-body">
                <EnterNav />

                {/* {this.renderRedirect()} */}
                <div className='enter-container'>
                    <p className="enter-title">Sign In</p>
                    <AvForm className="enter-form">
                        <AvField 
                            name="email" 
                            // label="Email"
                            placeholder="email" 
                            type="email" 
                            onChange={this.handleInputChange} 
                            validate={{
                            email: { value: true, errorMessage: 'Please enter valid e-mail' },
                            required: { value: true, errorMessage: 'Please enter e-mail' }
                        }} />
                        <AvField 
                        name="password" 
                        type="password" 
                        // label="Password" 
                        placeholder="password"
                        value={this.state.handleInputChange} 
                        onChange={this.handleInputChange} 
                        validate={{
                            required: { value: true, errorMessage: 'Please enter password' },
                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your password must be composed only with letter and numbers' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 16 characters' },
                            maxLength: { value: 16, errorMessage: 'Your password must be between 6 and 16 characters' }
                        }} />
                        <Button className="enter-btn" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
                <div>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>User not registered</ModalHeader>
                        <ModalFooter>
                            <Button className="enter-btn" onClick={this.toggleAll}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default withRouter(Enter);
// export default Enter;