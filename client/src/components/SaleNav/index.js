import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function SaleNav() {
  const navbarImg = <img className="d-none d-lg-inline sale-nav-img" src="/images/hand.jpg" alt="sword" />;
  return (
    <header>
      {/* <nav className="navbar navbar-dark bg-dark py-3">
        <Link className="sale-nav-link" to="*">Hello</Link> &nbsp; {navbarImg} &nbsp;
      <Link className="sale-nav-link" to="/account">Account</Link> &nbsp;  {navbarImg} &nbsp;
      <Link className="sale-nav-link" to="/orders">Orders</Link> &nbsp;  {navbarImg} &nbsp;
      <Link className="sale-nav-link" to="/">Log Out</Link> &nbsp; &nbsp;
    </nav> */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a id="nav-brand" className="navbar-brand sale-nav-link mb-2" href="/">GoT Swag</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="*">Hello<span className="sr-only">(current)</span></a>
            </li>{navbarImg}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/account">Account</a>
            </li>{navbarImg}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/orders">Orders</a>
            </li>{navbarImg}
            <li className="nav-item">
              <a className="nav-link sale-nav-link" href="/">Log Out</a>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome User
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/orders">Orders</a>
                <a className="dropdown-item" href="/forgot">Edit Account</a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default SaleNav;
