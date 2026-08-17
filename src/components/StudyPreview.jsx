import { Link } from "react-router-dom";
import { studyRepos } from "../data/study";
import "./StudyPreview.css";

export default function StudyPreview() {
  return (
    <section id="study" className="study-preview section">
      <div className="container">
        <span className="section-kicker">Study</span>
        <h2 className="section-title">그 외 실습한 것들</h2>
        <p className="section-sub">
          Oasis Tram, Peakly, FBRL 말고도 부트캠프를 거치며 조금씩 다뤄본 레포가 {studyRepos.length}개 더
          있습니다. 꾸준히 실습하고 있다는 근거로 가볍게 남겨둡니다.
        </p>
        <Link to="/study" className="study-preview-link">
          Study 페이지에서 전체 보기 →
        </Link>
      </div>
    </section>
  );
}
