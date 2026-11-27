
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const loggedInCustomer = JSON.parse(
    localStorage.getItem("customer") || "null"
  );

  const [customer, setCustomer] = useState({
    name: loggedInCustomer
      ? `${loggedInCustomer.firstName || ""} ${loggedInCustomer.lastName || ""}`.trim()
      : "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  function getPrice(item) {
    return Number(item.price ?? item.unitPrice ?? 0);
  }

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + getPrice(item) * item.quantity,
    0
  );

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const currentCustomer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );

    if (!currentCustomer?.customerId) {
      alert("Please login first");
      navigate("/customer-login");
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      alert("Please fill all details");
      return;
    }

    const orderData = {
      order: {
        customerId: currentCustomer.customerId,
        orderDate: new Date().toISOString().split("T")[0],
        totalAmount,
        shippingAddress:
          `${customer.name}, ${customer.phone}, ${customer.address}`,
        orderStatus: "pending",
        paymentStatus: "pending"
      },

      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: getPrice(item),
        subTotal: getPrice(item) * item.quantity
      }))
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/orders/with-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );

      if (!response.ok) {
        throw new Error("Order failed");
      }

      const savedOrder = await response.json();

      await clearCart();

      alert(
        `Order placed successfully! Order ID: ${savedOrder.orderId}`
      );

      navigate("/");

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to place order. Please try again.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-5">

      <h2 className="text-center mb-4">
        Checkout
      </h2>

      <div className="row">

        {/* Customer Details */}
        <div className="col-md-6">

          <div className="card p-4">

            <h4>Customer Details</h4>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                className="form-control mb-3"
                placeholder="Shipping Address"
                rows="4"
                value={customer.address}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

            </form>

          </div>

        </div>

        {/* Order Summary */}
        <div className="col-md-6">

          <div className="card p-4">

            <h4>Order Summary</h4>

            {cartItems.map(item => (

              <div
                key={item.cartId}
                className="d-flex justify-content-between mb-3"
              >

                <span>
                  {item.name || item.productName}
                  {" "}({item.size}) × {item.quantity}
                </span>

                <span>
                  ₹{getPrice(item) * item.quantity}
                </span>

              </div>

            ))}

            <hr />

            <h5 className="text-end">
              Total: ₹{totalAmount}
            </h5>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
