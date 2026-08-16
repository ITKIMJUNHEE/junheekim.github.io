import "./diagrams.css";

const NODE = { fill: "#FFFFFF", stroke: "#E2E8F0" };

function Box({ x, y, w, h, title, sub }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={NODE.fill} stroke={NODE.stroke} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 4} textAnchor="middle" className="diagram-node-title">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="diagram-node-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

export default function PeaklyDiagram() {
  return (
    <figure className="diagram-figure">
      <svg viewBox="0 0 920 400" role="img" aria-label="Peakly 4가지 요청 경로 아키텍처 다이어그램" className="diagram-svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#64748B" />
          </marker>
        </defs>

        <Box x={20} y={40} w={130} h={54} title="브라우저" />
        <Box x={20} y={300} w={130} h={54} title="외부 고객" sub="X-API-Key" />

        <Box x={230} y={170} w={160} h={60} title="Next.js (4K_FE)" sub="route handler / BFF" />
        <Box x={480} y={40} w={150} h={54} title="FastAPI (4K_BE)" />

        <Box x={720} y={100} w={170} h={60} title="Supabase data" sub="movies · movie_vectors" />
        <Box x={720} y={260} w={170} h={60} title="Supabase ai" sub="scene_scores" />

        {/* A: browser -> supabase data direct */}
        <g className="diagram-path">
          <path d="M150,60 C 500,10 650,60 720,120" fill="none" stroke="#0D9488" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <path d="M150,60 C 500,10 650,60 720,120" fill="none" stroke="transparent" strokeWidth="16" />
          <text x="420" y="28" className="diagram-edge-label" fill="#0D9488">
            A. anon 직접 (RLS)
          </text>
        </g>

        {/* B: browser -> next -> supabase data */}
        <g className="diagram-path">
          <path d="M150,80 L 230,190" fill="none" stroke="#2563EB" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <path d="M390,195 C 550,180 650,150 718,140" fill="none" stroke="#2563EB" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <text x="160" y="150" className="diagram-edge-label" fill="#2563EB">
            B. /api/movies (캐시)
          </text>
        </g>

        {/* C: browser -> next -> fastapi -> supabase data/ai */}
        <g className="diagram-path">
          <path d="M310,170 L 480,90" fill="none" stroke="#D97706" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <path d="M630,70 C 690,80 700,100 718,110" fill="none" stroke="#D97706" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <path d="M600,94 C 660,180 690,240 718,270" fill="none" stroke="#D97706" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#arrow)" />
          <text x="400" y="130" className="diagram-edge-label" fill="#D97706">
            C. /api/manager/* (세션)
          </text>
        </g>

        {/* D: external customer -> next -> supabase ai */}
        <g className="diagram-path">
          <path d="M150,320 L 250,235" fill="none" stroke="#64748B" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <path d="M390,235 C 560,260 650,280 718,285" fill="none" stroke="#64748B" strokeWidth="1.6" markerEnd="url(#arrow)" />
          <text x="160" y="360" className="diagram-edge-label" fill="#64748B">
            D. 점수 API (API Key)
          </text>
        </g>
      </svg>
      <figcaption className="diagram-caption">
        4가지 요청 경로 — (A) 공개 읽기는 anon 키로 Supabase 직접 호출, (B) 메인 목록은 Next.js가 캐싱 후 반환,
        (C) 매니저 쓰기는 세션 인증 후 FastAPI 경유, (D) 외부 고객 점수 조회는 API 키 인증 후 별도 AI DB로.
      </figcaption>
    </figure>
  );
}
