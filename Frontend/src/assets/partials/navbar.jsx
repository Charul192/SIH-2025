import React from "react";
import './navbar.css';

export default function SimpleNavbar() {
  const navOuter = {
    width: "100%",
    background: "#170d0d51",
    borderBottom: "1px solid #e5e7eb",
    boxSizing: "border-box",
    /* agar chaho to fixed kar sakte ho:
       position: "fixed", top: 0, left: 0, zIndex: 1000
       lekin phir main content ko top padding dena padega */
  };

  const container = {
    maxWidth: "1100px",    // navbar content centered and limited
    margin: "0 auto",      // centers the container horizontally
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 1rem",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
  };

  const brandStyle = {
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "#111",
    textDecoration: "none",
  };

  const linksStyle = {
    display: "flex",
    gap: "0.8rem",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "0.95rem",
    padding: "0.35rem 0.5rem",
    borderRadius: "4px",
  };

  const linkHover = (e) => {
    e.currentTarget.style.background = "#eef2ff";
    e.currentTarget.style.color = "#2c3e9a";
  };

  const linkLeave = (e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#333";
  };

  return (
    <nav style={navOuter}>
      <div style={container}>
        <a href="/" style={brandStyle}>MyApp</a>

        <div style={linksStyle}>
          <a href="/" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Home</a>
          <a href="/about" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>About</a>
          <a href="/contact" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Contact</a>
        </div>
      </div>
    </nav>
  );
}