export const projects = [
  {
    id: "oasis-tram",
    name: "Oasis Tram",
    tagline: "대전 트램 AI 정책 시뮬레이션 & 관제 플랫폼",
    status: "archived",
    statusLabel: "Archived",
    statusNote: "AWS 프리티어 만료로 라이브 서버는 현재 종료된 상태입니다.",
    repo: "https://github.com/ITKIMJUNHEE/2026-tram",
    role: "해커톤 프로토타입(팀) → 프로덕션 확장(개인)",
    period: "AWS 프리티어 만료로 아카이브",
    overview:
      "정거장 좌표·시뮬레이션 로직이 프론트엔드에 하드코딩된 해커톤 정적 프로토타입을, 대회 종료 후 React+Express+PostgreSQL 풀스택, JWT 인증 관제 시스템, Python ML 수요 예측, k3s+ArgoCD GitOps 배포, Prometheus+Grafana 모니터링까지 갖춘 서비스로 혼자 확장했습니다.",
    architecture: {
      diagram: "tram-image",
      description:
        "EC2 단일 인스턴스 위 k3s 단일 노드 클러스터. Traefik이 도메인 하나로 프론트엔드/백엔드 라우팅을 모두 처리하고, ML 서비스는 백엔드와 분리된 프로세스로 구성해 장애 시에도 규칙 기반 폴백으로 서비스 연속성을 확보했습니다. ArgoCD가 프론트/백엔드를 자동 배포하고, Prometheus가 백엔드 메트릭을 수집해 Grafana로 시각화합니다.",
    },
    keyDecisions: [
      {
        q: "왜 SQLite에서 PostgreSQL로 옮겼나?",
        a: "node:sqlite 내장 모듈로 시작했으나 컨테이너 재시작 시 파일 기반 DB가 유실되고 다중 인스턴스로 확장할 수 없다는 문제가 있어 전환. 이 과정에서 동기 호출을 PostgreSQL의 Promise 기반 비동기 쿼리로 바꾸며 전체 라우터 핸들러를 async로 리팩터링했습니다.",
      },
      {
        q: "왜 풀 쿠버네티스 대신 k3s를 선택했나?",
        a: "인프라가 EC2 단일 인스턴스뿐이라 관리형 EKS나 멀티 노드 클러스터를 쓸 트래픽 규모가 아니었습니다. 실제로 k3s+ArgoCD+Prometheus/Grafana를 동시에 띄운 상태에서 메모리 여유가 빠듯해 2GB 스왑을 추가해야 했을 정도로, 풀 스펙 쿠버네티스의 오버헤드까지는 감당하기 어려운 환경이었습니다.",
      },
      {
        q: "GitHub Actions와 ArgoCD 역할을 어떻게 나눴나?",
        a: "Actions는 '빌드 CI' — push 시 이미지를 빌드해 GHCR에 푸시하고 매니페스트의 이미지 태그를 치환해 커밋(skip ci)하는 것까지만 수행. ArgoCD는 '배포 CD' — 그 커밋을 감지하면 prune+selfHeal로 클러스터에 자동 동기화합니다. 이 태그 치환 로직에서 실제로 버그가 2건 발생했습니다.",
      },
      {
        q: "ML 서비스를 왜 별도 마이크로서비스로 분리했나?",
        a: "scikit-learn 등 Python 생태계가 필요해 Node.js 백엔드와 언어가 다르고, 학습 파이프라인과 서빙 로직을 분리해두면 재학습이 백엔드 배포에 영향을 주지 않습니다. 백엔드는 이 서비스를 프록시 호출하고, 응답이 없거나 에러가 나면 조용히 규칙 기반 엔진으로 폴백하도록 설계해 장애를 격리했습니다.",
      },
    ],
    metrics: [
      { label: "에러율 (10~200명 전 구간)", value: "0%", sub: "k6로 10→30→50→100→200명 단계적 테스트" },
      { label: "p95 지연시간", value: "100명 8ms → 200명 119ms", sub: "200명 구간부터 급격히 증가" },
      { label: "p99 지연시간 (200명)", value: "364ms", sub: "노드 CPU 50~62%까지 상승" },
    ],
    troubleshooting: [
      {
        title: "EC2 단일 인스턴스의 실질적 부하 한계 확인",
        problem: "지금 스펙(EC2 단일 인스턴스, 2vCPU)이 동시 사용자 몇 명까지 안정적인지 알 수 없었습니다.",
        cause:
          "시민 대시보드 공개 API(/api/health, /api/stations, /api/weather)를 대상으로 k6 부하테스트를 10→30→50→100→200명 순으로 단계적으로 진행해 지연시간 추이를 측정했습니다.",
        fix: "100명까지는 p95 지연시간이 8ms 이내로 안정적이었지만, 200명 구간부터 p95 119ms·p99 364ms로 지연시간이 급격히 증가하는 것을 확인했습니다. 이 구간에서도 에러율은 0%를 유지했지만, 노드 CPU 사용률이 50~62%까지 상승했습니다.",
        lesson:
          "'괜찮다'를 정성적으로 말하기보다 몇 명부터 어떤 지표가 어떻게 나빠지는지 구체적인 숫자로 확인해두면, 다음에 어느 시점에서 스펙을 올려야 하는지 판단할 근거가 생깁니다.",
      },
      {
        title: "GitOps 이미지 태그 치환 버그 2건 → ImagePullBackOff",
        problem: "ArgoCD가 동기화한 파드가 ImagePullBackOff로 뜨지 않음.",
        cause:
          "매니페스트 치환용 sed 정규식이 ghcr.io/... 형식만 매칭해 로컬 개발용 이미지 표기를 놓치고 있었고, 수정 후에도 docker/metadata-action의 sha- prefix가 태그 치환 로직에 반영되지 않아 존재하지 않는 태그를 가리키고 있었습니다.",
        fix: "정규식을 태그 유무와 무관하게 매칭하도록 수정하고, 치환 로직에 sha- prefix를 반영했습니다.",
        lesson: "GitOps 자동화가 한 번 성공했다고 끝이 아니라, CI 도구가 실제로 만들어내는 태그 포맷을 명시적으로 확인해야 합니다.",
      },
      {
        title: "Grafana readiness probe 실패",
        problem: "kube-prometheus-stack 설치 직후 Grafana 컨테이너가 계속 Unhealthy(503).",
        cause:
          "처음엔 TLS 발급 직후의 스캐너 트래픽을 의심했으나 이는 흔한 배경 트래픽일 뿐이었습니다. 실제 원인은 Grafana 컨테이너 메모리를 128Mi 요청/256Mi 제한으로 너무 타이트하게 잡아, 사용량이 한도에 붙자 GC 압박으로 헬스체크가 실패한 것이었습니다.",
        fix: "helm upgrade로 256Mi 요청/768Mi 제한으로 상향했습니다.",
        lesson: "눈에 띄는 증상과 실제 원인을 혼동하지 않고, 리소스 사용량 수치를 직접 확인해서 진짜 원인을 좁혀야 합니다.",
      },
      {
        title: "로그인 리다이렉트 버그 — '고쳤는데 재현된다'",
        problem: "로그인이 필요한 기능 클릭 후 로그인하면 원래 페이지가 아니라 항상 /admin으로 이동.",
        cause:
          "1차 수정은 라우트 직접 접속 시나리오로는 검증을 통과했지만, 실사용 진입 경로(대시보드 버튼)로 재현해보니 버튼이 애초에 인증 가드를 거치지 않는 경로로 이동하고 있었던 게 진짜 원인이었습니다.",
        fix: "버튼의 이동 대상을 실제 보호된 라우트로 바꿔 인증 가드를 거치도록 수정했습니다.",
        lesson: "코드 경로를 고쳤다고 그 기능이 반드시 그 경로를 타는 건 아닙니다. 재현 시나리오를 실제 진입점까지 그대로 따라가야 합니다.",
      },
    ],
    evidence: [
      { key: "tram-dashboard", caption: "시민 대시보드 — 실시간 날씨, 정거장 지도, 재난/민원 관제 콘솔" },
      { key: "tram-admin", caption: "관리자 대시보드 — 정거장/로그/시나리오 통계, ArgoCD·Grafana 바로가기" },
      { key: "tram-simulation", caption: "정책 시뮬레이터 — 배차/버스감축 조정 → 예산·혼잡도·민원 위험 분석" },
      { key: "tram-prediction", caption: "혼잡도 예측 지도 — 규칙기반·ML 승객 수요 예측" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "scikit-learn",
      "Docker",
      "k3s",
      "ArgoCD",
      "Traefik",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
  },
  {
    id: "peakly",
    name: "Peakly",
    tagline: "감정 곡선 기반 영화 추천 서비스",
    status: "archived",
    statusLabel: "Archived",
    statusNote: "부트캠프 종료 후 팀 인프라가 정리되어 라이브 서버는 현재 종료된 상태입니다.",
    repo: "https://github.com/ITKIMJUNHEE/202605_KakaoCloud_AIaaS",
    role: "카카오클라우드 AIaaS 4기 부트캠프 · Team 4K",
    period: "ML(전처리·모델 학습) + 프론트엔드 일부 담당",
    overview:
      "영화 자막에서 장면별 감정(arousal/valence)을 추론해 '클라이맥스 그래프'를 그리고, 벡터 유사도로 취향 기반 추천을 제공하는 서비스. 카카오클라우드 VM 5대 위 K3s 클러스터에서 GitOps로 운영하며, 자막 수집부터 추천까지 이어지는 ML 파이프라인 설계와 모델 학습을 담당했습니다.",
    architecture: {
      diagram: "peakly-svg",
      description:
        "브라우저 요청은 4가지 경로로 나뉩니다 — 공개 읽기는 anon 키로 Supabase를 직접 호출(RLS로 행 단위 통제), 메인 영화 목록은 Next.js 서버가 캐싱해서 반환, 매니저 쓰기 작업은 세션 인증 후 FastAPI를 경유, 외부 고객의 점수 조회는 API 키 인증을 거쳐 별도 AI DB에 접근합니다.",
    },
    keyDecisions: [
      {
        q: "감정 라벨은 어떻게 만들었나?",
        a: "Claude(teacher)에게 영화 1편(씬 약 60개)을 한 번의 배치 요청으로 통째로 보여주고 0~1 절대 앵커로 arousal·valence를 채점하게 했습니다. 영화 전체를 한 번에 보여준 이유는 씬 간 상대적 강도를 teacher가 정확히 판단하게 하기 위함이고, Batch API로 비용을 절반으로 줄였습니다. 영화 약 172편 × 씬 약 60개, 총 1만 씬 규모였습니다.",
      },
      {
        q: "1차 모델에서 valence가 arousal보다 약했던 이유는?",
        a: "Teacher(LLM)는 영화 전체를 한꺼번에 보고 맥락으로 채점하지만, student(RoBERTa+MLP)는 씬을 하나씩 독립적으로 채점해 같은 대사도 앞뒤 맥락에 따라 뜻이 달라지는 걸 구분하지 못했습니다. 해결책으로 v1의 파인튜닝된 인코더를 고정하고 그 위에 BiLSTM 시퀀스 헤드를 추가해, 라벨 재사용만으로(추가 LLM 비용 0) 학생도 영화 전체 맥락을 보게 설계했습니다.",
      },
      {
        q: "부하테스트에서 찾은 병목과 해결은?",
        a: "영화 목록 API가 매 요청마다 단일 노드 DB를 직격해 약 700 동시 사용자에서 DB CPU가 100% 포화됐습니다. Next.js 라우트 레벨에 1시간 캐싱을 적용하자 같은 인프라에서 2,000 VU를 문제없이 통과했고, 이후 병목이 자동 확장 가능한 앱 노드로 옮겨가 약 3,600 VU까지 견뎠습니다.",
      },
      {
        q: "매니저 로그인 CAPTCHA는 왜 실패해도 로그인을 막지 않나?",
        a: "agami 위젯을 붙였지만 현재는 결과로 로그인을 차단하지 않고 실패 시 알림만 남깁니다. 오탐으로 관리자가 잠기는 상황을 피하기 위한 설계상 의도된 결정이며, 코드에도 이 의도를 명시하는 주석을 남겨뒀습니다.",
      },
    ],
    metrics: [
      { label: "모델 성능 (v1, n=5,646)", value: "MAE 0.088 / 0.090", sub: "arousal / valence" },
      { label: "영화내 Spearman", value: "0.751 / 0.660", sub: "arousal / valence" },
      { label: "부하테스트", value: "700 → 3,600 VU", sub: "라우트 캐싱 적용 후" },
    ],
    troubleshooting: [
      {
        title: "DB 단일 노드가 부하테스트 붕괴점을 결정",
        problem: "읽기 핫패스 부하테스트에서 약 700 VU 지점에서 자동중단(p95 3s 도달).",
        cause: "영화 목록 API가 요청마다 단일 노드 Supabase DB를 직격해 DB CPU가 100%로 포화됐습니다.",
        fix: "Next.js route handler에 1시간 캐싱을 적용해 캐시 히트 시 DB를 아예 건드리지 않도록 변경했습니다.",
        lesson: "캐싱 후 붕괴점이 700 VU에서 2,000 VU 완주로, p95는 4.53초에서 0.66초로 개선됐고 천장은 DB에서 자동 확장 가능한 앱 노드로 옮겨갔습니다.",
      },
      {
        title: "외부 점수 API 부하테스트 중 원인 불명의 hang",
        problem: "데이터 캐싱을 적용한 뒤에도 특정 VU 구간에서 요청이 그냥 멈추는(hang) 현상 발생.",
        cause:
          "서비스 문제로 의심했지만, 같은 부하 생성 VM으로 다른 엔드포인트(영화 목록)는 3,600 VU까지 문제없이 도달한다는 걸 확인하면서 원인이 부하 생성기 자체의 ulimit(1024) 한계였다는 게 드러났습니다.",
        fix: "부하 생성 VM의 ulimit·conntrack 설정을 올리고, 인증 조회 결과를 60초 캐싱, Supabase 커넥션 풀을 10에서 40으로 확장했습니다.",
        lesson: "'서버는 유휴 상태인데 요청이 멈춘다'면 서비스보다 부하 생성기 쪽 한계를 먼저 의심해야 합니다. 이후 붕괴점은 약 500 VU에서 약 3,777 VU로 개선됐습니다.",
      },
      {
        title: "일일 배치 체인의 실행 순서 버그",
        problem: "인기작 backfill과 자막 수집 CronJob의 실행 순서가 의도와 바뀌어 있었습니다.",
        cause: "두 배치의 cron 시각이 서로 뒤바뀐 채 설정되어 있어, 자막 수집이 backfill보다 먼저 돌아야 하는 순서가 지켜지지 않고 있었습니다.",
        fix: "cron 시각을 수정해 backfill → 자막 수집 → 파싱 → 스코어링 → 벡터화 순서를 바로잡았습니다 (ArgoCD 커밋 이력: fix: cronjob 시간 순서 수정).",
        lesson: "배치 파이프라인은 각 단계가 개별적으로는 성공해도 순서가 틀리면 전체 결과가 조용히 틀어질 수 있어, 실제 실행 시각을 주기적으로 점검할 필요가 있습니다.",
      },
    ],
    evidence: [
      { key: "argocd-applications-overview", caption: "ArgoCD — 전체 애플리케이션 GitOps 동기화 상태" },
      { key: "grafana-load-test-hpa", caption: "Grafana — 부하테스트 중 레플리카·노드 CPU·Pending 파드 대시보드" },
      { key: "supabase-schema-visualizer", caption: "Supabase — movies / movie_vectors 스키마 (pgvector)" },
      { key: "understand-peakly-architecture-map", caption: "코드베이스 지식그래프 — 레이어별 구조 시각화" },
    ],
    stack: [
      "Python",
      "PyTorch",
      "RoBERTa",
      "BiLSTM",
      "pgvector",
      "Next.js",
      "FastAPI",
      "Supabase",
      "K3s",
      "ArgoCD",
      "KServe",
      "Argo Workflows",
    ],
  },
];
