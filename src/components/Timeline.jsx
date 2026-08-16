import StatusChip from "./StatusChip";
import { timeline } from "../data/timeline";
import "./Timeline.css";

export default function Timeline() {
  return (
    <section id="timeline" className="timeline section">
      <div className="container">
        <span className="section-kicker">Timeline</span>
        <h2 className="section-title">여기까지 온 순서</h2>
        <p className="section-sub">
          해커톤에서 나온 트램 아이디어가 부트캠프보다 먼저지만, 실제로 서비스로 확장된 건 부트캠프를
          마친 이후입니다. 시간 순서 그대로 남겼습니다.
        </p>

        <ol className="timeline-list">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.title}>
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-card card">
                <div className="timeline-card-head">
                  <span className="timeline-date mono">{item.date}</span>
                  <StatusChip tone={item.status}>{item.tag}</StatusChip>
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-detail">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
