import { useState } from "react";
import StatusChip from "./StatusChip";
import { timeline } from "../data/timeline";
import "./Timeline.css";

export default function Timeline() {
  const currentIndex = timeline.length - 1;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const active = timeline[activeIndex];

  return (
    <section id="timeline" className="timeline section">
      <div className="container">
        <span className="section-kicker">Timeline</span>
        <h2 className="section-title">여기까지 온 노선</h2>
        <p className="section-sub">
          해커톤에서 나온 트램 아이디어가 부트캠프보다 먼저지만, 실제로 서비스로 확장된 건 부트캠프를
          마친 이후입니다. 정류장을 누르거나 마우스를 올려 각 지점의 이야기를 확인하세요.
        </p>

        <div className="tram-line" role="list" aria-label="커리어 타임라인">
          {timeline.map((stop, i) => (
            <button
              key={stop.title}
              type="button"
              role="listitem"
              className={`tram-stop${i === activeIndex ? " is-active" : ""}${
                i === currentIndex ? " is-current" : ""
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              aria-pressed={i === activeIndex}
            >
              <span className="tram-stop-dot" aria-hidden="true" />
              <span className="tram-stop-label">
                <span className="tram-stop-date mono">{stop.date}</span>
                <span className="tram-stop-title">{stop.title}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="tram-detail card">
          <div className="tram-detail-head">
            <span className="tram-detail-date mono">{active.date}</span>
            <h3 className="tram-detail-title">
              {active.title}
              {active.isCurrent && <span className="tram-current-badge">현재 위치</span>}
            </h3>
            {active.tag && <StatusChip tone={active.status}>{active.tag}</StatusChip>}
          </div>
          <p className="tram-detail-text">{active.detail}</p>
        </div>
      </div>
    </section>
  );
}
