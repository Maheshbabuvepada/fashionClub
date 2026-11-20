
import React, { useState, useEffect } from "react";
import { getProducts } from "../Services/productService";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  const image = Object.entries(images).find(([path]) => {
    return decodeURIComponent(path.split("/").pop()) === fileName;
  });

  return image ? image[1] : "";
}

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setError("");
      } catch (err) {
        setError("Unable to load products from backend");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function searchProduct() {
    if (search.trim() === "") {
      alert("Please enter a product name");
    } else {
      alert("You searched for: " + search);
    }
  }

  return (
    <div>

      {/* Logo and Heading */}
      <div className="header">
        <img
          src={getImage("logo.png")}
          className="logo"
          alt="Fashion Club Logo"
        />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>

        {/* Login Icon */}
        <a href="/login" className="login-icon" title="Login">
          <i className="bi bi-person-circle"></i>
        </a>
      </div>

      {/* Navigation */}
      <ul className="nav nav-tabs">

        <li className="nav-item">
          <a className="nav-link active" style={{ color: "#73090A" }} href="/">
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

        <li className="nav-item">
          <a className="nav-link" style={{ color: "#73090A" }} href="/about">
            <b>About</b>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" style={{ color: "#73090A" }} href="/contact">
            <b>Contact</b>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" style={{ color: "#73090A" }} href="/cart">
            <b>Cart 🛒</b>
          </a>
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

        <button onClick={searchProduct}>Search</button>
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
          <button type="button" data-bs-target="#myslides"data-bs-slide-to="0"className="active"aria-current="true"aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myslides" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myslides" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner text-center">

          <div className="carousel-item active">
            <a href="/lenin-shirts">
              <img
                src={getImage("slides-shirts.png")}
                className="d-block h-50 w-100"
                alt="Shirts"
              />
            </a>
          </div>

          <div className="carousel-item">
            <a href="/jeans">
              <img
                src={getImage("slides-jeans.avif")}
                className="d-block h-50 w-100"
                alt="Jeans"
              />
            </a>
          </div>

          <div className="carousel-item">
            <a href="/sneakers">
              <img
                src={getImage("slides-shoes.avif")}
                className="d-block h-50 w-100"
                alt="Shoes"
              />
            </a>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myslides"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myslides"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>

      {/* Backend Products */}
      <div className="container mt-4">

        <h2 className="text-center">Products from Backend</h2>

        {loading && <p className="text-center">Loading products...</p>}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-center">No products available</p>
        )}

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.productId}>
              <div className="card h-100">

                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>

                  <p>Category: {product.category}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Size: {product.size}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Home;
