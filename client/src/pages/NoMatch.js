
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { isAbsolute } from "path";


console.log("before Log In function is called.");
function NoMatch() {
    return (
        <div className="NotFound">
         
            <p>Not Found</p>
        </div>
    );
}
console.log("after Log In function is called.");

export default NoMatch;