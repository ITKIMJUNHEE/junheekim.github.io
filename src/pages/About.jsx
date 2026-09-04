import { useState } from "react";
import Lightbox from "../components/Lightbox";
import Contact from "../components/Contact";
import { profile, about } from "../data/profile";
import studentCouncilPhoto from "../assets/student-council-29th-inauguration.jpg";
import "./About.css";

export default function AboutPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="about-page section">
        <div className="container">
          <span className="section-kicker">{about.kicker}</span>
          <h1 className="section-title">{about.title}</h1>

          <div className="about-page-grid">
            <div className="about-bio">
              <p className="about-para">{about.summary}</p>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 12)} className="about-para">
                  {p}
                </p>
              ))}

              <p className="about-council">
                {about.studentCouncil.text}
                <button
                  className="about-council-thumb"
                  onClick={() => setOpen(true)}
                  aria-label={`${about.studentCouncil.photoCaption} 크게 보기`}
                >
                  <img src={studentCouncilPhoto} alt="" />
                </button>
              </p>
            </div>

            <dl className="about-facts card">
              <div className="about-fact">
                <dt>이름</dt>
                <dd>{profile.name}</dd>
              </div>
              <div className="about-fact">
                <dt>생년월일</dt>
                <dd>{about.birthDate}</dd>
              </div>
              <div className="about-fact">
                <dt>학력</dt>
                <dd>
                  {about.education.school}
                  <br />
                  <span className="about-fact-sub">{about.education.period}</span>
                </dd>
              </div>
              <div className="about-fact">
                <dt>목표</dt>
                <dd>
                  {profile.role} / {profile.roleSub}
                </dd>
              </div>
              <div className="about-fact">
                <dt>이메일</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
              <div className="about-fact">
                <dt>전화</dt>
                <dd>
                  <a href={`tel:${profile.phone.replace(/-/g, "")}`}>{profile.phone}</a>
                </dd>
              </div>
              <div className="about-fact">
                <dt>GitHub</dt>
                <dd>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    {profile.github.replace("https://", "")}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Contact />

      {open && (
        <Lightbox
          src={studentCouncilPhoto}
          alt={about.studentCouncil.photoCaption}
          caption={about.studentCouncil.photoCaption}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
