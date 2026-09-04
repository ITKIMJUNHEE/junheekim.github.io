import { Link } from "react-router-dom";
import "./ProofStrip.css";

const PROOFS = [
  {
    to: "/projects/oasis-tram",
    project: "Oasis Tram",
    text: "100명 → 200명, 응답 8ms → 119ms — 한계 지점을 데이터로 확인",
  },
  {
    to: "/projects/peakly",
    project: "Peakly",
    text: "장면 단위 채점 → 시퀀스 흐름 반영, 오차(MAE) 0.09 수준까지 개선",
  },
  {
    to: "/projects/peakly",
    project: "Peakly 인프라",
    text: "GPU는 학습·서빙만, 나머지는 CPU로 — 비용 구조 최적화",
  },
  {
    to: "/projects/fbrl",
    project: "FBRL",
    text: "비밀번호 노출 발견 → 전 구간 순차 교체, 투명하게 공유",
  },
];

function highlightNumbers(text) {
  const parts = text.split(/(\d+(?:\.\d+)?(?:명|ms|%|초|건)?)/g);
  return parts.map((part, i) =>
    /^\d/.test(part) ? (
      <span className="proof-num mono" key={i}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ProofStrip() {
  return (
    <section id="proof" className="proof-strip section">
      <div className="container">
        <span className="section-kicker">확인할 것들</span>
        <h2 className="section-title">숫자로 남긴 것들</h2>
        <p className="section-sub">
          각 프로젝트에서 실제로 확인하고 고친 것들입니다. 카드를 누르면 해당 프로젝트의 근거로 바로
          이동합니다.
        </p>

        <div className="proof-grid">
          {PROOFS.map((p, i) => (
            <Link to={p.to} className="proof-card card" key={p.project + i}>
              <span className="proof-card-project mono">{p.project}</span>
              <p className="proof-card-text">{highlightNumbers(p.text)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
