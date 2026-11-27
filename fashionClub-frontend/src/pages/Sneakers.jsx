
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const API = "http://localhost:8080";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  if (!fileName) return "";

  const image = Object.entries(images).find(([path]) => {
    return (
      decodeURIComponent(path.split("/").pop()).trim().toLowerCase() ===
      fileName.trim().toLowerCase()
    );
  });

  return image ? image[1] : "";
}

function normalizeCategory(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[\s_-]/g, "")
    .replace(/s$/, "");
}

const products = [
  {
    name: "Men Quantum Step High Top Sneakers",
    price: "₹1399.00",
    images: ["Sneakers[S-IceBlue-1].avif", "Sneakers[S-IceBlue-1.1].avif"],
  },
  {
    name: "Men Itachi Uchiha High Top Sneakers",
    price: "₹1299.00",
    images: ["Sneakers[S-Merun-2].avif", "Sneakers[S-Merun-2.1].avif"],
  },
  {
    name: "Men BumbleBee High Top Sneakers",
    price: "₹1199.00",
    images: ["Sneakers[S-Yellow-3].avif", "Sneakers[S-Yellow-3.1].avif"],
  },
  {
    name: "Men Yoda High Top Sneakers",
    price: "₹1199.00",
    images: ["Sneakers[S-Brown-4].avif", "Sneakers[S-Brown-4.1].avif"],
  },
  {
    name: "Men Walnut Low Top Sneakers",
    price: "₹1999.00",
    images: ["Sneakers[S-Brown-5].avif", "Sneakers[S-Brown-5.1].avif"],
  },
  {
    name: "Men Wakanda Forever Low Top Sneakers",
    price: "₹1999.00",
    images: ["Sneakers[S-Purple-6].avif", "Sneakers[S-Purple-6.1].avif"],
  },
  {
    name: "Men Camo High Top Sneakers",
    price: "₹1299.00",
    images: ["Sneakers[S-Green-7].avif", "Sneakers[S-Green-7.1].avif"],
  },
  {
    name: "Men Autumun Low Top Sneakers",
    price: "₹1099.00",
    images: ["Sneakers[S-Creme-8].avif", "Sneakers[S-Creme-8.1].avif"],
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
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [backendProducts, setBackendProducts] = useState([]);

  // Load backend products
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setBackendProducts(data);
      } catch (error) {
        console.error("Products loading error:", error);
      }
    }

    loadProducts();
  }, []);

  // Admin-added Sneakers only
  const adminProducts = backendProducts.filter((product) => {
    const correctCategory =
      normalizeCategory(product.category) ===
      normalizeCategory("Sneakers");

    const hasImage = product.image && product.image.trim() !== "";

    // Avoid displaying duplicate static products
    const alreadyExists = products.some((staticProduct) =>
      staticProduct.images.some(
        (image) =>
          !image.startsWith("http") &&
          image.trim().toLowerCase() ===
            (product.image || "").trim().toLowerCase()
      )
    );

    return correctCategory && hasImage && !alreadyExists;
  });

  // Add existing static Sneakers to cart
  const handleAddToCart = async (product, index, buyNow = false) => {
    const selectedSize = selectedSizes[`static-${index}`];

    if (!selectedSize) {
      alert("Please select a shoe size");
      return;
    }

    const imageName = product.images[0];

    // Match static product with backend using image filename
    const backendProduct = backendProducts.find(
      (item) =>
        !imageName.startsWith("http") &&
        (item.image || "").trim().toLowerCase() ===
          imageName.trim().toLowerCase()
    );

    if (!backendProduct || backendProduct.productId == null) {
      alert(
        "This product is not added in Admin Products yet. Please add it from Admin first."
      );
      return;
    }

    const cartProduct = {
      productId: backendProduct.productId,
      productName: backendProduct.productName || product.name,
      name: backendProduct.productName || product.name,
      description: product.name,
      brand: backendProduct.brand || "Fashion Club",
      category: backendProduct.category || "Sneakers",
      price: Number(backendProduct.price),
      image: backendProduct.image,
      size: selectedSize,
      stock: backendProduct.stock,
    };

    const success = await addToCart(cartProduct);

    if (success) {
      if (buyNow) {
        navigate("/cart");
      } else {
        alert("Sneakers added to cart successfully!");
      }
    }
  };

  // Add Admin product to cart
  const handleAdminAddToCart = async (product, index, buyNow = false) => {
    const selectedSize = selectedSizes[`admin-${index}`];

    if (!selectedSize) {
      alert("Please select a shoe size");
      return;
    }

    if (product.productId == null) {
      alert("Product ID is missing");
      return;
    }

    const cartProduct = {
      productId: product.productId,
      productName: product.productName,
      name: product.productName,
      description: product.productName,
      brand: product.brand,
      category: product.category,
      price: Number(product.price),
      image: product.image,
      size: selectedSize,
      stock: product.stock,
    };

    const success = await addToCart(cartProduct);

    if (success) {
      if (buyNow) {
        navigate("/cart");
      } else {
        alert("Sneakers added to cart successfully!");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>

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

        <Link to="/login" className="login-icon" title="Login">
          <i className="bi bi-person-circle"></i>
        </Link>
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
          <Link className="nav-link" style={{ color: "#73090A" }} to="/about">
            <b>About</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={{ color: "#73090A" }} to="/contact">
            <b>Contact</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={{ color: "#73090A" }} to="/cart">
            <b><i className="bi bi-cart3"></i> Cart ({cartItems.length})</b>
          </Link>
        </li>
      </ul>

      <br />

      <h5 className="text-center">
        <b>
          <span style={{ color: "#73090A", fontFamily: "Garamond" }}>
            SNEAKERS
          </span>
        </b>
      </h5>

      <br />

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">

          {/* Existing 12 Sneakers products */}
          {products.map((product, index) => {
            const carouselId = `sneakerSlides${index + 1}`;

            return (
              <div className="col" key={`static-${index}`}>
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
                              src={
                                image.startsWith("http")
                                  ? image
                                  : getImage(image)
                              }
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
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>

                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    <h5 className="card-title text-center mt-3">
                      Sneakers
                    </h5>

                    <p className="card-text">{product.name}</p>
                    <h6 className="Price">{product.price}</h6>

                    <label className="mt-2">
                      <b>Select Shoe Size:</b>
                    </label>

                    <select
                      className="form-select mt-1"
                      value={selectedSizes[`static-${index}`] || ""}
                      onChange={(e) =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [`static-${index}`]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Choose Size</option>
                      {["7", "8", "9", "10"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => handleAddToCart(product, index)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="btn btn-success flex-fill"
                        onClick={() =>
                          handleAddToCart(product, index, true)
                        }
                      >
                        Buy Now
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* Admin-added Sneakers products */}
          {adminProducts.map((product, index) => (
            <div className="col" key={`admin-${product.productId}`}>
              <div className="card h-100">
                <div className="card-body">

                  <img
                    src={`${API}/images/${encodeURIComponent(product.image)}`}
                    className="card-img-top"
                    alt={product.productName}
                    style={{
  width: "100%",
  height: "400px",
  objectFit: "contain",
  padding: "5px",
}}
                  />

                  <h5 className="card-title text-center mt-3">
                    {product.brand || "Sneakers"}
                  </h5>

                  <p className="card-text">
                    {product.productName}
                  </p>

                  <p>
                    <b>Brand:</b> {product.brand}<br />
                    <b>Category:</b> {product.category}
                  </p>

                  <h6 className="Price">
                    ₹{Number(product.price).toFixed(2)}
                  </h6>

                  <label className="mt-2">
                    <b>Select Shoe Size:</b>
                  </label>

                  <select
                    className="form-select mt-1"
                    value={selectedSizes[`admin-${index}`] || ""}
                    onChange={(e) =>
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [`admin-${index}`]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Choose Size</option>
                    {["7", "8", "9", "10"].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() =>
                        handleAdminAddToCart(product, index)
                      }
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-success flex-fill"
                      onClick={() =>
                        handleAdminAddToCart(product, index, true)
                      }
                    >
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <br />
    </div>
  );
}

export default Sneakers;
