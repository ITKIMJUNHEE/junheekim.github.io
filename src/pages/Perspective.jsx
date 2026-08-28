import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { perspective } from "../data/perspective";
import studentCouncilPhoto from "../assets/student-council-29th-inauguration.jpg";
import "./Perspective.css";

const FIELDS = [
  { key: "situation", label: "상황" },
  { key: "problem", label: "문제" },
  { key: "response", label: "대응" },
  { key: "result", label: "결과" },
  { key: "lesson", label: "배운 점" },
  { key: "application", label: "적용 계획" },
];

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
              <div className="perspective-reflection card" key={r.project}>
                <p className="perspective-reflection-project mono">{r.project}</p>
                <dl className="perspective-reflection-dl">
                  {FIELDS.map((f) => (
                    <div className="perspective-field" key={f.key}>
                      <dt>{f.label}</dt>
                      <dd>{r[f.key]}</dd>
                    </div>
                  ))}
                </dl>
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
