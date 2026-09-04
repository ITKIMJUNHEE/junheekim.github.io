import { Link } from "react-router-dom";
import { proposals } from "../data/proposals";
import "./ProposalsTeaser.css";

export default function ProposalsTeaser() {
  return (
    <section id="proposals-teaser" className="proposals-teaser section">
      <div className="container">
        <Link to="/proposals" className="proposals-teaser-card">
          <div className="proposals-teaser-text">
            <span className="section-kicker">가상 제안서</span>
            <h2 className="section-title">실제 데이터를 근거로 작성한 클라우드 도입 제안 3건</h2>
            <p className="section-sub proposals-teaser-sub">
              프리세일즈 관점에서 직접 써본 자료입니다. 카드를 누르면 전체 제안서 3건으로 이동합니다.
            </p>
          </div>
          <div className="proposals-teaser-icons" aria-hidden="true">
            {proposals.map((p) => (
              <span className="proposals-teaser-icon" key={p.id}>
                {p.icon}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
