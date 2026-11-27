
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const imageFiles = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default"
});

function getImage(fileName) {
  if (!fileName) return "";

  const cleanName = decodeURIComponent(
    String(fileName).replace(/\\/g, "/").split("/").pop()
  ).trim();

  const found = Object.entries(imageFiles).find(([path]) => {
    const assetName = decodeURIComponent(
      path.split("/").pop()
    ).trim();

    return assetName.toLowerCase() === cleanName.toLowerCase();
  });

  if (found) {
    return found[1];
  }

  return `http://localhost:8080/images/${encodeURIComponent(cleanName)}`;
}

function getPrice(price) {
  return Number(String(price || 0).replace(/[₹,\s]/g, ""));
}

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity
  } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      getPrice(item.price ?? item.unitPrice) *
      Number(item.quantity || 0),
    0
  );

  return (
    <div className="container my-5">

      <h2 className="text-center mb-4">My Cart</h2>

      {cartItems.length === 0 ? (

        <div className="text-center py-5">
          <h4>Your Cart is Empty</h4>

          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

      ) : (

        <>

          {cartItems.map((item) => {

            const price = getPrice(
              item.price ?? item.unitPrice
            );

            const imageName = item.image || item.productImage;

            return (

              <div
                className="card mb-3 p-3"
                key={item.cartId}
              >

                <div className="row align-items-center">

                  {/* Product Image */}
                  <div className="col-md-2 text-center">

                    {imageName ? (
                      <img
                        src={getImage(imageName)}
                        alt={item.name || item.productName}
                        className="img-fluid"
                        style={{
                          height: "130px",
                          width: "100%",
                          objectFit: "contain"
                        }}
                        onError={(e) => {
                          const img = e.currentTarget;

                          if (!img.dataset.fallback) {
                            img.dataset.fallback = "true";

                            img.src =
                              `http://localhost:8080/${encodeURIComponent(
                                String(imageName).replace(/^\/+/, "")
                              )}`;
                          } else {
                            img.style.display = "none";
                          }
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "130px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f5f5f5"
                        }}
                      >
                        No Image
                      </div>
                    )}

                  </div>

                  {/* Product Details */}
                  <div className="col-md-4">

                    <h5>
                      {item.name || item.productName}
                    </h5>

                    <p className="mb-1">
                      Brand: {item.brand || "-"}
                    </p>

                    <p className="mb-1">
                      Category: {item.category || "-"}
                    </p>

                    <p className="mb-1">
                      Size: {item.size || "-"}
                    </p>

                    <p className="mb-1">
                      Price: ₹{price}
                    </p>

                  </div>

                  {/* Quantity */}
                  <div className="col-md-3">

                    <div className="d-flex align-items-center gap-3">

                      <button
                        className="btn btn-outline-dark"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span className="fw-bold">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-dark"
                        disabled={
                          item.stock != null &&
                          item.quantity >= item.stock
                        }
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* Subtotal */}
                  <div className="col-md-2">

                    <h6>
                      ₹{price * item.quantity}
                    </h6>

                  </div>

                  {/* Delete */}
                  <div className="col-md-1">

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeFromCart(item.cartKey)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            );
          })}

          {/* Total */}
          <div className="text-end mt-4">

            <h4 className="mb-4">
              Total Amount: ₹{totalAmount}
            </h4>

            <button
              className="btn btn-outline-dark me-2"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              className="btn btn-dark"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;
