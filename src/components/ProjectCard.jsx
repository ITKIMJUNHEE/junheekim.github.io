import StatusChip from "./StatusChip";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <article id={project.id} className="project-card card">
      <header className="project-head">
        <div className="project-head-main">
          <h3 className="project-name">{project.name}</h3>
          <StatusChip tone={project.status}>{project.statusLabel}</StatusChip>
        </div>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-role mono">
          {project.role}
          {project.period ? ` · ${project.period}` : ""}
        </p>
      </header>

      <p className="project-summary">{project.summary}</p>

      <ul className="project-highlights">
        {project.highlights.map((h) => (
          <li key={h.slice(0, 24)}>{h}</li>
        ))}
      </ul>

      <div className="project-metrics">
        {project.metrics.map((m) => (
          <div className="metric-tile" key={m.label}>
            <span className="metric-label mono">{m.label}</span>
            <span className="metric-value mono">{m.value}</span>
            {m.sub && <span className="metric-sub">{m.sub}</span>}
          </div>
        ))}
      </div>

      <div className="project-log card">
        <div className="project-log-bar">
          <span className="project-log-dot" />
          <span className="project-log-dot" />
          <span className="project-log-dot" />
          <span className="project-log-title mono">deploy.log</span>
        </div>
        <pre className="project-log-body mono">
          {project.log.map((line, i) => `${i === project.log.length - 1 ? "$" : "#"} ${line}`).join("\n")}
        </pre>
      </div>

      <div className="project-footer">
        <div className="project-stack">
          {project.stack.map((s) => (
            <span className="stack-tag mono" key={s}>
              {s}
            </span>
          ))}
        </div>
        {project.repo && (
          <a className="btn btn-ghost project-repo-link" href={project.repo} target="_blank" rel="noreferrer">
            Repository ↗
          </a>
        )}
      </div>
    </article>
  );
}
