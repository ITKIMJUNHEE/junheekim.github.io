import StatusChip from "./StatusChip";
import { fbrl } from "../data/fbrl";
import "./FbrlSection.css";

export default function FbrlSection() {
  return (
    <section id="fbrl" className="fbrl section">
      <div className="container">
        <span className="section-kicker">Now building</span>
        <div className="fbrl-head">
          <h2 className="section-title">{fbrl.name}</h2>
          <StatusChip tone="building">{fbrl.statusLabel}</StatusChip>
        </div>
        <p className="fbrl-role mono">{fbrl.role}</p>
        <p className="fbrl-role-detail">{fbrl.roleDetail}</p>

        <div className="fbrl-goals">
          <div className="fbrl-goal-block">
            <h3 className="fbrl-goal-title">프로젝트 최종 목표</h3>
            <p>{fbrl.goal}</p>
          </div>
          <div className="fbrl-goal-block">
            <h3 className="fbrl-goal-title">인프라 담당으로서의 목표</h3>
            <p>{fbrl.infraGoal}</p>
          </div>
        </div>

        <p className="fbrl-summary card">{fbrl.summary}</p>

        <div className="fbrl-progress">
          <div className="fbrl-progress-col">
            <h3 className="fbrl-progress-title fbrl-progress-title--done">완료</h3>
            <ul>
              {fbrl.done.map((item) => (
                <li key={item.slice(0, 20)}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fbrl-progress-col">
            <h3 className="fbrl-progress-title fbrl-progress-title--planned">계획 · 진행 예정</h3>
            <ul>
              {fbrl.planned.map((item) => (
                <li key={item.slice(0, 20)}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fbrl-footer">
          <a className="btn btn-ghost" href={fbrl.repo} target="_blank" rel="noreferrer">
            Repository ↗
          </a>
          <span className="fbrl-repo-note">{fbrl.repoNote}</span>
        </div>
      </div>
    </section>
  );
}
