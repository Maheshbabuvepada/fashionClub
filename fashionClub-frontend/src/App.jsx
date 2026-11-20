import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;