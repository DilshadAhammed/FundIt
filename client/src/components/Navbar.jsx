import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logo} className="logo-img" />
          <h1 className="logo-a">Fund'</h1>
          <h1 className="logo-b">IT</h1>
        </div>
        <div className="nav-links">
          <ul>
            <li><a href="/signin" className="sign-link">Sign In</a></li>
            <li>
              <a href="#contact" className="contact-us">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
