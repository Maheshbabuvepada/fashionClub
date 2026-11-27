
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/CartContext";

import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footwear from "./pages/Footwear";
import Jeans from "./pages/Jeans";
import LeninShirts from "./pages/LeninShirts";
import PoloTshirt from "./pages/PoloTshirt";
import Sneakers from "./pages/Sneakers";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CustomerLogin from "./pages/CustomerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footwear" element={<Footwear />} />
          <Route path="/jeans" element={<Jeans />} />
          <Route path="/lenin-shirts" element={<LeninShirts />} />
          <Route path="/polo-tshirt" element={<PoloTshirt />} />
          <Route path="/sneakers" element={<Sneakers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-products" element={<AdminProducts />} />
          <Route path="/admin-add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
