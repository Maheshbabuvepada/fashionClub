import React from "react";

const productImages = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImage(fileName) {
  const image = Object.entries(productImages).find(([path]) => {
    return decodeURIComponent(path.split("/").pop()) === fileName;
  });

  return image ? image[1] : "";
}

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
            SLIDES
          </span>
        </b>
      </h5>

      <br />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              <img
                src={getImage(product.image)}
                className="card-img-top"
                alt={product.brand}
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
                  <b>Category:</b> Footwear<br />
                  <b>Size:</b> 7, 8, 9, 10<br />
                  <b>Stock:</b> Available
                </p>

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
  );
}

export default Footwear;