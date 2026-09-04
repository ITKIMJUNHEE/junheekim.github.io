import { useState } from "react";
import "./ProposalCard.css";

export default function ProposalCard({ proposal }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="proposal-card card">
      <button
        type="button"
        className="proposal-card-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="proposal-card-icon" aria-hidden="true">
          {proposal.icon}
        </span>
        <div className="proposal-card-headtext">
          <span className="proposal-type-badge mono">{proposal.typeLabel}</span>
          <h3 className="proposal-card-title">{proposal.title}</h3>
          <p className="proposal-card-subtitle">{proposal.subtitle}</p>
        </div>
        <span className={`proposal-card-chevron${open ? " is-open" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      <p className="proposal-card-summary">{proposal.summary}</p>

      <div className="proposal-card-stats">
        {proposal.keyStats.map((s) => (
          <span className="proposal-stat mono" key={s}>
            {s}
          </span>
        ))}
      </div>

      <div className="proposal-card-actions">
        <a
          className="btn btn-primary proposal-download"
          href={`/proposals/${proposal.file}`}
          download
        >
          PDF 다운로드 ↓
        </a>
        <button type="button" className="btn btn-ghost" onClick={() => setOpen((v) => !v)}>
          {open ? "요약 접기" : "웹에서 요약 보기"}
        </button>
      </div>

      {open && (
        <div className="proposal-preview">
          <section className="proposal-preview-block">
            <h4>1. 가정한 상황</h4>
            <p>{proposal.situation}</p>
          </section>

          <section className="proposal-preview-block">
            <h4>2. 니즈 분석</h4>
            <dl className="proposal-needs">
              <div>
                <dt>표면적 요구</dt>
                <dd>"{proposal.needs.surface}"</dd>
              </div>
              <div>
                <dt>실제 니즈</dt>
                <dd>
                  <ul>
                    {proposal.needs.real.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>

          <section className="proposal-preview-block">
            <h4>3. 근거 — 유사 환경 실측 경험</h4>
            <p>{proposal.evidence.intro}</p>
            <ul className="proposal-evidence-points">
              {proposal.evidence.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>{proposal.evidence.conclusion}</p>
          </section>

          <section className="proposal-preview-block">
            <h4>4. 제안 — {proposal.proposal.title}</h4>
            {proposal.proposal.table && (
              <div className="proposal-table-wrap">
                <table className="proposal-table">
                  <thead>
                    <tr>
                      {proposal.proposal.table.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.proposal.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p>{proposal.proposal.body}</p>
            <p className="proposal-kpi">
              <strong>목표(KPI) —</strong> {proposal.proposal.kpi}
            </p>
            <p className="proposal-scope">
              <strong>범위 —</strong> {proposal.proposal.scope}
            </p>
          </section>

          <section className="proposal-preview-block">
            <h4>5. 기대 효과</h4>
            <ul className="proposal-outcomes">
              {proposal.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>

          <p className="proposal-disclaimer">※ {proposal.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
