import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import GrowthSequence from "../components/GrowthSequence";
import Skills from "../components/Skills";
import { about } from "../data/profile";
import "./WorkingStyle.css";

export default function WorkingStylePage() {
  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>

      <section className="working-style-page section">
        <div className="container">
          <span className="section-kicker">일하는 방식</span>
          <h1 className="section-title">세 클라우드를 손으로 익힌 방식</h1>
          <p className="section-sub">
            무엇을 얼마나 빨리 했는지보다, 어떻게 배우고 협업했는지를 정리했습니다.
          </p>

          <GrowthSequence />

          <div className="working-style-traits">
            {about.workingStyle.map((s) => (
              <div className="working-style-trait card" key={s.title}>
                <h3 className="working-style-trait-title">{s.title}</h3>
                <p className="working-style-trait-detail">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Skills />
      <Contact />
    </>
  );
}
