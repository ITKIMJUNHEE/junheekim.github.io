import { Link } from "react-router-dom";
import { about } from "../data/profile";
import "./AboutTeaser.css";

export default function AboutTeaser() {
  return (
    <section id="about" className="about-teaser section">
      <div className="container">
        <span className="section-kicker">{about.kicker}</span>
        <h2 className="section-title">{about.title}</h2>
        <p className="about-teaser-summary">{about.summary}</p>
        <Link to="/about" className="about-teaser-link">
          더 자세히 보기 →
        </Link>
      </div>
    </section>
  );
}
