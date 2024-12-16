import React from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import faceBook from "../assets/faceBook.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">
        <div className="f-section">
          <Navbar />
          <div className="banner">Always Stay Connected</div>
          <p>
            FundIt empowers generosity by connecting donors with causes that
            matter.
          </p>
          <div className="home-btns">
            <a href="#learn" className="btn-lern-more">
              Learn more
            </a>
            <div className="m-btns">
              <Link to="/donate" className="link-btn" >
              Donate
              </Link>
              <Link to="/collect" className="link-btn" >
              Collect
              </Link>
            </div>
          </div>
        </div>
        <div id="learn" className="s-section">
          <div className="m-para">
            <h1>
              <span>FundIT</span> is a startup looking to change the way people
              connect.
            </h1>
            <p>
              FundIT is a startup redefining how individuals and organizations
              come together to make a difference. By simplifying the process of
              fundraising and donations, we empower communities to create
              lasting change
            </p>
          </div>
        </div>
        <div className="t-section">
          <div>
            <h1>
              <span>Connect</span> with Communities
            </h1>
            <p>
              Connect with friends effortlessly, share your cause, and inspire
              collective action in just a few clicks
            </p>
          </div>
        </div>
        <div className="footer" id="contact">
          <div className="logo">
            <img src={logo} className="logo-img" />
            <h1 className="logo-txt">Fund'</h1>
            <h1 className="logo-txt">IT</h1>
          </div>
          <div className="details">
            <div>
              <h1>Contact</h1>
              <p>Email</p>
              <p>Phone</p>
              <p>675101</p>
            </div>
            <div className="socials">
              <img src={linkedin} className="socia-icons" />
              <img src={instagram} className="socia-icons" />
              <img src={faceBook} className="socia-icons" />
              <img src={instagram} className="socia-icons" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
