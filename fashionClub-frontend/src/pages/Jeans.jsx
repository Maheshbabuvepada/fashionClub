
import React, { useState } from "react";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const getImage = (fileName) => {
  const file = Object.keys(images).find((path) =>
    decodeURIComponent(path).endsWith(fileName)
  );
  return file ? images[file] : "";
};

const products = [
  {
    name: "Buda Jeans Co",
    description: "Men Bootcut Denim : Ice Mist.",
    price: "₹1099.00",
    images: ["Wrogn[J-BlueLite-1].avif", "Wrogn[J-BlueLite-1.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men BootCut Denim : shade black.",
    price: "₹1099.00",
    images: ["Wrogn[J-Black-2].avif", "Wrogn[J-Black-2.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men BootCut Denim : Indigo Blue.",
    price: "₹1099.00",
    images: ["Wrogn[J-BlueDark-3.1].avif", "Wrogn[J-BlueDark-3.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men BootCut Denim : Raw Static.",
    price: "₹1099.00",
    images: ["Wrogn[J-Blueshade-4].avif", "Wrogn[J-Blueshade-4.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Straight-Fit Denim: Blue Drift.",
    price: "₹699.00",
    images: ["Wrogn[J-BlueDark-5].avif", "Wrogn[J-BlueDark-5.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Straight-Fit Denim: Black Drift.",
    price: "₹699.00",
    images: ["Wrogn[J-Black-6].avif", "Wrogn[J-Black-6.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Straight-Fit Denim: IceBlue Drift.",
    price: "₹699.00",
    images: ["Wrogn[J-IceBlue-7].avif", "Wrogn[J-IceBlue-7.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Granite Grey (Straight Fit).",
    price: "₹699.00",
    images: ["Wrogn[J-DarkGrey-8].avif", "Wrogn[J-DarkGrey-8.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Denim: Pacific (Straight Fit).",
    price: "₹599.00",
    images: ["Wrogn[J-BlueDark-9].avif", "Wrogn[J-BlueDark-9.1].avif"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Men Straight-Fit Denim: Brown.",
    price: "₹599.00",
    images: ["Wrogn[J-Brown-10].webp", "Wrogn[J-Brown-10.1].webp"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Wrogn Off-White Barrel-Fit Mid-Rise Jeans.",
    price: "₹699.00",
    images: ["Wrogn[J-White-11].webp", "Wrogn[J-White-11.1].webp"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    name: "Buda Jeans Co",
    description: "Wrogn Blue Relaxed-Fit Mid-Rise Cargo Jeans.",
    price: "₹899.00",
    images: ["Wrogn[J-IceBlue-12].webp", "Wrogn[J-IceBlue-12.1].webp"],
    sizes: ["28", "30", "32", "34", "36"],
  },
];

function Jeans() {

  // Store selected size for each product
  const [selectedSizes, setSelectedSizes] = useState({});

  return (
    <>
      <div className="header">
        <img src={getImage("logo.png")} className="logo" alt="Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      {/* Navigation */}
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
          <a className="nav-link" style={{ color: "#73090A" }} href="/contact">
            <b>Contact</b>
          </a>
        </li>

      </ul>

      <br />

      <h5 className="text-center">
        <b>
          <span style={{ color: "#73090A", fontFamily: "Garamond" }}>
            JEANS
          </span>
        </b>
      </h5>

      <br />

      {/* Products */}
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">

          {products.map((product, index) => (

            <div className="col" key={index}>
              <div className="card h-100">

                <div className="card-body">

                  {/* Image Carousel */}
                  <div id={`jeansSlide${index}`} className="carousel slide">

                    <div className="carousel-indicators">

                      {product.images.map((image, imageIndex) => (
                        <button
                          key={imageIndex}
                          type="button"
                          data-bs-target={`#jeansSlide${index}`}
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
                          className={`carousel-item ${
                            imageIndex === 0 ? "active" : ""
                          }`}
                          key={imageIndex}
                        >
                          <img
                            src={getImage(image)}
                            className="card-img-top"
                            alt={product.description}
                          />
                        </div>
                      ))}

                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#jeansSlide${index}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#jeansSlide${index}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                      <span className="visually-hidden">Next</span>
                    </button>

                  </div>

                  {/* Product Details */}
                  <h5 className="card-title text-center mt-3">
                    {product.name}
                  </h5>

                  <p className="card-text">
                    {product.description}
                  </p>

                  {/* Size Selection */}
                  <div className="mt-3">

                    <label className="form-label">
                      <b>Select Size:</b>
                    </label>

                    <select
                      className="form-select"
                      value={selectedSizes[index] || ""}
                      onChange={(e) =>
                        setSelectedSizes({
                          ...selectedSizes,
                          [index]: e.target.value,
                        })
                      }
                    >

                      <option value="">Choose Size</option>

                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}

                    </select>

                  </div>

                  <br />

                  <span className="Price">
                    {product.price}
                  </span>

                  <br />

                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => {
                      if (!selectedSizes[index]) {
                        alert("Please select a size");
                      } else {
                        alert(
                          "Product: " + product.description +
                          "\nSize: " + selectedSizes[index] +
                          "\nPrice: " + product.price
                        );
                      }
                    }}
                  >
                    Order now
                  </button>

                </div>
              </div>
            </div>

          ))}

        </div>
      </div>

    </>
  );
}

export default Jeans;
