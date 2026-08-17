import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { studyRepos, undergradProjects } from "../data/study";
import { profile } from "../data/profile";
import "./StudyPage.css";

export default function StudyPage() {
  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>
      <section className="study-page section">
        <div className="container">
          <span className="section-kicker">Study</span>
          <h1 className="section-title">그 외 실습한 것들</h1>
          <p className="section-sub">
            Oasis Tram, Peakly, FBRL은 각각 따로 소개했고, 여기서는{" "}
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub 프로필
            </a>
            에 있는 부트캠프 실습·참고용 레포들을 가볍게 정리했습니다. 깊이보다는 무엇을, 왜 다뤄봤는지에
            집중했습니다.
          </p>

          <ul className="study-list">
            {studyRepos.map((r) => (
              <li key={r.name} className="study-item card">
                <div className="study-item-head">
                  <a href={r.url} target="_blank" rel="noreferrer" className="study-item-name mono">
                    {r.name} ↗
                  </a>
                  <div className="study-item-tags">
                    {r.fork && <span className="study-tag mono">Fork</span>}
                    {r.lang && <span className="study-tag mono">{r.lang}</span>}
                  </div>
                </div>
                <p className="study-item-desc">{r.desc}</p>
              </li>
            ))}
          </ul>

          <h2 className="study-subheading">학부 시절 프로젝트</h2>
          <p className="section-sub">레포로 남아있지 않은, 수업 과정에서 진행한 프로젝트들입니다.</p>
          <ul className="study-plain-list">
            {undergradProjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <Contact />
    </>
  );
}
