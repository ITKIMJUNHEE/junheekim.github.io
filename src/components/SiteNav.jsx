import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "./SiteNav.css";

const LINKS = [
  { to: "/about", label: "소개" },
  { to: "/#projects", label: "프로젝트" },
  { to: "/study", label: "학습" },
  { to: "/proposals", label: "제안" },
  { to: "/working-style", label: "방식" },
  { to: "/#contact", label: "연락" },
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
