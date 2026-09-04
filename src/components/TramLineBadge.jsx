import { timeline } from "../data/timeline";
import "./TramLineBadge.css";

export default function TramLineBadge({ stopTitle }) {
  const index = timeline.findIndex((s) => s.title === stopTitle);
  if (index === -1) return null;

  return (
    <div className="tram-badge" aria-label={`타임라인에서 ${stopTitle} 지점`}>
      <span className="tram-badge-dots" aria-hidden="true">
        {timeline.map((stop, i) => (
          <span key={stop.title} className={`tram-badge-dot${i === index ? " is-here" : ""}`} />
        ))}
      </span>
      <span className="tram-badge-label mono">이 노선의 {stopTitle} 지점</span>
    </div>
  );
}
