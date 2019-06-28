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
        //console.log(this.state.credentials);
    }

    componentDidUpdate() {
        console.log("updated: ", this.state);
    }

    render() {
        return (
            <div className="App">
                <EnterNav />
                {this.props.redirect}
                <div className='container'>
                    <AvForm>
                        <AvField name="email" label="Email" type="email" onChange={this.handleInputChange} validate={{
                            email: { value: true, errorMessage: 'Please enter valid e-mail' },
                            required: { value: true, errorMessage: 'Please enter e-mail' }
                        }} />
                        <AvField name="password" type="password" label="Password" value={this.handleInputChange} onChange={this.handleInputChange} validate={{
                            required: { value: true, errorMessage: 'Please enter password' },
                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your password must be composed only with letter and numbers' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 16 characters' },
                            maxLength: { value: 16, errorMessage: 'Your password must be between 6 and 16 characters' }
                        }} />
                        <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
                <div>
                    <Modal isOpen={this.props.nestedModal} toggle={this.toggleNested} onClosed={this.props.closeAll ? this.toggle : undefined}>
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