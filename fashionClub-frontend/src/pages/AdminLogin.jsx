
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
       sessionStorage.setItem("adminLoggedIn", "true");
         alert("Admin Login Successful!");
          navigate("/admin-dashboard");
      }
      else {
        alert(data.message || "Invalid username or password");
      }

    } catch (error) {
      console.error("Admin Login Error:", error);
      alert("Unable to connect to backend");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center" style={{ color: "#73090A" }}>
          Admin Login
        </h2>

        <p className="text-center text-muted">
          Fashion Club Administration
        </p>

        <form onSubmit={handleLogin}>
          <label>Admin Username</label>
          <input
            type="text"
            className="form-control mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
