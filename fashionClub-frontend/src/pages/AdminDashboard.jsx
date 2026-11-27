
import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../MyStyle.css";

function AdminDashboard() {
  const navigate = useNavigate();

  if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Fashion Club - Admin</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="admin-content">
        <h2>Welcome Admin!</h2>
        <p>Manage your Fashion Club website here.</p>

        <div className="admin-options">

          <div className="admin-card">
            <h3>Products</h3>
            <p>Manage all products</p>
            <Link to="/admin-products">View Products</Link>
          </div>

          <div className="admin-card">
            <h3>Add Product</h3>
            <p>Add new products to Fashion Club</p>
            <Link to="/admin-add-product">Add New Product</Link>
          </div>

          <div className="admin-card">
            <h3>Orders</h3>
            <p>View customer orders</p>
            <Link to="/admin-orders">View Orders</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
