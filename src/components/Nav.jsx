import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const LOGO =
  "https://4nite.site/images/fortnite/BID_A_056_StaminaFemale_icon.webp";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo" onClick={closeMenu}>
          <img className="nav__logo--img" src={LOGO} alt="Radar logo" />
          <span className="nav__logo--title">Radar</span>
        </Link>
        <button
          className="btn__menu"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          <li>
            <NavLink to="/" end className="nav__link" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <a
              href="/#footer"
              className="nav__link nav__link--primary"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
