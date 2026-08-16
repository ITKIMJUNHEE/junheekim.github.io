import { Link } from "react-router-dom";
import StatusChip from "./StatusChip";
import { projects } from "../data/projects";
import "./ProjectsPreview.css";

export default function ProjectsPreview() {
  return (
    <section id="projects" className="projects-preview section">
      <div className="container">
        <span className="section-kicker">Projects</span>
        <h2 className="section-title">케이스 스터디 2개</h2>
        <p className="section-sub">
          완성도보다 실제로 무엇을 결정하고, 어디서 막혔고, 어떻게 풀었는지를 남겼습니다. 카드를 눌러 각
          프로젝트의 상세 페이지로 이동합니다.
        </p>

        <div className="pp-grid">
          {projects.map((p) => (
            <Link to={`/projects/${p.id}`} className="pp-card card" key={p.id}>
              <div className="pp-card-head">
                <h3 className="pp-card-name">{p.name}</h3>
                <StatusChip tone={p.status}>{p.statusLabel}</StatusChip>
              </div>
              <p className="pp-card-tagline">{p.tagline}</p>
              <p className="pp-card-overview">{p.overview}</p>
              <span className="pp-card-link">자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
