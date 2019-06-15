import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
import Nav from "../components/Nav";

function Forgot() {
    return (
        <div className="App">
            <Nav />
            <p>Forgot login page</p>
            <p><a href = '/sale'>Submit</a></p>
        </div>
    );
}
console.log("after Log In function is called.");

export default Forgot;