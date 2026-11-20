
import { Link } from "react-router-dom";

const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  const imagePath = `../assets/${fileName}`;
  return images[imagePath];
}

const products = [
  {
    image: "Highlander[T-Blue-1].webp",
    description: "Highlander Navy Striped Relaxed-Fit Cotton polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-Blue-2].webp",
    description: "Highlander Emrald Green Relaxed-Fit Cotton-Blend polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-Blue-3].webp",
    description: "Highlander Emrald Navy-Blue Blocked-Relaxed-Fit polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-Brownwhite-4].webp",
    description: "Highlander Brown Relaxed-Fit Cotton-Blend polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-Blue-5].webp",
    description: "Highlander Navy Textured Relaxed-Fit polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-White-6].webp",
    description: "Highlander White Textured Relaxed-Fit polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-SeaGreen-7].webp",
    description: "Highlander Sage Textured Relaxed-Fit polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-White-8].webp",
    description: "Highlander Off-White Self-Striped Slim-Fit Cotton-Blend polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-DarkGreen-9].webp",
    description: "Highlander Green Solid Relaxed-Fit Cotton polo T-shirt.",
    price: "699.00",
  },
  {
    image: "Highlander[T-Blue-10].webp",
    description: "Highlander Navy Solid Relaxed-Fit Cotton polo T-shirt.",
    price: "699.00",
  },
  {
    image: "Highlander[T-Purple-11].webp",
    description: "Highlander Lilac Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-IceBlue-12].webp",
    description: "Highlander Light Blue Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "450.00",
  },
  {
    image: "Highlander[T-Beige-13].webp",
    description: "Highlander White Textured Relaxed-Fit Polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-Brown-14].webp",
    description: "Highlander Dark Brown Relaxed-Fit Quarter-Zip Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Blue-15].webp",
    description: "Highlander Navy Knit-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-LightGreen-16].webp",
    description: "Highlander Self-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "499.00",
  },
  {
    image: "Highlander[T-White-17].webp",
    description: "Highland Off-White Knit-Textured Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Black-18].webp",
    description: "Highlander Black Text-Detail Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-BlueWhite-19].webp",
    description: "Highlander Off-White Striped Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-CremeLightGreen-20].webp",
    description: "Highlander Teal-Striped Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Creme-21].webp",
    description: "Highlander Green Checkered Relaxed-Fit Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Black-22].webp",
    description: "Highlander Black Text-Design OverSized-Fit Cotton Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Creme-23].webp",
    description: "Highlander Taupe Color-Blocked Relaxed-Fit Cotton Polo T-shirt.",
    price: "599.00",
  },
  {
    image: "Highlander[T-Black-24].webp",
    description: "Highlander Black Striped Relaxed-Fit Cotton-Blend Polo T-shirt.",
    price: "599.00",
  },
];

function PoloTshirt() {
  return (
    <div>
      <div className="header">
        <img src={getImage("logo.png")} className="logo" alt="Fashion Club Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={{ color: "#73090A" }}>
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

        <a href="/login" className="login-icon" title="Login">
          <i className="bi bi-person-circle"></i>
        </a>

        <li className="nav-item">
          <Link className="nav-link" to="/about" style={{ color: "#73090A" }}>
            <b>About</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact" style={{ color: "#73090A" }}>
            <b>Contact</b>
          </Link>
        </li>
      </ul>

      <br />

      <h5 className="text-center">
        <b>
          <span style={{ color: "#73090A", fontFamily: "Garamond" }}>
            POLO T-SHIRTS
          </span>
        </b>
      </h5>

      <br />

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img
                  src={getImage(product.image)}
                  className="card-img-top"
                  alt="Highlander Polo T-shirt"
                />

                <div className="card-body text-center">
                  <h5 className="card-title">Highlander</h5>

                  <p className="card-text">{product.description}</p>

                  <p>Brand: Highlander</p>
                  <p>Category: Polo T-Shirt</p>
                  <p>Size: S, M, L, XL</p>
                  <p>Stock: Available</p>

                  <span className="Price">₹{product.price}</span>
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
    </div>
  );
}

export default PoloTshirt;
