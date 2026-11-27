
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const getImage = (fileName) => {
  if (!fileName) return "";

  const file = Object.keys(images).find((path) =>
    decodeURIComponent(path.split("/").pop()).trim().toLowerCase() ===
    fileName.trim().toLowerCase()
  );

  return file ? images[file] : "";
};

// Category name matching
function normalizeCategory(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[\s_-]/g, "")
    .replace(/s$/, "");
}

// Existing static products
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
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [backendProducts, setBackendProducts] = useState([]);

  // Load products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
          throw new Error("Unable to load backend products");
        }

        const data = await response.json();
        setBackendProducts(data);
      } catch (error) {
        console.error("Product loading error:", error);
      }
    }

    loadProducts();
  }, []);

  // Admin products belonging only to Lenin-Shirts
  const adminProducts = backendProducts.filter((product) => {
    const isLeninShirt =
      normalizeCategory(product.category) ===
      normalizeCategory("Lenin-Shirts");

    const hasImage = product.image && product.image.trim() !== "";

    const alreadyExists = products.some((staticProduct) =>
      staticProduct.images.some(
        (image) =>
          image.trim().toLowerCase() ===
          (product.image || "").trim().toLowerCase()
      )
    );

    return isLeninShirt && hasImage && !alreadyExists;
  });

  // Add existing static product to cart
  const handleAddToCart = async (product, index, buyNow = false) => {
    const selectedSize = selectedSizes[`static-${index}`];

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const imageName = product.images[0].trim().toLowerCase();

    const backendProduct = backendProducts.find((item) =>
      (item.image || "").trim().toLowerCase() === imageName
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
      description: product.description,
      brand: backendProduct.brand || product.name,
      category: backendProduct.category || "Lenin-Shirts",
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
        alert("Product added to cart successfully!");
      }
    }
  };

  // Add Admin product to cart
  const handleAdminAddToCart = async (
    product,
    index,
    buyNow = false
  ) => {
    const selectedSize = selectedSizes[`admin-${index}`];

    if (!selectedSize) {
      alert("Please select a size");
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
        alert("Product added to cart successfully!");
      }
    }
  };

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
            <b>Cart ({cartItems.length})</b>
          </Link>
        </li>

        <Link to="/login" className="login-icon" title="Login">
          <i className="bi bi-person-circle"></i>
        </Link>
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

          {/* Existing 12 static products */}
          {products.map((product, index) => (
            <div className="col" key={`static-${index}`}>
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
                          aria-current={
                            imageIndex === 0 ? "true" : undefined
                          }
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

                  <h6 className="Price">{product.price}</h6>

                  <label className="mt-2"><b>Select Size:</b></label>

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
                    {["S", "M", "L", "XL"].map((size) => (
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
                      onClick={() => handleAddToCart(product, index, true)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Admin-added Lenin-Shirts products */}
          {adminProducts.map((product, index) => (
            <div className="col" key={`admin-${product.productId}`}>
              <div className="card h-100">
                <div className="card-body">

                  <div className="text-center">
                    <img
                      src={`${API}/images/${encodeURIComponent(product.image)}`}
                      className="card-img-top"
                      alt={product.productName}
                    />
                  </div>

                  <h5 className="card-title text-center mt-3">
                    {product.brand}
                  </h5>

                  <p className="card-text">
                    {product.productName}
                  </p>

                  <h6 className="Price">
                    ₹{Number(product.price).toFixed(2)}
                  </h6>

                  <label className="mt-2">
                    <b>Select Size:</b>
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
                    {["S", "M", "L", "XL"].map((size) => (
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
    </>
  );
}

export default LeninShirts;
