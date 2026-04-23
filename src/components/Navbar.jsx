import { useState, useEffect } from "react";
import { categories } from "../data/products";

const NAV_LINKS = [
  { label: "Feeding", href: "#products", icon: "🍼" },
  { label: "Clothing", href: "#products", icon: "👚" },
  { label: "Toys", href: "#products", icon: "🐘" },
  { label: "Skincare", href: "#products", icon: "🌸" },
  { label: "Gear", href: "#products", icon: "👨🏻‍🍼" },
  { label: "Diapers", href: "#products", icon: "🚼" },
  { label: "Safety", href: "#products", icon: "🛡️" },
  { label: "New Mom", href: "#products", icon: "🤱" },
];

export default function Navbar({ activeCategory, onCategoryChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (catId) => {
    onCategoryChange(catId);
    closeMenu();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Navbar Bar ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">👯</div>
            <span className="nav-logo-text">
              Twin<span>Shop</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href="#products"
                  className={activeCategory === cat.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat.id);
                  }}
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            {/* Hamburger — mobile only */}
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Overlay Backdrop ── */}
      <div
        className={`overlay-backdrop${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Overlay Slide-in Menu ── */}
      <aside
        className={`overlay-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="overlay-header">
          <a href="#" className="nav-logo" onClick={closeMenu}>
            <div className="nav-logo-icon">👯</div>
            <span className="nav-logo-text">
              Twin<span>Shop</span>
            </span>
          </a>
          <button
            className="overlay-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav Links */}
        <nav className="overlay-nav">
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-soft)",
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Shop by Category
          </p>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
              }}
            >
              <span className="menu-icon">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="overlay-footer">
          <p>
            Made with ❤️ for <strong>tiny adventurers</strong>
          </p>
        </div>
      </aside>
    </>
  );
}
