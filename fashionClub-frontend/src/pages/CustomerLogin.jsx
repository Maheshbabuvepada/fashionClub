
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/customers/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailId: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Save customer details
            localStorage.setItem(
                "customer",
                JSON.stringify(data)
            );

            alert("Login successful!");

            navigate("/");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <div className="card shadow p-4">

                <h2
                    className="text-center"
                    style={{ color: "#73090A" }}
                >
                    Customer Login
                </h2>

                <form onSubmit={handleLogin}>

                    <label>Email ID</label>

                    <input
                        type="email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                    {error && (
                        <p className="text-danger">
                            {error}
                        </p>
                    )}

                    <button
                        className="btn btn-dark w-100"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/registration">
                        Register
                    </Link>
                </p>

                <p className="text-center">
                    <Link to="/login">
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default CustomerLogin;
