import React from "react";
import { Link } from "react-router-dom";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  return images[`../assets/${fileName}`];
}

const products = [
  {
    name: "Men Quantum Step High Top Sneakers",
    price: "₹1399.00",
    images: [
      getImage("Sneakers[S-IceBlue-1].avif"),
      getImage("Sneakers[S-IceBlue-1.1].avif"),
    ],
  },
  {
    name: "Men Itachi Uchiha High Top Sneakers",
    price: "₹1299.00",
    images: [
      getImage("Sneakers[S-Merun-2].avif"),
      getImage("Sneakers[S-Merun-2.1].avif"),
    ],
  },
  {
    name: "Men BumbleBee High Top Sneakers",
    price: "₹1199.00",
    images: [
      getImage("Sneakers[S-Yellow-3].avif"),
      getImage("Sneakers[S-Yellow-3.1].avif"),
    ],
  },
  {
    name: "Men Yoda High Top Sneakers",
    price: "₹1199.00",
    images: [
      getImage("Sneakers[S-Brown-4].avif"),
      getImage("Sneakers[S-Brown-4.1].avif"),
    ],
  },
  {
    name: "Men Walnut Low Top Sneakers",
    price: "₹1999.00",
    images: [
      getImage("Sneakers[S-Brown-5].avif"),
      getImage("Sneakers[S-Brown-5.1].avif"),
    ],
  },
  {
    name: "Men Wakanda Forever Low Top Sneakers",
    price: "₹1999.00",
    images: [
      getImage("Sneakers[S-Purple-6].avif"),
      getImage("Sneakers[S-Purple-6.1].avif"),
    ],
  },
  {
    name: "Men Camo High Top Sneakers",
    price: "₹1299.00",
    images: [
      getImage("Sneakers[S-Green-7].avif"),
      getImage("Sneakers[S-Green-7.1].avif"),
    ],
  },
  {
    name: "Men Autumun Low Top Sneakers",
    price: "₹1099.00",
    images: [
      getImage("Sneakers[S-Creme-8].avif"),
      getImage("Sneakers[S-Creme-8.1].avif"),
    ],
  },
  {
    name: "Men High Top Sneakers",
    price: "₹1999.00",
    images: [
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1735363892_5538389.jpg?w=480&dpr=2",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1735363892_6205765.jpg?w=480&dpr=2",
    ],
  },
  {
    name: "Men Low Top Sneakers Blue",
    price: "₹1499.00",
    images: [
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1779257428_4013668.jpg?w=480&dpr=2",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1779257428_6311065.jpg?w=480&dpr=2",
    ],
  },
  {
    name: "Men Lumn Low Top Sneakers",
    price: "₹1099.00",
    images: [
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1766134309_2692389.jpg?w=480&dpr=2",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1766134309_8691350.jpg?w=480&dpr=2",
    ],
  },
  {
    name: "Men Emerald Low Top Sneakers",
    price: "₹1099.00",
    images: [
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1767936957_8630420.jpg?w=480&dpr=2",
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1767936957_3133916.jpg?w=480&dpr=2",
    ],
  },
];

function Sneakers() {
  return (
    <>
      <div className="header">
        <img src={getImage("logo.png")} className="logo" alt="Fashion Club Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" style={{ color: "#73090A" }} to="/">
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
                <Link className="dropdown-item" to="/polo-tshirt">Polo T-Shirt</Link>
                <Link className="dropdown-item" to="/lenin-shirts">Lenin-Shirts</Link>
              </div>

              <div className="col">
                <h6><b>BOTTOMWEAR</b></h6>
                <Link className="dropdown-item" to="/jeans">Jeans</Link>
              </div>

              <div className="col">
                <h6><b>FOOTWEAR</b></h6>
                <Link className="dropdown-item" to="/footwear">Footwear</Link>
                <Link className="dropdown-item" to="/sneakers">Sneakers</Link>
              </div>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <Link to="/login" className="login-icon" title="Login">
            <i className="bi bi-person-circle"></i>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={{ color: "#73090A" }} to="/about">
            <b>About</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={{ color: "#73090A" }} to="/contact">
            <b>Contact</b>
          </Link>
        </li>
      </ul>

      <br />

      <h5 className="text-center">
        <b>
          <font color="#73090A" face="Garamond">SNEAKERS</font>
        </b>
      </h5>

      <br />

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((product, index) => {
          const carouselId = `sneakerSlides${index + 1}`;

          return (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <div id={carouselId} className="carousel slide">
                    <div className="carousel-indicators">
                      {product.images.map((image, imageIndex) => (
                        <button
                          key={imageIndex}
                          type="button"
                          data-bs-target={`#${carouselId}`}
                          data-bs-slide-to={imageIndex}
                          className={imageIndex === 0 ? "active" : ""}
                          aria-current={imageIndex === 0 ? "true" : undefined}
                          aria-label={`Slide ${imageIndex + 1}`}
                        />
                      ))}
                    </div>

                    <div className="carousel-inner text-center">
                      {product.images.map((image, imageIndex) => (
                        <div
                          className={`carousel-item ${imageIndex === 0 ? "active" : ""}`}
                          key={imageIndex}
                        >
                          <img
                            src={image}
                            className="card-img-top"
                            alt={product.name}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#${carouselId}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#${carouselId}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  <h5 className="card-title text-center">Sneakers</h5>
                  <p className="card-text">{product.name}</p>
                  <span className="Price">{product.price}</span>
                  <br />

                  <button className="btn btn-danger mt-3">
                    Order now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <br />
    </>
  );
}

export default Sneakers;