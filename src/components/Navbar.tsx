import React from "react";

export default function Navbar() {
  const navItems = [
    "HOME",
    "ABOUT US",
    "EVENT",
    "GALLERY",
    "TEAM",
    "INITIATIVE",
    "BLOGS",
  ];

  return (
    <header className="site-navbar">
      <div className="navbar-inner">

        {/* E-CELL LOGO */}
        <div className="ecell-logo">
          <div className="logo-mark">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">
            <span>ECELL</span>
            <small>DMCE</small>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button className="menu-button">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}