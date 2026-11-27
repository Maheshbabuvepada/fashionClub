
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fn: "", ln: "", num: "", mail: "",
    pwd: "", cpwd: "", dob: "", gender: "",
    ad: "", ct: "", st: "", pc: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function validateForm(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fn.trim()) newErrors.fn = "Please enter firstname";
    if (!formData.ln.trim()) newErrors.ln = "Please enter lastname";
    if (!/^\d{10}$/.test(formData.num)) newErrors.num = "Enter valid 10 digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) newErrors.mail = "Enter valid email";
    if (formData.pwd.length < 6) newErrors.pwd = "Password must contain at least 6 characters";
    if (!formData.cpwd) newErrors.cpwd = "Please confirm password";
    else if (formData.pwd !== formData.cpwd) newErrors.cpwd = "Passwords do not match";
    if (!formData.dob) newErrors.dob = "Please select date of birth";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.ad.trim()) newErrors.ad = "Please enter address";
    if (!formData.ct.trim()) newErrors.ct = "Please enter city";
    if (!formData.st.trim()) newErrors.st = "Please enter state";
    if (!/^\d{6}$/.test(formData.pc)) newErrors.pc = "Enter valid 6 digit pincode";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const customer = {
      firstName: formData.fn.trim(),
      lastName: formData.ln.trim(),
      phoneNumber: Number(formData.num),
      emailId: formData.mail.trim().toLowerCase(),
      password: formData.pwd,
      dateOfBirth: formData.dob,
      gender: formData.gender,
      address: formData.ad.trim(),
      city: formData.ct.trim(),
      state: formData.st.trim(),
      pincode: formData.pc
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      alert(error.message || "Unable to register. Check backend connection.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <style>{`
        .registration-form {
          width: 500px;
          max-width: 95%;
          margin: auto;
        }
        .registration-form fieldset {
          border: 2px solid darkred;
          padding: 15px;
          border-radius: 20px;
          background: white;
        }
        .registration-form legend {
          color: darkred;
          font-size: 20px;
          font-weight: bold;
        }
        .registration-form label {
          font-weight: bold;
          color: brown;
        }
        .registration-form input:not([type="radio"]) {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          margin-bottom: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .registration-form input[type="radio"] {
          width: auto;
          margin: 8px;
        }
        .registration-form .error {
          color: red;
          font-size: 13px;
          display: block;
        }
        .registration-form button {
          width: auto !important;
          height: auto !important;
          padding: 9px 22px;
        }
      `}</style>

      <div className="header">
        <img src="/logo.png" className="logo" alt="Fashion Club Logo" />
        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={{ color: "#73090A" }}>
            <b>Home</b>
          </Link>
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
          <Link className="nav-link active" to="/registration" style={{ color: "#73090A" }}>
            <b>Registration</b>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" style={{ color: "#73090A" }}>
            <b>Login</b>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about" style={{ color: "#73090A" }}>
            <b>About</b>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact" style={{ color: "#73090A" }}>
            <b>Contact</b>
          </Link>
        </li>
      </ul>

      <br /><br />

      <form className="registration-form" onSubmit={validateForm}>
        <fieldset>
          <legend className="text-center">Registration Form</legend>

          <label>Firstname :</label>
          <input type="text" name="fn" value={formData.fn} onChange={handleChange} />
          <span className="error">{errors.fn}</span><br />

          <label>Lastname :</label>
          <input type="text" name="ln" value={formData.ln} onChange={handleChange} />
          <span className="error">{errors.ln}</span><br />

          <label>Phone Number :</label>
          <input type="tel" maxLength="10" name="num" value={formData.num} onChange={handleChange} />
          <span className="error">{errors.num}</span><br />

          <label>Email ID :</label>
          <input type="email" name="mail" value={formData.mail} onChange={handleChange} />
          <span className="error">{errors.mail}</span><br />

          <label>Password :</label>
          <input type="password" name="pwd" value={formData.pwd} onChange={handleChange} />
          <span className="error">{errors.pwd}</span><br />

          <label>Confirm Password :</label>
          <input type="password" name="cpwd" value={formData.cpwd} onChange={handleChange} />
          <span className="error">{errors.cpwd}</span><br />

          <label>Date of Birth :</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <span className="error">{errors.dob}</span><br />

          <label>Gender :</label><br />
          <input
            type="radio" id="male" name="gender" value="Male"
            checked={formData.gender === "Male"} onChange={handleChange}
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio" id="others" name="gender" value="Others"
            checked={formData.gender === "Others"} onChange={handleChange}
          />
          <label htmlFor="others">Others</label>
          <span className="error">{errors.gender}</span><br />

          <label>Address :</label>
          <input type="text" name="ad" value={formData.ad} onChange={handleChange} />
          <span className="error">{errors.ad}</span><br />

          <label>City :</label>
          <input type="text" name="ct" value={formData.ct} onChange={handleChange} />
          <span className="error">{errors.ct}</span><br />

          <label>State :</label>
          <input type="text" name="st" value={formData.st} onChange={handleChange} />
          <span className="error">{errors.st}</span><br />

          <label>Pincode :</label>
          <input type="text" maxLength="6" name="pc" value={formData.pc} onChange={handleChange} />
          <span className="error">{errors.pc}</span><br /><br />

          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </fieldset>
      </form>
      <br /><br />
    </div>
  );
}

export default Registration;
