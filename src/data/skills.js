export const skillGroups = [
  {
    category: "Infra",
    items: [
      { name: "Docker", note: "Oasis Tram·Peakly 컨테이너화, docker-compose로 로컬 개발 스택 구성" },
      { name: "k3s", note: "Oasis Tram EC2 단일 노드 배포, Peakly 카카오클라우드 VM 5대 클러스터 참여" },
      { name: "ArgoCD", note: "두 프로젝트 모두 GitOps 자동 동기화 구성·운영" },
      { name: "Traefik / ingress-nginx", note: "Oasis Tram 도메인 라우팅, Peakly 팀 인프라의 진입점 구조 학습" },
      { name: "Terraform", note: "Oasis Tram EC2·보안그룹 코드화 (init/validate까지, import는 별도 진행 예정)" },
    ],
  },
  {
    category: "CI/CD",
    items: [
      { name: "GitHub Actions", note: "이미지 빌드 → GHCR push → 매니페스트 태그 자동 커밋 파이프라인 구성" },
      { name: "Argo Workflows", note: "Peakly ML 파이프라인(자막 파싱·라벨링·학습·벡터화) 오케스트레이션 참여" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Express + TypeScript", note: "Oasis Tram API 서버, JWT 인증·PostgreSQL 연동 구현" },
      { name: "FastAPI", note: "Oasis Tram ML 예측 서비스, Peakly 백엔드 구조 학습" },
      { name: "PostgreSQL", note: "SQLite에서 마이그레이션 진행, 비동기 쿼리로 전체 라우터 리팩터링" },
    ],
  },
  {
    category: "ML",
    items: [
      { name: "scikit-learn", note: "Oasis Tram 승객 수요 예측 (RandomForestRegressor)" },
      { name: "PyTorch / RoBERTa", note: "Peakly 감정(arousal/valence) 회귀 모델 학습에 참여" },
      { name: "pgvector", note: "Peakly 영화 감정 벡터 저장·코사인 유사도 추천 구조 학습" },
    ],
  },
  {
    category: "Monitoring",
    items: [
      { name: "Prometheus", note: "kube-prometheus-stack으로 클러스터·앱 메트릭 수집 구성" },
      { name: "Grafana", note: "부하테스트 중 노드 CPU·레플리카 지표를 실시간으로 확인하며 병목 분석" },
      { name: "k6", note: "Oasis Tram 단계적 부하테스트(10→200명) 스크립트 작성·실행" },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "TypeScript", note: "Oasis Tram backend·frontend 전체 전환 (로직 변경 없이 타입만 추가)" },
      { name: "Python", note: "FastAPI 서비스, ML 파이프라인 코드 작성" },
    ],
  },
];
