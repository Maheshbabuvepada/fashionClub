
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../MyStyle.css";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  if (!fileName) return "";

  const image = Object.entries(images).find(([path]) => {
    const assetName = decodeURIComponent(path.split("/").pop());

    return (
      assetName.trim().toLowerCase() ===
      fileName.trim().toLowerCase()
    );
  });

  if (image) {
    return image[1];
  }

  return `http://localhost:8080/images/${encodeURIComponent(fileName.trim())}`;
}

function Home() {
  const [search, setSearch] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer") || "null"
  );

  function handleLogout() {
    localStorage.removeItem("customer");
    alert("Logout successful!");
    navigate("/");
    window.location.reload();
  }

  function searchProduct() {
    if (search.trim() === "") {
      alert("Please enter a product name");
    } else {
      alert("You searched for: " + search);
    }
  }

  return (
    <div
      className="home-page"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Logo, Heading and Customer Details */}
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          minHeight: "110px",
        }}
      >
        <img
          src={getImage("logo.png")}
          className="logo"
          alt="Fashion Club Logo"
          style={{
            position: "absolute",
            left: "3%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        <div
          className="title"
          style={{
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>

        {/* Customer Login / Name / Logout */}
        <div
          className="d-flex align-items-center gap-3"
          style={{
            position: "absolute",
            right: "3%",
            top: "50%",
            transform: "translateY(-50%)",
            flexShrink: 0,
          }}
        >
          {customer ? (
            <>
              <span
                style={{
                  color: "#73090A",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Welcome, {customer.firstName}
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-sm"
                style={{
                  backgroundColor: "#4D252B",
                  color: "white",
                  width: "auto",
                  padding: "6px 15px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="login-icon"
              title="Login"
            >
              <i className="bi bi-person-circle"></i>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className="nav-link active"
            style={{ color: "#73090A" }}
            to="/"
          >
            <b>Home</b>
          </Link>
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

                <Link className="dropdown-item" to="/polo-tshirt">
                  Polo T-Shirt
                </Link>

                <Link className="dropdown-item" to="/lenin-shirts">
                  Lenin-Shirts
                </Link>
              </div>

              <div className="col">
                <h6><b>BOTTOMWEAR</b></h6>

                <Link className="dropdown-item" to="/jeans">
                  Jeans
                </Link>
              </div>

              <div className="col">
                <h6><b>FOOTWEAR</b></h6>

                <Link className="dropdown-item" to="/footwear">
                  Footwear
                </Link>

                <Link className="dropdown-item" to="/sneakers">
                  Sneakers
                </Link>
              </div>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={{ color: "#73090A" }}
            to="/about"
          >
            <b>About</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={{ color: "#73090A" }}
            to="/contact"
          >
            <b>Contact</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={{ color: "#73090A" }}
            to="/cart"
          >
            <b>
              <i className="bi bi-cart3"></i> Cart ({cartItems.length})
            </b>
          </Link>
        </li>
      </ul>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="What are you looking for....?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchProduct}>
          Search
        </button>
      </div>

      {/* Welcome Message */}
      <h2 className="marquee">
        <i>
          <marquee>
            <span style={{ color: "#73090A" }}>
              Welcome to Fashion Club
            </span>
          </marquee>
        </i>
      </h2>

      {/* Image Carousel */}
      <div id="myslides" className="carousel slide w-100">

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myslides"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#myslides"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#myslides"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner text-center">

          <div className="carousel-item active">
            <Link to="/lenin-shirts">
              <img
                src={getImage("slides-shirts.png")}
                className="d-block h-50 w-100"
                alt="Shirts"
              />
            </Link>
          </div>

          <div className="carousel-item">
            <Link to="/jeans">
              <img
                src={getImage("slides-jeans.avif")}
                className="d-block h-50 w-100"
                alt="Jeans"
              />
            </Link>
          </div>

          <div className="carousel-item">
            <Link to="/sneakers">
              <img
                src={getImage("slides-shoes.avif")}
                className="d-block h-50 w-100"
                alt="Shoes"
              />
            </Link>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myslides"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myslides"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>

      {/* Home Page Benefits */}
      <div
        className="home-benefits"
        style={{
          width: "100%",
          marginTop: "35px",
          marginBottom: "0",
          overflow: "hidden",
        }}
      >
        <img
          src={getImage("home-benefits.jpg")}
          alt="10% Cashback, 30 days Easy Returns and Free Fast Shipping"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

    </div>
  );
}

export default Home;
