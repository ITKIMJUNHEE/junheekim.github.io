import { useEffect, useState } from "react";
import StatusBar from "./StatusBar";
import CountUp from "./CountUp";
import { profile } from "../data/profile";
import profilePhoto from "../assets/profile-photo.jpg";
import "./Hero.css";

const HERO_STATS = [
  { to: 3, suffix: "", label: "프로젝트" },
  { to: 3, suffix: "", label: "클라우드 환경 (AWS · 카카오클라우드 · Azure)" },
];

const TAGLINE_WORDS = profile.taglineMain.split(" ");

export default function Hero() {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const frame = requestAnimationFrame(() => setPlayed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="hero" className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="section-kicker">{profile.domain}</span>
          <h1 className="hero-title">
            {profile.name}
            <span className="hero-title-en"> · {profile.nameEn}</span>
          </h1>
          <p className="hero-role">
            {profile.role} <span className="hero-role-sep">/</span> {profile.roleSub}
          </p>
          <p className={`hero-tagline-main${played ? " is-playing" : ""}`}>
            {TAGLINE_WORDS.map((word, i) => (
              <span className="hero-tagline-word" style={{ "--word-delay": `${i * 40}ms` }} key={i}>
                {word}
                {i < TAGLINE_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          <p className="hero-tagline-sub">{profile.taglineSub}</p>

          <div className="hero-stats">
            {HERO_STATS.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-value mono">
                  <CountUp to={s.to} suffix={s.suffix} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              프로젝트 보기
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              연락하기
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo card">
            <img src={profilePhoto} alt={`${profile.name} 프로필 사진`} />
          </div>
          <span className="hero-photo-caption mono">{profile.domain}</span>
        </div>
      </div>

      <div className="container">
        <StatusBar />
      </div>
    </section>
  );
}
