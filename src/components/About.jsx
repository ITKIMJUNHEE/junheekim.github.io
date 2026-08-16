import { useState } from "react";
import Lightbox from "./Lightbox";
import { about } from "../data/profile";
import studentCouncilPhoto from "../assets/student-council-29th-inauguration.jpg";
import "./About.css";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="about section">
      <div className="container">
        <span className="section-kicker">{about.kicker}</span>
        <h2 className="section-title">{about.title}</h2>

        <div className="about-bio">
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
      </div>

      {open && (
        <Lightbox
          src={studentCouncilPhoto}
          alt={about.studentCouncil.photoCaption}
          caption={about.studentCouncil.photoCaption}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
