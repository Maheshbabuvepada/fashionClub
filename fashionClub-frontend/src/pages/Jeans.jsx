
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

function normalizeCategory(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[\s_-]/g, "")
    .replace(/s$/, "");
}

// Existing 12 Jeans products
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
  const [selectedSizes, setSelectedSizes] = useState({});
  const [backendProducts, setBackendProducts] = useState([]);

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  // Load backend products
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

  // Only Admin products belonging to Jeans category
  const adminProducts = backendProducts.filter((product) => {
    const correctCategory =
      normalizeCategory(product.category) === normalizeCategory("Jeans");

    const hasImage = product.image && product.image.trim() !== "";

    const alreadyExists = products.some((staticProduct) =>
      staticProduct.images.some(
        (image) =>
          image.trim().toLowerCase() ===
          (product.image || "").trim().toLowerCase()
      )
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

    const imageName = product.images[0].trim().toLowerCase();

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
      productName: backendProduct.productName || product.name,
      name: backendProduct.productName || product.name,
      description: product.description,
      brand: backendProduct.brand || product.name,
      category: backendProduct.category || "Jeans",
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
            JEANS
          </span>
        </b>
      </h5>

      <br />

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">

          {/* Existing static Jeans products */}
          {products.map((product, index) => (
            <div className="col" key={`static-${index}`}>
              <div className="card h-100">
                <div className="card-body">

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

                  <h5 className="card-title text-center mt-3">
                    {product.name}
                  </h5>

                  <p className="card-text">{product.description}</p>

                  <div className="mt-3">
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

                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <br />

                  <h5 className="Price">{product.price}</h5>

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

          {/* Admin-added Jeans products */}
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

                  <h5 className="Price">
                    ₹{Number(product.price).toFixed(2)}
                  </h5>

                  <div className="mt-3">
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

                      {["28", "30", "32", "34", "36"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

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
    </>
  );
}

export default Jeans;
