import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container contact-inner card">
        <div>
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">함께 일할 기회를 찾고 있습니다</h2>
          <p className="section-sub contact-sub">
            인프라를 직접 만들고 운영해본 경험을 바탕으로, 클라우드 인프라 또는 클라우드 기술영업/MSP 분야에
            관심이 있습니다.
          </p>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="btn btn-ghost" href={`https://${profile.domain}`}>
            {profile.domain}
          </a>
        </div>
      </div>
      <p className="contact-github-note">{profile.githubNote}</p>
      <p className="contact-footer mono">
        © {new Date().getFullYear()} {profile.nameEn} · <Link to="/now">지금 하고 있는 것</Link>
      </p>
    </section>
  );
}
