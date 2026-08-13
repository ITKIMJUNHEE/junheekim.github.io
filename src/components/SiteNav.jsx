import { profile } from "../data/profile";
import "./SiteNav.css";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <header className="sitenav">
      <div className="container sitenav-inner">
        <a href="#hero" className="sitenav-brand mono">
          {profile.domain}
        </a>
        <nav className="sitenav-links" aria-label="주요 섹션 이동">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
