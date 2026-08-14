import { useState } from "react";
import { NavLink } from "react-router-dom";
import Seal from "./Seal.jsx";
import DateTimeBadge from "./DateTimeBadge.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/officials", label: "Officials" },
  { to: "/announcements", label: "Announcements" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-topbar">
        <div className="container navbar-topbar-inner">
          <span>Republic of the Philippines</span>
          <DateTimeBadge />
        </div>
      </div>
      <div className="navbar-inner container">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <Seal size={40} />
          <div className="brand-text">
            <span className="brand-eyebrow">Official Web Portal</span>
            <span className="brand-title">Barangay Dita</span>
          </div>
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
