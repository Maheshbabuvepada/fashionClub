
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const API = "http://localhost:8080";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default"
});

function getImage(fileName) {
  const imagePath = `../assets/${fileName}`;
  return images[imagePath] || "";
}

// CATEGORY NORMALIZATION
function normalizeCategory(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[\s_-]/g, "")
    .replace(/s$/, "");
}

// EXISTING STATIC PRODUCTS
const products = [
  { image: "Highlander[T-Blue-1].webp", description: "Highlander Navy Striped Relaxed-Fit Cotton polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-Blue-2].webp", description: "Highlander Emrald Green Relaxed-Fit Cotton-Blend polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-Blue-3].webp", description: "Highlander Emrald Navy-Blue Blocked-Relaxed-Fit polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-Brownwhite-4].webp", description: "Highlander Brown Relaxed-Fit Cotton-Blend polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-Blue-5].webp", description: "Highlander Navy Textured Relaxed-Fit polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-White-6].webp", description: "Highlander White Textured Relaxed-Fit polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-SeaGreen-7].webp", description: "Highlander Sage Textured Relaxed-Fit polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-White-8].webp", description: "Highlander Off-White Self-Striped Slim-Fit Cotton-Blend polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-DarkGreen-9].webp", description: "Highlander Green Solid Relaxed-Fit Cotton polo T-shirt.", price: "699.00" },
  { image: "Highlander[T-Blue-10].webp", description: "Highlander Navy Solid Relaxed-Fit Cotton polo T-shirt.", price: "699.00" },
  { image: "Highlander[T-Purple-11].webp", description: "Highlander Lilac Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-IceBlue-12].webp", description: "Highlander Light Blue Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "450.00" },
  { image: "Highlander[T-Beige-13].webp", description: "Highlander White Textured Relaxed-Fit Polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-Brown-14].webp", description: "Highlander Dark Brown Relaxed-Fit Quarter-Zip Cotton-Blend Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Blue-15].webp", description: "Highlander Navy Knit-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-LightGreen-16].webp", description: "Highlander Self-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "499.00" },
  { image: "Highlander[T-White-17].webp", description: "Highland Off-White Knit-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Black-18].webp", description: "Highlander Black Text-Detail Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-BlueWhite-19].webp", description: "Highlander Off-White Striped Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-CremeLightGreen-20].webp", description: "Highlander Teal-Striped Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Creme-21].webp", description: "Highlander Green Checkered Relaxed-Fit Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Black-22].webp", description: "Highlander Black Text-Design OverSized-Fit Cotton Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Creme-23].webp", description: "Highlander Taupe Color-Blocked Relaxed-Fit Cotton Polo T-shirt.", price: "599.00" },
  { image: "Highlander[T-Black-24].webp", description: "Highlander Black Striped Relaxed-Fit Cotton-Blend Polo T-shirt.", price: "599.00" }
];

function PoloTshirt() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [backendProducts, setBackendProducts] = useState([]);

  // LOAD PRODUCTS FROM BACKEND
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
          throw new Error("Products loading failed");
        }

        const data = await response.json();
        setBackendProducts(data);

      } catch (error) {
        console.error("Product loading error:", error);
      }
    }

    loadProducts();
  }, []);

  // EXISTING PRODUCT IMAGE NAMES
  const existingImageNames = products.map(product =>
    product.image.trim().toLowerCase()
  );

  // EXISTING PRODUCTS
  const existingProducts = products.map(product => ({
    ...product,
    isDynamic: false,
    backendProduct: backendProducts.find(
      p =>
        (p.image || "").trim().toLowerCase() ===
        product.image.trim().toLowerCase()
    )
  }));

  // NEW PRODUCTS ADDED FROM ADMIN
  const newProducts = backendProducts
    .filter(product => {
      const category = normalizeCategory(product.category);

      const imageName = (product.image || "")
        .trim()
        .toLowerCase();

      return (
        category === normalizeCategory("Polo T-Shirt") &&
        imageName !== "" &&
        !existingImageNames.includes(imageName)
      );
    })
    .map(product => ({
      image: product.image,
      description: product.productName,
      price: product.price,
      isDynamic: true,
      backendProduct: product
    }));

  // DISPLAY EXISTING + NEW PRODUCTS
  const displayProducts = [
    ...existingProducts,
    ...newProducts
  ];

  // ADD TO CART
  async function handleAddToCart(product, index, buyNow = false) {
    const selectedSize = selectedSizes[index];

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const backendProduct =
      product.backendProduct ||
      backendProducts.find(
        p =>
          (p.image || "").trim().toLowerCase() ===
          product.image.trim().toLowerCase()
      );

    if (!backendProduct || backendProduct.productId == null) {
      alert(
        "This product is not added in Admin Products yet. Please add it from Admin first."
      );
      return;
    }

    const cartProduct = {
      productId: backendProduct.productId,
      productName: backendProduct.productName,
      name: backendProduct.productName,
      description: product.description,
      brand: backendProduct.brand,
      category: backendProduct.category,
      price: Number(backendProduct.price),
      image: backendProduct.image,
      size: selectedSize
    };

    const success = await addToCart(cartProduct);

    if (!success) {
      return;
    }

    if (buyNow) {
      navigate("/cart");
    } else {
      alert("Product added to cart successfully!");
    }
  }

  return (
    <div>

      {/* HEADER */}
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

      </div>

      {/* NAVIGATION */}
      <ul className="nav nav-tabs">

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/"
            style={{ color: "#73090A" }}
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
            to="/about"
            style={{ color: "#73090A" }}
          >
            <b>About</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/contact"
            style={{ color: "#73090A" }}
          >
            <b>Contact</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/cart"
            style={{ color: "#73090A" }}
          >
            <b>Cart ({cartItems.length})</b>
          </Link>
        </li>

        <Link
          to="/login"
          className="login-icon"
          title="Login"
        >
          <i className="bi bi-person-circle"></i>
        </Link>

      </ul>

      <br />

      {/* PAGE TITLE */}
      <h5 className="text-center">
        <b>
          <span
            style={{
              color: "#73090A",
              fontFamily: "Garamond"
            }}
          >
            POLO T-SHIRTS
          </span>
        </b>
      </h5>

      <br />

      {/* PRODUCTS */}
      <div className="container-fluid">

        <div className="row row-cols-1 row-cols-md-4 g-4">

          {displayProducts.map((product, index) => (

            <div
              className="col"
              key={
                product.backendProduct?.productId ||
                product.image
              }
            >

              <div className="card h-100">

                <img
                  src={
                    product.isDynamic
                      ? `${API}/images/${encodeURIComponent(product.image)}`
                      : getImage(product.image)
                  }
                  className="card-img-top"
                  alt={product.description}
                  style={{
                    height: "280px",
                    objectFit: "contain",
                    padding: "10px"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="card-title">
                    {product.isDynamic
                      ? product.backendProduct.brand
                      : "Highlander"}
                  </h5>

                  <p className="card-text">
                    {product.description}
                  </p>

                  <p>
                    Brand: {product.isDynamic
                      ? product.backendProduct.brand
                      : "Highlander"}
                  </p>

                  <p>Category: Polo T-Shirt</p>

                  <label>
                    <b>Select Size:</b>
                  </label>

                  <select
                    className="form-select mt-2"
                    value={selectedSizes[index] || ""}
                    onChange={(e) =>
                      setSelectedSizes(prev => ({
                        ...prev,
                        [index]: e.target.value
                      }))
                    }
                  >

                    <option value="">
                      Choose Size
                    </option>

                    {["S", "M", "L", "XL"].map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}

                  </select>

                  <p className="mt-2">
                    Stock: Available
                  </p>

                  <h6 className="Price">
                    ₹{product.price}
                  </h6>

                  <div className="d-flex gap-2 mt-3">

                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() =>
                        handleAddToCart(product, index)
                      }
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

          ))}

        </div>
      </div>

    </div>
  );
}

export default PoloTshirt;
