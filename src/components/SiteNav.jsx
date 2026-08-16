import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "./SiteNav.css";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/study", label: "Study" },
  { to: "/#contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <header className="sitenav">
      <div className="container sitenav-inner">
        <Link to="/" className="sitenav-brand mono">
          {profile.domain}
        </Link>
        <nav className="sitenav-links" aria-label="주요 섹션 이동">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
