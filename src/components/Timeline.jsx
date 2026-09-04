import { useEffect, useRef, useState } from "react";
import StatusChip from "./StatusChip";
import { timeline } from "../data/timeline";
import profilePhoto from "../assets/profile-photo.jpg";
import "./Timeline.css";

const CLICK_MESSAGES = ["지금 여기 있어요", "다음 정류장을 찾는 중입니다"];

export default function Timeline() {
  const currentIndex = timeline.length - 1;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [played, setPlayed] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const bubbleTimeout = useRef(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  useEffect(() => {
    if (reducedMotion) return;
    const frame = requestAnimationFrame(() => setPlayed(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => () => clearTimeout(bubbleTimeout.current), []);

  const active = timeline[activeIndex];

  function handleStopClick(i, isCurrent) {
    setActiveIndex(i);
    if (!isCurrent || reducedMotion) return;
    setBounce(false);
    requestAnimationFrame(() => setBounce(true));
    setMessageIndex((m) => (m + 1) % CLICK_MESSAGES.length);
    setBubble(true);
    clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => setBubble(false), 2000);
  }

  return (
    <section id="timeline" className="timeline section">
      <div className="container">
        <span className="section-kicker">Timeline</span>
        <h2 className="section-title">여기까지 온 노선</h2>
        <p className="section-sub">
          해커톤에서 나온 트램 아이디어가 부트캠프보다 먼저지만, 실제로 서비스로 확장된 건 부트캠프를
          마친 이후입니다. 정류장을 누르거나 마우스를 올려 각 지점의 이야기를 확인하세요.
        </p>

        <div
          className={`tram-line${played ? " is-playing" : ""}`}
          role="list"
          aria-label="커리어 타임라인"
        >
          <span className="tram-track" aria-hidden="true">
            <span className="tram-track-fill" />
          </span>

          {timeline.map((stop, i) => {
            const isCurrent = i === currentIndex;
            return (
              <button
                key={stop.title}
                type="button"
                role="listitem"
                className={`tram-stop tram-stop-${i + 1}${i === activeIndex ? " is-active" : ""}${
                  isCurrent ? " is-current" : ""
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => handleStopClick(i, isCurrent)}
                aria-pressed={i === activeIndex}
              >
                {isCurrent ? (
                  <span
                    className={`tram-avatar${bounce ? " is-bouncing" : ""}`}
                    onAnimationEnd={(e) => {
                      if (e.animationName === "tram-avatar-bounce") setBounce(false);
                    }}
                  >
                    <img src={profilePhoto} alt="" />
                    <span className="tram-avatar-ripple" aria-hidden="true" />
                    {bubble && <span className="tram-bubble">{CLICK_MESSAGES[messageIndex]}</span>}
                  </span>
                ) : (
                  <span className="tram-stop-dot" aria-hidden="true" />
                )}
                <span className="tram-stop-label">
                  <span className="tram-stop-date mono">{stop.date}</span>
                  <span className="tram-stop-title">{stop.title}</span>
                </span>
                <span className="tram-stop-tooltip" role="tooltip">
                  {stop.detail}
                </span>
              </button>
            );
          })}
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
