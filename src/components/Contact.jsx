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
            클라우드 엔지니어 / Solutions Architect 포지션에 관심이 있습니다. 편하게 연락 주세요.
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
        © {new Date().getFullYear()} {profile.nameEn}
      </p>
    </section>
  );
}
