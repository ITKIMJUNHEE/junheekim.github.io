import { useState } from "react";
import StatusChip from "./StatusChip";
import Lightbox from "./Lightbox";
import RepoActivity from "./RepoActivity";
import PeaklyDiagram from "./diagrams/PeaklyDiagram";
import "./ProjectDetail.css";

import tramArchitecture from "../assets/tram-architecture.png";
import tramDashboard from "../assets/tram-dashboard.png";
import tramAdmin from "../assets/tram-admin.png";
import tramSimulation from "../assets/tram-simulation.png";
import tramPrediction from "../assets/tram-prediction.png";
import argocdOverview from "../assets/argocd-applications-overview.png";
import grafanaLoadTest from "../assets/grafana-load-test-hpa.png";
import supabaseSchema from "../assets/supabase-schema-visualizer.png";
import understandMap from "../assets/understand-peakly-architecture-map.png";
import fbrlAcr from "../assets/fbrl-acr-overview.png";
import fbrlKafkaConnect from "../assets/fbrl-kafka-connect-status.png";
import fbrlPostgres from "../assets/fbrl-postgres-overview.png";

const IMAGES = {
  "tram-dashboard": tramDashboard,
  "tram-admin": tramAdmin,
  "tram-simulation": tramSimulation,
  "tram-prediction": tramPrediction,
  "argocd-applications-overview": argocdOverview,
  "grafana-load-test-hpa": grafanaLoadTest,
  "supabase-schema-visualizer": supabaseSchema,
  "understand-peakly-architecture-map": understandMap,
  "fbrl-acr-overview": fbrlAcr,
  "fbrl-kafka-connect-status": fbrlKafkaConnect,
  "fbrl-postgres-overview": fbrlPostgres,
};

export default function ProjectDetail({ project }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <article id={project.id} className="project-detail card">
      <header className="pd-head">
        <div className="pd-head-main">
          <h3 className="pd-name">{project.name}</h3>
          <StatusChip tone={project.status}>{project.statusLabel}</StatusChip>
        </div>
        <p className="pd-tagline">{project.tagline}</p>
        <p className="pd-role mono">{project.role}</p>
      </header>

      <section className="pd-section">
        <h4 className="pd-h">Overview</h4>
        <p className="pd-overview">{project.overview}</p>
      </section>

      <section className="pd-section">
        <h4 className="pd-h">Architecture</h4>
        <p className="pd-body">{project.architecture.description}</p>
        {project.architecture.diagram === "tram-image" && (
          <figure className="diagram-figure pd-diagram-image">
            <img src={tramArchitecture} alt="Oasis Tram 시스템 아키텍처 다이어그램" />
            <figcaption className="diagram-caption">레포에 포함된 실제 아키텍처 다이어그램 (docs/diagrams)</figcaption>
          </figure>
        )}
        {project.architecture.diagram === "peakly-svg" && <PeaklyDiagram />}
      </section>

      <section className="pd-section">
        <h4 className="pd-h">Key decisions</h4>
        <div className="pd-decisions">
          {project.keyDecisions.map((d) => (
            <div className="pd-decision" key={d.q}>
              <p className="pd-decision-q">Q. {d.q}</p>
              <p className="pd-decision-a">{d.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pd-section">
        <h4 className="pd-h">Metrics</h4>
        <div className="project-metrics">
          {project.metrics.map((m) => (
            <div className="metric-tile" key={m.label}>
              <span className="metric-label mono">{m.label}</span>
              <span className="metric-value mono">{m.value}</span>
              {m.sub && <span className="metric-sub">{m.sub}</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="pd-section pd-trouble-section">
        <h4 className="pd-h">Troubleshooting</h4>
        <p className="pd-trouble-intro">
          STAR(Situation-Task-Action-Result)로 정리했습니다. 어떤 상황에서, 뭘 해결해야 했고, 실제로 어떻게
          움직였고, 결과가 어땠는지 순서대로 남겼습니다.
        </p>
        <ul className="pd-trouble-jump">
          {project.troubleshooting.map((t, i) => (
            <li key={t.title}>
              <a href={`#${project.id}-trouble-${i}`}>{t.title}</a>
            </li>
          ))}
        </ul>
        <div className="pd-trouble-list">
          {project.troubleshooting.map((t, i) => (
            <div className="pd-trouble" id={`${project.id}-trouble-${i}`} key={t.title}>
              <p className="pd-trouble-title">{t.title}</p>
              <dl className="pd-trouble-dl">
                <dt>Situation</dt>
                <dd>{t.situation}</dd>
                <dt>Task</dt>
                <dd>{t.task}</dd>
                <dt>Action</dt>
                <dd>{t.action}</dd>
                <dt>Result</dt>
                <dd>{t.result}</dd>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="pd-section pd-growth-section">
        <h4 className="pd-h">기술적으로 늘고 성장한 점</h4>
        <div className="pd-growth">
          <p>
            <strong>Before —</strong> {project.growth.before}
          </p>
          <p>
            <strong>How —</strong> {project.growth.how}
          </p>
          <p>
            <strong>Forward —</strong> {project.growth.forward}
          </p>
        </div>
      </section>

      <section className="pd-section">
        <h4 className="pd-h">Evidence</h4>
        <div className="pd-evidence-grid">
          {project.evidence.map((e) => (
            <button
              key={e.key}
              className="pd-evidence-item"
              onClick={() => setLightbox(e)}
              aria-label={`${e.caption} 크게 보기`}
            >
              <img src={IMAGES[e.key]} alt={e.caption} loading="lazy" />
              <span className="pd-evidence-caption">{e.caption}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="pd-section">
        <h4 className="pd-h">Recent commits</h4>
        <RepoActivity repo={project.repo} />
      </section>

      <div className="project-footer">
        <div className="project-stack">
          {project.stack.map((s) => (
            <span className="stack-tag mono" key={s}>
              {s}
            </span>
          ))}
        </div>
        <a className="btn btn-ghost project-repo-link" href={project.repo} target="_blank" rel="noreferrer">
          Repository ↗
        </a>
      </div>

      {lightbox && (
        <Lightbox
          src={IMAGES[lightbox.key]}
          alt={lightbox.caption}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </article>
  );
}
