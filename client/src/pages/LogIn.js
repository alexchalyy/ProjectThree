import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";
import Nav from "../components/Nav";
import Slide from "../components/Slider";
import "../App.css"

console.log("before Log In function is called.");
function LogIn() {
    return (
        <div className="App login"> 
            
            <Nav />
            <Slide />
              
        </div>
    );
}
console.log("after Log In function is called.");

export default LogIn;