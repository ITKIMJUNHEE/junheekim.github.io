export const skillGroups = [
  {
    category: "Infrastructure",
    tagsOnly: false,
    items: [
      { name: "Docker", note: "Oasis Tram·Peakly 컨테이너화, docker-compose로 로컬 개발 스택 구성" },
      { name: "k3s", note: "Oasis Tram EC2 단일 노드 배포, Peakly 카카오클라우드 VM 5대 클러스터 참여" },
      { name: "Traefik / ingress-nginx", note: "Oasis Tram 도메인 라우팅, Peakly 팀 인프라의 진입점 구조 학습" },
      { name: "Terraform", note: "Oasis Tram EC2·보안그룹 코드화 (init/validate까지, import는 별도 진행 예정)" },
    ],
  },
  {
    category: "CI/CD",
    tagsOnly: false,
    items: [
      { name: "GitHub Actions", note: "이미지 빌드 → GHCR push → 매니페스트 태그 자동 커밋 파이프라인 구성" },
      { name: "ArgoCD", note: "두 프로젝트 모두 GitOps 자동 동기화 구성·운영" },
      { name: "Argo Workflows", note: "Peakly ML 파이프라인(자막 파싱·라벨링·학습·벡터화) 오케스트레이션 참여" },
    ],
  },
  {
    category: "Monitoring",
    tagsOnly: false,
    items: [
      { name: "Prometheus", note: "kube-prometheus-stack으로 클러스터·앱 메트릭 수집 구성" },
      { name: "Grafana", note: "부하테스트 중 노드 CPU·레플리카 지표를 실시간으로 확인하며 병목 분석" },
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
