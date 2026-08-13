import StatusChip from "./StatusChip";
import { projects } from "../data/projects";
import "./StatusBar.css";

export default function StatusBar() {
  return (
    <div className="statusbar card" role="status" aria-label="프로젝트 상태 요약">
      <div className="statusbar-head">
        <span className="statusbar-label mono">Project Status</span>
        <span className="statusbar-updated mono">last checked: just now</span>
      </div>
      <ul className="statusbar-list">
        {projects.map((p) => (
          <li key={p.id}>
            <a href={`#${p.id}`} className="statusbar-item">
              <span className="statusbar-name">{p.name}</span>
              <StatusChip tone={p.status}>{p.statusLabel}</StatusChip>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
