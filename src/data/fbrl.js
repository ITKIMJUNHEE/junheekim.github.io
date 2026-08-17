export const fbrl = {
  name: "FBRL",
  fullName: "Financial Backend Resilience Lab",
  statusLabel: "In Progress",
  role: "2인 개인 개발팀 · 인프라 담당",
  roleDetail: "백엔드는 팀원이 Spring Boot로 구현, 본인은 인프라 전체를 담당하고 있습니다.",
  repo: "https://github.com/farmer0010/fbrl-backend",
  repoNote: "실제 코드는 팀원 레포에 있습니다.",
  goal:
    "금융 백엔드 시스템이 분산 환경의 장애(네트워크 단절, Pod 중단, 브로커 다운 등) 상황에서도 데이터 정합성을 잃지 않고 스스로 복구할 수 있음을, 실제 카오스 엔지니어링 기반 결함 주입 테스트로 증명하는 것이 프로젝트의 최종 목표입니다.",
  infraGoal:
    "백엔드가 구현한 신뢰성 메커니즘(분산 락, Saga 보상 트랜잭션, 아웃박스 브로커, Kafka DLQ 재시도, ShedLock/K8s Lease 기반 리더 선출)이 실제 장애 상황에서도 정상 동작함을 검증하기 위해, Azure 기반 Kubernetes 인프라를 구축하고 Chaos Mesh로 장애를 직접 주입해 결과를 증명하는 것이 인프라 담당으로서의 목표입니다.",
  summary:
    "Azure 기반 인프라 구축은 진행 중입니다. 현재는 로컬 개발 환경(Docker Compose 기반 PostgreSQL/Redis/Kafka/Debezium/Jaeger)을 구성하고 CDC 파이프라인 연동을 검증하는 단계까지 완료했습니다. Kubernetes 클러스터와 Terraform IaC는 계획 수립을 마쳤고, Azure 계정 가입 이후 실제 리소스 프로비저닝으로 다음 단계를 진행할 예정입니다.",
  done: [
    "로컬 개발 인프라 구성 및 검증 — docker-compose.yml로 PostgreSQL 16(wal_level=logical), Redis 7.2, Kafka 3.9.0(KRaft), Kafka Connect, Jaeger 5개 서비스 로컬 기동 확인",
    "Debezium CDC 커넥터 등록 테스트 — Kafka Connect REST API로 Outbox 커넥터 등록 성공(201 Created) 확인. 실제 태스크는 백엔드 앱 부재로 FAILED, 원인을 DB 직접 조회로 진단하고 기록",
    "레포 구조화 및 문서화 — fbrl-infra 레포 생성, 팀 온보딩 이슈 오픈, ROADMAP.md/PROGRESS.md/README 작성",
  ],
  planned: [
    "Terraform — Azure 리소스 설계 문서만 작성된 상태, 실제 .tf 코드는 아직 없음 (Azure 계정 가입 대기 중)",
    "Kubernetes — 백엔드 레포의 RBAC 매니페스트를 정리해뒀으나 실제 클러스터에 적용해본 적은 없음",
    "Chaos Mesh — 장애 시나리오 6개(사이드카 브로커, Kafka 재시도, EOD 배치 재실행, ShedLock, 리더 선출, Saga 보상 트랜잭션) 문서화만 완료, 실제 설치·주입은 이후 단계",
  ],
};
