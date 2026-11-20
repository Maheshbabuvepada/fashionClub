import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  return (
    <div
      className="body"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="header">
        <img src={logo} className="logo" alt="Fashion Club Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={{ color: "#73090A" }}><b>Home</b></Link>
        </li>

        <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle" style={{ color: "#73090A" }} data-bs-toggle="dropdown"> <b>Men</b></button>

          <div className="dropdown-menu p-4">
            <div className="row">
              <div className="col">
                <h6> <b>TOPWEAR</b></h6>
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

        <li className="nav-item">
          <Link className="nav-link active"to="/login"style={{ color: "#73090A" }}><b>Login</b></Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about" style={{ color: "#73090A" }}><b>About</b></Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact" style={{ color: "#73090A" }}><b>Contact</b></Link>
        </li>
      </ul><br />

      <h5 className="text-center">
        <b> <span style={{ color: "#73090A", fontFamily: "Garamond" }}> LOGIN</span></b>
      </h5>

      <h6 className="text-center">
        <b> <span style={{ fontFamily: "Garamond" }}>Select Your Role</span></b>
      </h6><br /><br />

      <div className="container">
        <div className="row justify-content-center g-4">
          {/* Customer Card */}
          <div className="col-md-4">
            <div className="card text-center shadow p-4">
              <div className="card-body">
                <h3 className="card-title">👤 Customer Login</h3>

                <p className="card-text">
                  Login as a customer to shop
                  <br />
                  and manage your orders.
                </p>

                <Link to="/customer-login" className="btn btn-primary">
                  Continue
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Card */}
          <div className="col-md-4">
            <div className="card text-center shadow p-4">
              <div className="card-body">
                <h3 className="card-title">🧑🏻‍💼 Admin Login</h3>

                <p className="card-text"> Login as admin to manage products, <br />orders and employees.</p>

                <Link to="/admin-login" className="btn btn-success"> Continue</Link>
              </div>
            </div>
          </div>
        </div>
      </div><br /><br />

      <p className="text-center"> Don't have an account? <Link to="/registration">Register</Link></p>
    </div>
  );
}

export default Login;
