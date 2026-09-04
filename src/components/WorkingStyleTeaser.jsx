import { Link } from "react-router-dom";
import "./WorkingStyleTeaser.css";

export default function WorkingStyleTeaser() {
  return (
    <section id="working-style-teaser" className="working-style-teaser section">
      <div className="container">
        <span className="section-kicker">일하는 방식</span>
        <h2 className="section-title">세 클라우드를 손으로 익힌 방식</h2>
        <p className="section-sub">
          해커톤에서 시작해 부트캠프를 거쳐 AWS·Azure까지, 어떻게 배우고 협업했는지 정리했습니다.
        </p>
        <Link to="/working-style" className="working-style-teaser-link">
          일하는 방식 더 보기 <span className="link-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
