
import React from "react";

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
    name: "Allen solly",
    description: "Cotton lenin shirts[chakras].",
    price: "₹1099.00",
    images: [
      "Allen solly[S-Creme-1].avif",
      "Allen solly[S-Creme-1.1].avif",
      "Allen solly[S-Creme-1.2].avif",
      "Allen solly[S-Creme-1.3].avif",
      "Allen solly[S-Creme-1.4].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Phases Of Moon].",
    price: "₹1099.00",
    images: [
      "Allen solly[S-Blue-2].avif",
      "Allen solly[S-Blue-2.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Kalyug].",
    price: "₹1099.00",
    images: [
      "Allen solly[S-Yellow-3].avif",
      "Allen solly[S-Yellow-3.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Dog-walker].",
    price: "₹1099.00",
    images: [
      "Allen solly[S-Creme-4].avif",
      "Allen solly[S-Creme-4.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Pearl White].",
    price: "₹999.00",
    images: [
      "Allen solly[S-White-5].avif",
      "Allen solly[S-White-5.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Russet Brown].",
    price: "₹999.00",
    images: [
      "Allen solly[S-Brown-6].avif",
      "Allen solly[S-Brown-6.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Ocean Blue].",
    price: "₹999.00",
    images: [
      "Allen solly[S-LiteGreen-7].avif",
      "Allen solly[S-LiteGreen-7.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Soft Pink].",
    price: "₹999.00",
    images: [
      "Allen solly[S-SoftPink-8].avif",
      "Allen solly[S-SoftPink-8.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Bold Black].",
    price: "₹999.00",
    images: [
      "Allen solly[S-Black-9].avif",
      "Allen solly[S-Black-9.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Golden Haze].",
    price: "₹999.00",
    images: [
      "Allen solly[S-Yellow-10].avif",
      "Allen solly[S-Yellow-10.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Merun].",
    price: "₹999.00",
    images: [
      "Allen solly[S-Merun-11].avif",
      "Allen solly[S-Merun-11.1].avif",
    ],
  },
  {
    name: "Allen solly",
    description: "Cotton lenin shirts[Berry Purple].",
    price: "₹999.00",
    images: [
      "Allen solly[S-Purple-12].avif",
      "Allen solly[S-Purple-12.1].avif",
    ],
  },
];

function LeninShirts() {
  return (
    <>
      <div className="header">
        <img src={getImage("logo.png")} className="logo" alt="Logo" />

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
                <a className="dropdown-item" href="/polo-tshirt">
                  Polo T-Shirt
                </a>
                <a className="dropdown-item" href="/lenin-shirts">
                  Lenin-Shirts
                </a>
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
            LENIN-SHIRTS
          </span>
        </b>
      </h5>

      <br />

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <div
                    id={`shirtSlide${index}`}
                    className="carousel slide"
                  >
                    <div className="carousel-indicators">
                      {product.images.map((image, imageIndex) => (
                        <button
                          key={imageIndex}
                          type="button"
                          data-bs-target={`#shirtSlide${index}`}
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
                      data-bs-target={`#shirtSlide${index}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#shirtSlide${index}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  <h5 className="card-title text-center mt-3">
                    {product.name}
                  </h5>

                  <p className="card-text">{product.description}</p>

                  <span className="Price">{product.price}</span>
                  <br />

                  <button className="btn btn-danger mt-3">
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

export default LeninShirts;
