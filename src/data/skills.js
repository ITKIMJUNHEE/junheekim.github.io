export const skillGroups = [
  {
    category: "Infrastructure",
    tagsOnly: false,
    items: [
      { name: "Docker", note: "Oasis Tram·Peakly 컨테이너화, docker-compose로 로컬 개발 스택 구성" },
      { name: "k3s", note: "Oasis Tram·FBRL EC2/Azure VM 단일 노드 배포, Peakly 카카오클라우드 VM 5대 클러스터 참여" },
      { name: "Traefik / ingress-nginx", note: "Oasis Tram 도메인 라우팅, FBRL Let's Encrypt HTTPS 발급, Peakly 팀 인프라 진입점 구조 학습" },
      { name: "Terraform", note: "FBRL Azure 리소스 18개(VM·Postgres×2·Redis·ACR·SWA) 코드화·적용, Oasis Tram EC2 코드화(init/validate)" },
      { name: "Azure", note: "FBRL 인프라 전체 — VM+k3s, Postgres Flexible Server, Managed Redis, ACR, Static Web Apps" },
      { name: "Kafka / Kafka Connect", note: "FBRL Debezium CDC 기반 Outbox 이벤트 발행 파이프라인 구축·운영" },
    ],
  },
  {
    category: "CI/CD",
    tagsOnly: false,
    items: [
      { name: "GitHub Actions", note: "이미지 빌드 → GHCR push → 매니페스트 태그 자동 커밋 파이프라인 구성" },
      { name: "ArgoCD", note: "Oasis Tram·Peakly 자동 동기화 구성·운영, FBRL GitOps 개념검증(읽기 전용) 설치" },
      { name: "Argo Workflows", note: "Peakly ML 파이프라인(자막 파싱·라벨링·학습·벡터화) 오케스트레이션 참여" },
    ],
  },
  {
    category: "Monitoring",
    tagsOnly: false,
    items: [
      { name: "Prometheus", note: "Oasis Tram·FBRL kube-prometheus-stack으로 클러스터·앱 메트릭 수집 구성" },
      { name: "Grafana", note: "Oasis Tram·Peakly 부하테스트 중 노드 CPU·레플리카 지표 병목 분석, FBRL 클러스터·백엔드 메트릭 대시보드 구성" },
      { name: "k6", note: "Oasis Tram 단계적 부하테스트(10→200명) 스크립트 작성·실행" },
      { name: "Jaeger", note: "FBRL 로컬 인프라에 분산 트레이싱 구성" },
    ],
  },
  {
    category: "Application Layer",
    tagsOnly: true,
    items: [
      { name: "Spring Boot" },
      { name: "Express" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Supabase" },
      { name: "Redis" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "PyTorch" },
      { name: "RoBERTa" },
      { name: "BiLSTM" },
      { name: "scikit-learn" },
      { name: "pgvector" },
    ],
  },
];
