
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext();

const API = "http://localhost:8080";

function getProductKey(product) {
  return `${product.productId}-${product.size || "default"}`;
}

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // LOAD CART FROM DATABASE
  async function loadCart() {

    const customer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );

    if (!customer?.customerId) {
      setCartItems([]);
      return;
    }

    try {

      const [cartResponse, productResponse] = await Promise.all([
        fetch(`${API}/carts/customer/${customer.customerId}`),
        fetch(`${API}/products`)
      ]);

      if (!cartResponse.ok || !productResponse.ok) {
        throw new Error("Unable to load cart");
      }

      const carts = await cartResponse.json();
      const products = await productResponse.json();

      const merged = carts
        .filter(cart => cart.productId != null)
        .map(cart => {

          const product = products.find(
            p => Number(p.productId) === Number(cart.productId)
          );

          return {
            ...product,
            ...cart,

            cartId: cart.cartId,
            productId: cart.productId,

            name: product?.productName || "Product",
            productName: product?.productName || "Product",

            price: cart.unitPrice,
            unitPrice: cart.unitPrice,

            image: product?.image || "",

            brand: product?.brand || "",
            category: product?.category || "",
            description: product?.description || "",

            size: cart.size || "default",
            quantity: cart.quantity,

            cartKey: getProductKey(cart)
          };
        });

      setCartItems(merged);

    } catch (error) {

      console.error("Cart loading error:", error);

    }
  }

  // LOAD CART WHEN PROVIDER STARTS
  useEffect(() => {
    loadCart();
  }, []);

  // ADD PRODUCT TO CART
  async function addToCart(product) {

    const customer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );

    if (!customer?.customerId) {
      alert("Please login to add products to cart");
      return false;
    }

    if (product.productId == null) {
      alert("Product ID is missing");
      return false;
    }

    try {

      const response = await fetch(`${API}/carts`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          customerId: customer.customerId,

          productId: product.productId,

          quantity: 1,

          unitPrice: Number(
            String(product.price).replace(/[₹,\s]/g, "")
          ),

          size: product.size || "default"

        })

      });

      if (!response.ok) {
        throw new Error("Unable to add product");
      }

      await loadCart();

      return true;

    } catch (error) {

      console.error("Add to cart error:", error);

      alert("Unable to add product to cart");

      return false;

    }
  }

  // UPDATE QUANTITY
  async function updateQuantity(cartId, quantity) {

    if (quantity < 1) return false;

    try {

      const response = await fetch(
        `${API}/carts/${cartId}?quantity=${quantity}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update quantity");
      }

      await loadCart();

      return true;

    } catch (error) {

      console.error(error);

      alert("Unable to update quantity");

      return false;

    }
  }

  // REMOVE PRODUCT
  async function removeFromCart(cartKey) {

    const item = cartItems.find(
      p => p.cartKey === cartKey
    );

    if (!item?.cartId) return false;

    try {

      const response = await fetch(
        `${API}/carts/${item.cartId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete product");
      }

      await loadCart();

      return true;

    } catch (error) {

      console.error(error);

      alert("Unable to remove product");

      return false;

    }
  }

  // CLEAR CART AFTER CHECKOUT
  async function clearCart() {

    const customer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );

    if (!customer?.customerId) {
      setCartItems([]);
      return;
    }

    try {

      const response = await fetch(
        `${API}/carts/customer/${customer.customerId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Unable to clear cart");
      }

      setCartItems([]);

    } catch (error) {

      console.error(error);

      throw error;

    }
  }

  return (

    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loadCart
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export function useCart() {
  return useContext(CartContext);
}
