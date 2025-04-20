import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6
import axios from "axios"; // Import axios for API requests
import "./styles.css"; // Importing normal CSS file

const API_BASE_URL = process.env.REACT_APP_API_URL;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role is "buyer"
  const [error, setError] = useState(""); // To store error message if signup fails
  const navigate = useNavigate(); // useNavigate hook

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(); // Use FormData to send data as form fields
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for form data
        },
      });
      // On success, navigate to login page (or another success action)
      console.log(response.data);
      navigate("/login"); // Navigate to the login page after successful signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "Something went wrong.");
    }
  };

  return (
    <div className="wrapper">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>

      {/* Home Page Button */}
      <button
        onClick={() => navigate("/")}
        className="home-btn"
        style={{ marginTop: "1rem" }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Signup;
