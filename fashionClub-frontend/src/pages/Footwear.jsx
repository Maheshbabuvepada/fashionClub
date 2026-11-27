
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

const productImages = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  if (!fileName) return "";

  const image = Object.entries(productImages).find(([path]) => {
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

// Existing Footwear products
const products = [
  { brand: "Soleplay", name: "soleplay brown typographic pool slides.", image: "SOLE-PLAY[F-Brown-3].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Blue typographic pool slides.", image: "SOLE-PLAY[F-Blue-1].avif", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Green typographic pool slides.", image: "SOLE-PLAY[F-Green-2].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay White Text-printed pool slides.", image: "SOLE-PLAY[F-white-4].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay olive sports slides.", image: "SOLE-PLAY[F-Green-5].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Taupe sports slides.", image: "SOLE-PLAY[F-Bisque-6].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay White Text-printed pool slides.", image: "SOLE-PLAY[F-Black-7].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay olive sports slides.", image: "SOLE-PLAY[F-Bisque-8].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Taupe sports slides.", image: "SOLE-PLAY[F-Brown-9].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay White Text-printed pool slides.", image: "SOLE-PLAY[F-Black-10].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay olive sports slides.", image: "SOLE-PLAY[F-light brown-11].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Taupe sports slides.", image: "SOLE-PLAY[F-Black-12].webp", price: "599.00" },
  { brand: "Soleplay", name: "soleplay Black Dual-strap slip-on suede sandals.", image: "SOLE-PLAY[F-two belt-Black-13].webp", price: "1000.00" },
  { brand: "Soleplay", name: "soleplay Ivory Buckle-detailed Slides.", image: "SOLE-PLAY[F-two belt-bisque-14].webp", price: "499.00" },
  { brand: "Soleplay", name: "soleplay Dark Brown Buckle-Detailed Slip-on Sandals.", image: "SOLE-PLAY[F-two belt-Brown-15].webp", price: "499.00" },

  { brand: "US-Polo", name: "Men Open Toe Slip-On Flip-Flops.", image: "US-POLO[F-Black-16].avif", price: "799" },
  { brand: "US-Polo", name: "Men Open Toe Slip-On Flip-Flops.", image: "US-POLO[F-White-17].avif", price: "799" },
  { brand: "US-Polo", name: "Men Open Toe Slip-On Flip-Flops.", image: "US-POLO[F-Blue-18].avif", price: "799" },

  { brand: "Jack & Jones", name: "Men Logo Branded Sliders.", image: "JACK-JONES[F-Black-19].avif", price: "1200.00" },
  { brand: "Jack & Jones", name: "Men Logo Branded Sliders.", image: "JACK-JONES[F-White-20].avif", price: "1200.00" },
  { brand: "Jack & Jones", name: "Men Logo Branded Sliders.", image: "JACK-JONES[F-Mixed-21].avif", price: "1200.00" },

  { brand: "Puma", name: "T-Strap with Synthetic upper.", image: "PUMA[F-Black-22].avif", price: "3000.00" },
  { brand: "Puma", name: "BMW M Motorsport Softride seave Youth Flip-Flops.", image: "PUMA[F-White-23].avif", price: "1499.00" },
  { brand: "Puma", name: "Softride Seave Xpress Men's Flip-Flops.", image: "PUMA[F-Green-24].avif", price: "2099.00" },
  { brand: "Puma", name: "Softride Youth Slides.", image: "PUMA[F-Yellow-25].avif", price: "1999.00" },
  { brand: "Puma", name: "Slip-On Palermo Slides.", image: "PUMA[F-White-Blue-Brown-26].avif", price: "1999.00" },
  { brand: "Puma", name: "Softrideslide Super Youth Slip-On Sliders.", image: "PUMA[F-Black-beige-27].avif", price: "1999.00" },

  { brand: "CROCS", name: "Men Crocband Crocslite Clogs.", image: "CROCS[F-Black-28].avif", price: "1503.00" },
  { brand: "CROCS", name: "Baya Platfrom-Heeled Sandals.", image: "CROCS[F-White-29].avif", price: "1500.00" },
  { brand: "CROCS", name: "Men Bayaband Clogs", image: "CROCS[F-Blue-30].avif", price: "2407.00" },
];

function Footwear() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [backendProducts, setBackendProducts] = useState([]);

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  // Load products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const data = await response.json();
        setBackendProducts(data);
      } catch (error) {
        console.error("Product loading error:", error);
      }
    }

    loadProducts();
  }, []);

  // Admin products belonging only to Footwear
  const adminProducts = backendProducts.filter((product) => {
    const correctCategory =
      normalizeCategory(product.category) ===
      normalizeCategory("Footwear");

    const hasImage = product.image && product.image.trim() !== "";

    const alreadyExists = products.some(
      (staticProduct) =>
        staticProduct.image.trim().toLowerCase() ===
        (product.image || "").trim().toLowerCase()
    );

    return correctCategory && hasImage && !alreadyExists;
  });

  // Add existing static product to cart
  async function handleAddToCart(product, index, buyNow = false) {
    const selectedSize = selectedSizes[`static-${index}`];

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const imageName = product.image.trim().toLowerCase();

    const backendProduct = backendProducts.find(
      (item) =>
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
      productName: backendProduct.productName || product.brand,
      name: backendProduct.productName || product.brand,
      description: product.name,
      brand: backendProduct.brand || product.brand,
      category: backendProduct.category || "Footwear",
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
  }

  // Add Admin product to cart
  async function handleAdminAddToCart(product, index, buyNow = false) {
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
  }

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
            FOOTWEAR
          </span>
        </b>
      </h5>

      <br />

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {/* Existing 30 Footwear products */}
          {products.map((product, index) => (
            <div className="col" key={`static-${index}`}>
              <div className="card h-100">

                <img
                  src={getImage(product.image)}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "280px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />

                <div className="card-body">

                  <h5 className="card-title text-center">
                    {product.brand}
                  </h5>

                  <p className="card-text text-center">
                    {product.name}
                  </p>

                  <p>
                    <b>Brand:</b> {product.brand}<br />
                    <b>Category:</b> Footwear
                  </p>

                  <div className="mb-3">
                    <label className="form-label">
                      <b>Select Size:</b>
                    </label>

                    <select
                      className="form-select"
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
                  </div>

                  <h5 className="Price">
                    ₹{product.price}
                  </h5>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() => handleAddToCart(product, index)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-dark flex-fill"
                      onClick={() => handleAddToCart(product, index, true)}
                    >
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Admin-added Footwear products */}
          {adminProducts.map((product, index) => (
            <div className="col" key={`admin-${product.productId}`}>
              <div className="card h-100">

                <img
                  src={`${API}/images/${encodeURIComponent(product.image)}`}
                  className="card-img-top"
                  alt={product.productName}
                  style={{
                    height: "280px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />

                <div className="card-body">

                  <h5 className="card-title text-center">
                    {product.brand}
                  </h5>

                  <p className="card-text text-center">
                    {product.productName}
                  </p>

                  <p>
                    <b>Brand:</b> {product.brand}<br />
                    <b>Category:</b> {product.category}
                  </p>

                  <div className="mb-3">
                    <label className="form-label">
                      <b>Select Size:</b>
                    </label>

                    <select
                      className="form-select"
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
                  </div>

                  <h5 className="Price">
                    ₹{Number(product.price).toFixed(2)}
                  </h5>

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
                      className="btn btn-dark flex-fill"
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

    </div>
  );
}

export default Footwear;
