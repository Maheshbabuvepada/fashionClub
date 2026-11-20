import React from "react";
import logo from "../assets/logo.png";

function Contact() {
  return (
    <div className="body1">
      <div className="header">
        <img src={logo} className="logo" alt="Fashion Club Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" style={{ color: "#73090A" }} href="/">
            <b>Home</b>
          </a>
        </li>

        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"
            style={{ color: "#73090A" }}
            data-bs-toggle="dropdown"
          >
            <b>Men</b>
          </button>

          <div className="dropdown-menu p-4">
            <div className="row">
              <div className="col">
                <h6><b>TOPWEAR</b></h6>
                <a className="dropdown-item" href="/polo-tshirt">Polo T-Shirt</a>
                <a className="dropdown-item" href="/lenin-shirts">Lenin-Shirts</a>
              </div>

              <div className="col">
                <h6><b>BOTTOMWEAR</b></h6>
                <a className="dropdown-item" href="/jeans">Jeans</a>
              </div>

              <div className="col">
                <h6><b>FOOTWEAR</b></h6>
                <a className="dropdown-item" href="/footwear">Footwear</a>
                <a className="dropdown-item" href="/sneakers">Sneakers</a>
              </div>
            </div>
          </div>
        </li>

        <a href="/login" className="login-icon" title="Login">
          <i className="bi bi-person-circle"></i>
        </a>

        <li className="nav-item">
          <a className="nav-link" style={{ color: "#73090A" }} href="/about">
            <b>About</b>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" style={{ color: "#73090A" }} href="/contact">
            <b>Contact</b>
          </a>
        </li>
      </ul>

      <br />

      <h5 className="text-center">
        <b>
          <span style={{ color: "#73090A", fontFamily: "Garamond" }}>
            CONTACT
          </span>
        </b>
      </h5>

      <div className="contact-card">
        <div style={{ color: "white" }}>
          <h3>
            <i><span style={{ color: "#73090A" }}>Get In Touch :</span></i>
          </h3>

          <p>
            <span style={{ fontSize: "16px" }}>
              We would love to hear from you! Whether you have a question about....
              <br />
              sizing, shipping, or returns, our team is here to help.
            </span>
          </p>

          <h3>
            <i><span style={{ color: "#73090A" }}>Customer Support :</span></i>
          </h3>

          <div style={{ fontSize: "16px" }}>
            • <b><span style={{ color: "#73090A" }}>Email:</span></b> support@Fashion club.com
            <br /><br />

            • <b><span style={{ color: "#73090A" }}>WhatsApp / Phone:</span></b> +91 XXXXX XXXXXX
            <br /><br />

            • <b><span style={{ color: "#73090A" }}>Hours:</span></b> Monday to Saturday | 10:00 AM – 6:00 PM (IST)
            <br /><br />

            • <b><span style={{ color: "#73090A" }}>Note:</span></b> We usually respond within 24 hours.
            <br /><br />
          </div>

          <h3>
            <i><span style={{ color: "#73090A" }}>Quick Help :</span></i>
          </h3>

          <div style={{ fontSize: "16px" }}>
            • <b><span style={{ color: "#73090A" }}>Track Order:</span></b> [Click Here to Track Your Order]
            <br /><br />

            • <b><span style={{ color: "#73090A" }}>Returns & Exchanges:</span></b> [The Return policy available for 7 days]
            <br /><br />
          </div>

          <h3>
            <i><span style={{ color: "#73090A" }}>Our Warehouse / Return Address :</span></i>
          </h3>

          <div style={{ fontSize: "16px" }}>
            <b>Fashion club</b>
            <br />
            Plot No.03, Main Road,
            <br />
            Maharanipeta, Visakhapatnam,
            <br />
            Andhra Pradesh - 530002, India.
            <br /><br />
          </div>

          <h3>
            <span style={{ color: "#73090A" }}>Connect With Us :</span>
          </h3>

          <p>
            <span style={{ fontSize: "16px" }}>
              Follow us for daily style inspiration and drop updates
            </span>
          </p>

          <div style={{ fontSize: "16px" }}>
            • <b><span style={{ color: "#73090A" }}>Instagram:</span></b> @Fashion club
            <br /><br />

            • <b><span style={{ color: "#73090A" }}>Facebook:</span></b> Fashion club
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;