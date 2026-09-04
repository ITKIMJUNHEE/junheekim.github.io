import { about } from "../data/profile";
import "./GrowthSequence.css";

export default function GrowthSequence() {
  return (
    <div className="growth-sequence">
      <div className="growth-sequence-flow">
        {about.growthSequence.map((s, i) => (
          <div className="growth-sequence-item" key={s.step}>
            <div className="growth-sequence-card card">
              <span className="growth-sequence-step mono">{s.step}</span>
              <h3 className="growth-sequence-title">{s.title}</h3>
              <span className="growth-sequence-date mono">{s.date}</span>
              <p className="growth-sequence-text">{s.text}</p>
            </div>
            {i < about.growthSequence.length - 1 && (
              <span className="growth-sequence-arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
