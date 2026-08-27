import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { perspective } from "../data/perspective";
import studentCouncilPhoto from "../assets/student-council-29th-inauguration.jpg";
import "./Perspective.css";

export default function Perspective() {
  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>

      <section className="perspective-page section">
        <div className="container">
          <span className="section-kicker">관점</span>
          <h1 className="section-title">기술을 설명하는 관점</h1>
          <p className="perspective-intro">{perspective.intro}</p>

          <div className="perspective-cards">
            {perspective.translations.map((t) => (
              <div className="perspective-card card" key={t.project}>
                <p className="perspective-card-project mono">{t.project}</p>
                <div className="perspective-card-half perspective-card-before">
                  <span className="perspective-card-label mono">기술적으로 한 일</span>
                  <p>{t.before}</p>
                </div>
                <div className="perspective-card-arrow" aria-hidden="true">
                  ↓
                </div>
                <div className="perspective-card-half perspective-card-after">
                  <span className="perspective-card-label mono">쉽게 말하면</span>
                  <p>{t.after}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="perspective-scenario">{perspective.scenario}</blockquote>

          <div className="perspective-experiences">
            {perspective.experiences.map((e) => (
              <div className="perspective-exp-item" key={e.text}>
                <span className="perspective-exp-icon" aria-hidden="true">
                  {e.icon}
                </span>
                <span className="perspective-exp-text">{e.text}</span>
                {e.icon === "🏫" && (
                  <img className="perspective-exp-photo" src={studentCouncilPhoto} alt="" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
