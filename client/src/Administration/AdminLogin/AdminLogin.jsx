// AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminLogin.module.css"; // Import the CSS module
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jazleen-backend.onrender.com/api/adminlogin/",
        {
          username,
          password,
        }
      );
      if (response.data.status === "success") {
        alert("Login successful");
        navigate("/admin-dashboard");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid credentials");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> Admin Login | Jazleen Beauty & Art Institute</title>
      </Helmet>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/static/image/logo/black-logo-removebg-preview.png"
            alt="Company Logo"
            className={styles.companyLogo}
          />
        </div>
        <h2 className={styles.loginHeading}>Admin Login</h2>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
};

export default AdminLogin;
