import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

// API_BASE_URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("email", email);

        const role = response.data.user?.role;
        if (role === "seller") {
          navigate("/dashboard");
        } else if (role === "buyer") {
          navigate("/shop");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>

      {/* Home Button */}
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

export default Login;
