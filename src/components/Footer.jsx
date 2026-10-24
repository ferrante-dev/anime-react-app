import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          Radar
        </Link>
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/#results">Browse</Link>
          <a href="https://anilist.co" target="_blank" rel="noreferrer">
            Powered by AniList
          </a>
        </div>
        <p className="footer__copyright">
          © {new Date().getFullYear()} Radar. Anime information from AniList.
        </p>
      </div>
    </footer>
  );
}
