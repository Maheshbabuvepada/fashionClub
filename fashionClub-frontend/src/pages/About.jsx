import React from "react";
import logo from "../assets/logo.png";

function About() {
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
          <a className="nav-link" href="/" style={{ color: "#73090A" }}> <b>Home</b></a>
        </li>

        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"style={{ color: "#73090A" }}data-bs-toggle="dropdown" type="button" ><b>Men</b>
          </button>

          <div className="dropdown-menu p-4">
            <div className="row">

              <div className="col">
                <h6><b>TOPWEAR</b></h6>
                <a className="dropdown-item" href="/polo-tshirt">
                  Polo T-Shirt
                </a>
                <a className="dropdown-item" href="/lenin-shirts">
                  Lenin-Shirts
                </a>
              </div>

              <div className="col">
                <h6><b>BOTTOMWEAR</b></h6>
                <a className="dropdown-item" href="/jeans">
                  Jeans
                </a>
              </div>

              <div className="col">
                <h6><b>FOOTWEAR</b></h6>
                <a className="dropdown-item" href="/footwear">
                  Footwear
                </a>
                <a className="dropdown-item" href="/sneakers">
                  Sneakers
                </a>
              </div>

            </div>
          </div>
        </li>

        <li className="nav-item">
          <a href="/login" className="login-icon" title="Login">
            <i className="bi bi-person-circle"></i>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" href="/about"style={{ color: "#73090A" }}>
            <b>About</b>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/contact"style={{ color: "#73090A" }}> <b>Contact</b></a>
        </li>
      </ul><br />

      <h5 className="text-center">
        <b>
          <span style={{ color: "#73090A", fontFamily: "Garamond" }}>ABOUT</span>
        </b></h5>

      <h1 className="marquee">
        <i>
          <marquee>
            <span style={{ color: "#73090A" }}>
              Welcome to Fashion Club
            </span>
          </marquee>
        </i>
      </h1>

      <div className="about-card">

        <h3>
          <span style={{ color: "#73090A" }}>Our Story</span>
        </h3>

        <br />

        <p style={{ color: "white", fontSize: "18px" }}>
          At Fashion Club, we believe your wardrobe should adapt to your lifestyle.
          We started with a clear mission:
          <br />
          to create high-quality, versatile clothing that takes you effortlessly
          from a busy workday or a university lecture to a relaxed weekend with friends.
          No compromises, just great style.
        </p>

        <h3>
          <span style={{ color: "#73090A" }}>
            Your Everyday Wardrobe, Covered
          </span>
        </h3>

        <p style={{ color: "white", fontSize: "18px" }}>
          <i>
            We design essential pieces for teenagers and working professionals
            who want to look sharp and feel comfortable:
          </i>
        </p>

        <div style={{ fontSize: "18px", color: "white" }}>

          <p>
            • <b style={{ color: "#73090A" }}>Smart & Formal:</b>
            Tailored formal shirts and crisp formal trousers for your career milestones.
          </p>

          <p>
            • <b style={{ color: "#73090A" }}>Smart Casual:</b>
            Premium polo shirts, casual shirts, and sleek casual trousers
            for a polished everyday look.
          </p>

          <p>
            • <b style={{ color: "#73090A" }}>Daily Essentials:</b>
            Ultra-soft t-shirts, cozy sweatshirts, and durable jeans
            built for comfort and style.
          </p>

        </div>

        <h3>
          <span style={{ color: "#73090A" }}>
            The Fashion Club Promise
          </span>
        </h3>

        <div style={{ fontSize: "18px", color: "white" }}>

          <p>
            • <b style={{ color: "#73090A" }}>Versatile Fits:</b>
            Clothes designed to transition seamlessly from professional
            settings to casual hangouts.
          </p>

          <p>
            • <b style={{ color: "#73090A" }}>Reliable Quality:</b>
            We use durable, breathable fabrics that hold their shape
            and comfort over time.
          </p>

          <p>
            • <b style={{ color: "#73090A" }}>Affordable Style:</b>
            Premium wardrobe staples delivered directly to you
            without the luxury price tag.
          </p>

        </div>

        <p style={{ color: "white", fontSize: "18px" }}>
          [ Upgrade Your Wardrobe Now ]
        </p>

      </div>
    </div>
  );
}

export default About;