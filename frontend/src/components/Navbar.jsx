import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful ✅");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  };
  const borderStyle = {
    color: "white",
    textDecoration: "none",
    padding: "12px 0",
    borderBottom: "1px solid #374151",
    fontSize: "14px",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
            flexShrink: 0,
          }}
        >
          <Link
            to="/"
            onClick={closeMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            MyBlog
          </Link>
        </h1>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/about" style={linkStyle}>
            About
          </Link>

          {currentUser && (
            <>
              <Link to="/create" style={linkStyle}>
                Create Blog
              </Link>
              <Link to="/dashboard" style={linkStyle}>
                Dashboard
              </Link>
            </>
          )}

          {!currentUser ? (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              {/* ✅ Background hata diya - plain link */}
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                color: "white",
                backgroundColor: "#dc2626",
                border: "none",
                padding: "6px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            marginLeft: "auto",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "white",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "white",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "white",
            }}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "0 16px 16px",
            borderTop: "1px solid #374151",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to="/" onClick={closeMenu} style={borderStyle}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu} style={borderStyle}>
            About
          </Link>
          {currentUser && (
            <>
              <Link to="/create" onClick={closeMenu} style={borderStyle}>
                Create Blog
              </Link>
              <Link to="/dashboard" onClick={closeMenu} style={borderStyle}>
                Dashboard
              </Link>
            </>
          )}
          {!currentUser ? (
            <>
              <Link to="/login" onClick={closeMenu} style={borderStyle}>
                Login
              </Link>
              <Link to="/register" onClick={closeMenu} style={borderStyle}>
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                color: "white",
                backgroundColor: "#dc2626",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
