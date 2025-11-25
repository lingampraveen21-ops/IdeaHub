import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 50px",
        backgroundColor: "#1E3A8A",
        color: "white",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>HackathonApp</div>
      <div>
        <Link to="/" style={{ color: "white", margin: "0 10px" }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ color: "white", margin: "0 10px" }}>
          Dashboard
        </Link>
        {user ? (
          <>
            <span style={{ margin: "0 10px" }}>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", margin: "0 10px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white", margin: "0 10px" }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
