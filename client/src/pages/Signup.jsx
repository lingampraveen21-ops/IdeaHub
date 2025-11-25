import { useState } from "react";
import "../styles/auth.css";
import { signup } from "../api/auth";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return alert("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    const response = await signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (response.success) {
      alert("Signup Successful!");
      window.location.href = "/login";
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>Every big idea starts with a small step</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>Signup</h2>

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Re-enter your password"
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
          </div>

          <button 
            className="auth-btn signup-btn"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          <p className="switch-text">
            Already have an account? <a href="/login">Login</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;
