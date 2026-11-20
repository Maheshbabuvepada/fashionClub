
import { useState } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    num: "",
    mail: "",
    pwd: "",
    cpwd: "",
    dob: "",
    gender: "",
    ad: "",
    ct: "",
    st: "",
    pc: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm(e) {
    e.preventDefault();

    let newErrors = {};

    // First Name
    if (formData.fn.trim() === "") {
      newErrors.fn = "Please enter firstname";
    }

    // Last Name
    if (formData.ln.trim() === "") {
      newErrors.ln = "Please enter lastname";
    }

    // Phone Number
    if (formData.num === "") {
      newErrors.num = "Please enter phone number";
    } else if (formData.num.length !== 10) {
      newErrors.num = "Phone number must contain 10 digits";
    }

    // Email
    if (formData.mail.trim() === "") {
      newErrors.mail = "Please enter email";
    }

    // Password
    if (formData.pwd === "") {
      newErrors.pwd = "Please enter password";
    }

    // Confirm Password
    if (formData.cpwd === "") {
      newErrors.cpwd = "Please confirm password";
    } else if (formData.pwd !== formData.cpwd) {
      newErrors.cpwd = "Passwords do not match";
    }

    // Date of Birth
    if (formData.dob === "") {
      newErrors.dob = "Please select date of birth";
    }

    // Gender
    if (formData.gender === "") {
      newErrors.gender = "Please select gender";
    }

    // Address
    if (formData.ad.trim() === "") {
      newErrors.ad = "Please enter address";
    }

    // City
    if (formData.ct.trim() === "") {
      newErrors.ct = "Please enter city";
    }

    // State
    if (formData.st.trim() === "") {
      newErrors.st = "Please enter state";
    }

    // Pincode
    if (formData.pc === "") {
      newErrors.pc = "Please enter pincode";
    } else if (formData.pc.length !== 6) {
      newErrors.pc = "Pincode must contain 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registration successful!");
    }
  }

  return (
    <div className="body">
      <style>{`
        .registration-form {
          width: 500px;
          max-width: 100%;
          margin: auto;
        }

        .registration-form fieldset {
          border: 2px solid darkred;
          padding: 10px;
          border-radius: 20px;
        }

        .registration-form legend {
          color: darkred;
          font-size: 20px;
          font-weight: bold;
        }

        .registration-form label {
          font-weight: bold;
        }

        .registration-form input:not([type="radio"]):not([type="submit"]) {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          margin-bottom: 10px;
        }

        .registration-form input[type="radio"] {
          width: auto;
          margin-right: 5px;
        }

        .registration-form .error {
          color: black;
          font-size: 14px;
          font-weight: normal;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <img src="/logo.png" className="logo" alt="Fashion Club Logo" />

        <div className="title">
          <h1>FASHION CLUB</h1>
          <p>Only for mens wear</p>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Registration Form */}
      <form className="registration-form" onSubmit={validateForm}>
        <fieldset>
          <legend className="text-center">Registration Form</legend>

          <label style={{ color: "brown" }}>Firstname :</label>
          <input type="text" name="fn" value={formData.fn} onChange={handleChange} />
          <span className="error">{errors.fn}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Lastname :</label>
          <input type="text" name="ln" value={formData.ln} onChange={handleChange} />
          <span className="error">{errors.ln}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Phone Number :</label>
          <input type="tel" maxLength="10" name="num" value={formData.num} onChange={handleChange} />
          <span className="error">{errors.num}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Email ID :</label>
          <input type="email" name="mail" value={formData.mail} onChange={handleChange} />
          <span className="error">{errors.mail}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Password :</label>
          <input type="password" name="pwd" value={formData.pwd} onChange={handleChange} />
          <span className="error">{errors.pwd}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Confirm Password :</label>
          <input type="password" name="cpwd" value={formData.cpwd} onChange={handleChange} />
          <span className="error">{errors.cpwd}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Date of Birth :</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <span className="error">{errors.dob}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Gender :</label>
          <br />

          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="others"
            name="gender"
            value="Others"
            checked={formData.gender === "Others"}
            onChange={handleChange}
          />
          <label htmlFor="others">Others</label>

          <br />
          <span className="error">{errors.gender}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Address :</label>
          <input type="text" name="ad" value={formData.ad} onChange={handleChange} />
          <span className="error">{errors.ad}</span>
          <br /><br />

          <label style={{ color: "brown" }}>City :</label>
          <input type="text" name="ct" value={formData.ct} onChange={handleChange} />
          <span className="error">{errors.ct}</span>
          <br /><br />

          <label style={{ color: "brown" }}>State :</label>
          <input type="text" name="st" value={formData.st} onChange={handleChange} />
          <span className="error">{errors.st}</span>
          <br /><br />

          <label style={{ color: "brown" }}>Pincode :</label>
          <input type="text" maxLength="6" name="pc" value={formData.pc} onChange={handleChange} />
          <span className="error">{errors.pc}</span>
          <br /><br />

          <button type="submit" className="btn btn-danger">
            Register
          </button>
        </fieldset>
      </form>

      <br /><br />
    </div>
  );
}

export default Registration;