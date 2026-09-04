import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import ProposalCard from "../components/ProposalCard";
import { proposals } from "../data/proposals";
import "./Proposals.css";

export default function ProposalsPage() {
  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>

      <section className="proposals-page section">
        <div className="container">
          <span className="section-kicker">가상 제안서</span>
          <h1 className="section-title">연습 삼아 써본 제안서 3건</h1>
          <p className="section-sub">
            프리세일즈·기술영업 직무에 대한 조언을 참고해, 실제 겪은 프로젝트 데이터를 근거로 "만약 이런
            고객이 있다면 어떻게 제안했을까"를 직접 써본 연습 자료입니다.
          </p>

          <div className="proposals-list">
            {proposals.map((p) => (
              <ProposalCard proposal={p} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
