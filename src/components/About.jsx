import StatusChip from "./StatusChip";
import { about, careerHighlights } from "../data/profile";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <span className="section-kicker">{about.kicker}</span>
        <h2 className="section-title">{about.title}</h2>

        <div className="about-grid">
          <div className="about-bio">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 12)} className="about-para">
                {p}
              </p>
            ))}
          </div>

          <ul className="about-timeline">
            {careerHighlights.map((item) => (
              <li key={item.title} className="about-item card">
                <div className="about-item-head">
                  <h3 className="about-item-title">{item.title}</h3>
                  {item.status ? (
                    <StatusChip tone={item.status}>{item.tag}</StatusChip>
                  ) : (
                    <span className="about-item-tag mono">{item.tag}</span>
                  )}
                </div>
                <p className="about-item-detail">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
