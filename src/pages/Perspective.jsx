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

          <div className="perspective-reflections">
            {perspective.reflections.map((r) => (
              <div className="perspective-reflection" key={r.project}>
                <p className="perspective-reflection-project mono">{r.project}</p>
                <blockquote className="perspective-reflection-quote">
                  {r.paragraphs.map((p) => (
                    <p key={p.slice(0, 16)}>{p}</p>
                  ))}
                </blockquote>
              </div>
            ))}
          </div>

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
