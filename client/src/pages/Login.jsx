import { useState } from "react";
import "../styles/auth.css";
import { login } from "../api/auth";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return alert("Please enter all fields");
    }

    const response = await login(form);

    if (response.success) {
      alert("Login Successful!");

      // save token
      localStorage.setItem("token", response.token);
      // save basic user info
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // redirect to dashboard
      window.location.href = "/dashboard";
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
          <h2>Login</h2>

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button 
            className="auth-btn login-btn"
            onClick={handleSubmit}
          >
            Login
          </button>

          <p className="switch-text">
            Don’t have an account? <a href="/signup">Create one</a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
