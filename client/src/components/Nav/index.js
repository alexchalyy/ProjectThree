import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <header>
   {/* <nav className="navbar navbar-light bg-light">
       <Link to="/login">Log In</Link> &nbsp; | &nbsp;
            <Link to="/register">Register</Link>
   
    </nav> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">GoT Swag</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/login">Sign In<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Sign Up</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome User
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/orders">Orders</a>
                <a className="dropdown-item" href="/forgot">Edit Account</a>
              </div>
            </li>
          </ul>
          </div>
      </nav>
    </header>
  );
}

export default Nav;
