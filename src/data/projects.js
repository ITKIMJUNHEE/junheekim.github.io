export const projects = [
  {
    id: "oasis-tram",
    name: "Oasis Tram",
    tagline: "대전 트램 AI 정책 시뮬레이션 & 관제 플랫폼",
    status: "archived",
    statusLabel: "Archived",
    repo: "https://github.com/ITKIMJUNHEE/2026-tram",
    role: "Korail AI 해커톤 4인 팀 · 이후 팀원들과 역할 분담해 프로덕션 확장, 본인은 인프라 담당",
    overview:
      "정거장 좌표·시뮬레이션 로직이 프론트엔드에 하드코딩된 정적 프로토타입을 Korail AI 해커톤에서 4인 팀으로 만들었습니다. Korail 해커톤 이후 팀원들과 역할을 나눠 프로덕션급 확장을 진행했고, 본인은 인프라를 담당해 React+Express+PostgreSQL 풀스택 배포, k3s+ArgoCD GitOps 파이프라인, Prometheus+Grafana 모니터링을 구축했습니다. JWT 인증 관제 시스템과 Python ML 수요 예측 서비스도 이 확장 과정에서 함께 갖춰졌습니다.",
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
        a: "scikit-learn 등 Python 생태계가 필요해 Node.js 백엔드와 언어가 다르고, 학습 파이프라인과 서빙 로직을 분리해두면 재학습이 백엔드 배포에 영향을 주지 않습니다. 백엔드는 이 서비스를 프록시 호출하고, 응답이 없거나 에러가 나면 조용히 규칙 기반 엔진으로 폴백하도록 설계해 장애를 격리했습니다. 학습 데이터도 정직하게 골랐는데, 실제 서비스에 쌓인 데이터(정책 결정 로그 등)를 뜯어보니 정거장별 수치 학습에 쓸 수 있는 형태가 아니어서, 무리하게 끼워 맞추는 대신 합성 데이터만으로 학습(MAE 226.7명, R² 0.985)하고 그 사실을 그대로 문서에 남겼습니다.",
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
        situation:
          "서비스를 배포해두긴 했지만, 지금 스펙(EC2 단일 인스턴스, 2vCPU)이 동시 사용자 몇 명까지 안정적으로 버티는지 감이 아니라 숫자로 알고 싶었습니다.",
        task: "k6로 실제 부하테스트를 설계하고, 어느 지점부터 성능이 눈에 띄게 나빠지는지 정량적으로 확인해야 했습니다.",
        action:
          "시민 대시보드 공개 API를 대상으로 10→30→50→100→200명 순으로 단계적으로 부하를 올리면서, 동시에 Grafana로 노드 CPU 사용률을 관찰해 지연시간이 나빠지는 구간과 리소스 사용률이 오르는 구간이 실제로 맞물리는지 대조했습니다.",
        result:
          "100명까지는 p95 8ms로 안정적이었지만 200명부터 p95 119ms·p99 364ms로 급격히 나빠지고 노드 CPU도 50~62%까지 오르는 걸 확인해, 이 지점을 현재 스펙의 실질적 한계로 문서화했습니다. '괜찮다'를 감이 아니라 숫자로 말하는 습관이 생겼고, 지연시간만 보지 않고 리소스 사용률과 함께 대조한 게 '왜' 나빠지는지까지 설명할 수 있게 해줬습니다.",
      },
      {
        title: "workflow 파일을 고친 push가 이유 없이 거부됨",
        situation:
          "GitOps 파이프라인을 처음 구성하면서 .github/workflows/ci.yml 자체를 수정한 커밋을 개인 액세스 토큰(PAT)으로 push했는데, GitHub이 이렇게 거부했습니다 — \"refusing to allow a Personal Access Token to create or update workflow ci.yml without workflow scope\".",
        task: "다른 파일은 멀쩡히 push되는데 워크플로 파일만 거부되는 이유를 찾아야 했습니다.",
        action:
          "에러 메시지를 그대로 읽어보니 원인은 명확히 적혀 있었습니다 — 워크플로 파일 자체를 변경하는 push는 PAT에 workflow 스코프가 있어야 한다는 GitHub의 정책이었습니다. PAT 발급 설정으로 가서 스코프를 다시 확인했습니다.",
        result:
          "PAT에 workflow 스코프를 추가해 발급하니 바로 해결됐습니다. 별것 아닌 문제였지만, 에러 메시지를 지레짐작으로 넘기지 않고 그대로 읽는 게 가장 빠른 진단이라는 걸 다시 확인한 경험이었고, 이후로는 CI 관련 토큰을 발급할 때 필요한 스코프를 먼저 점검하게 됐습니다.",
      },
    ],
    growth: {
      before: "이 프로젝트 전에는 로컬 개발이나 단일 서버에 SSH로 배포하는 수준의 경험만 있었고, k3s·ArgoCD·GitOps 같은 개념은 이름만 들어본 정도였습니다.",
      how: "처음엔 'git push 한 번으로 서버에 SSH 접속해서 배포하면 되는데 왜 굳이 이런 구조를 만드나' 싶었지만, 직접 GitOps 파이프라인을 만들어보면서 배포 이력이 곧 git 커밋 이력이 된다는 게 롤백·감사 추적·재현성 면에서 왜 중요한지 체감했습니다. ArgoCD의 selfHeal·prune 옵션을 켜고 끄면서 클러스터 상태를 선언적으로 관리하는 것과 명령형으로 하나씩 배포하는 것의 차이도 직접 겪으며 이해했습니다.",
      forward:
        "코드를 배포 가능한 상태로 만드는 것과, 그 배포를 안정적으로 반복 가능하게 만드는 것은 서로 다른 기술이라는 걸 알게 됐습니다. 후자(배포 자동화, 관측성, 장애 대응)에 더 흥미를 느꼈고, 이 경험이 클라우드 인프라 쪽으로 방향을 잡는 계기가 됐습니다.",
    },
    evidence: [
      { key: "korail-hackathon-award-team", caption: "Korail AI 해커톤 2025 최우수상(2등) — 4인 팀 수상 사진" },
      { key: "tram-dashboard", caption: "시민 대시보드 — 실시간 날씨, 정거장 지도, 재난/민원 관제 콘솔" },
      { key: "tram-admin", caption: "관리자 대시보드 — 정거장/로그/시나리오 통계, ArgoCD·Grafana 바로가기" },
      { key: "tram-simulation", caption: "정책 시뮬레이터 — 배차/버스감축 조정 → 예산·혼잡도·민원 위험 분석" },
      { key: "tram-prediction", caption: "혼잡도 예측 지도 — 규칙기반·ML 승객 수요 예측" },
    ],
    stack: [
      "k3s",
      "ArgoCD",
      "Traefik",
      "Prometheus",
      "Grafana",
      "Docker",
      "GitHub Actions",
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "scikit-learn",
    ],
  },
  {
    id: "peakly",
    name: "Peakly",
    tagline: "감정 곡선 기반 영화 추천 서비스",
    status: "archived",
    statusLabel: "Archived",
    repo: "https://github.com/ITKIMJUNHEE/202605_KakaoCloud_AIaaS",
    role: "카카오클라우드 AIaaS 4기 부트캠프 · Team 4K",
    overview:
      "영화 자막에서 장면별 감정(arousal/valence)을 추론해 '클라이맥스 그래프'를 그리고, 벡터 유사도로 취향 기반 추천을 제공하는 서비스입니다. 카카오클라우드 VM 5대 위 K3s 클러스터에서 ArgoCD GitOps로 운영했습니다. 본인 역할은 프론트엔드와 ML(전처리·모델 학습)이 메인이었지만, 팀 인프라 세팅 과정에도 참여하며 GitOps·Kubernetes 운영을 직접 배웠습니다.",
    architecture: {
      diagram: "peakly-images",
      description:
        "브라우저 요청은 4가지 경로로 나뉩니다 — 공개 읽기는 anon 키로 Supabase를 직접 호출(RLS로 행 단위 통제), 메인 영화 목록은 Next.js 서버가 캐싱해서 반환, 매니저 쓰기 작업은 세션 인증 후 FastAPI를 경유, 외부 고객의 점수 조회는 API 키 인증을 거쳐 별도 AI DB에 접근합니다. 인프라는 카카오클라우드 VM 5대로 나뉘어 있고(앱 2대, DB 1대, GPU/AI 1대, 컨트롤플레인 1대), ArgoCD가 이 전체를 GitOps로 동기화합니다.",
    },
    keyDecisions: [
      {
        q: "감정 라벨은 어떻게 만들었나?",
        a: "Claude(teacher)에게 영화 1편(씬 약 60개)을 한 번의 배치 요청으로 통째로 보여주고 0~1 절대 앵커로 arousal·valence를 채점하게 했습니다. 영화 전체를 한 번에 보여준 이유는 씬 간 상대적 강도를 teacher가 정확히 판단하게 하기 위함이고, Batch API로 비용을 절반으로 줄였습니다. 영화 약 172편 × 씬 약 60개, 총 1만 씬 규모였습니다.",
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
        title: "1차 모델의 valence 정확도가 눈에 띄게 약함",
        situation:
          "1차 모델(RoBERTa+MLP)을 평가해보니 arousal은 Pearson 0.796·영화내 Spearman 0.751로 꽤 잘 맞는데, valence는 Pearson 0.738·Spearman 0.660으로 유독 약했습니다.",
        task: "두 축이 구조적으로 똑같은 모델인데 왜 한쪽만 눈에 띄게 약한지 원인을 좁혀야 했습니다.",
        action:
          "라벨을 만든 teacher(Claude)는 영화 전체를 한 번에 보고 맥락 속에서 채점하는데, 저희 student 모델은 장면을 하나씩 독립적으로 채점하고 있다는 구조적 차이를 의심했습니다. 실제로 모델이 쓰는 피처를 들여다보니 장면의 '위치'만 알 뿐 '앞뒤에 어떤 내용이 있었는지'는 전혀 모르고 있었고, 그래서 같은 대사도 문맥에 따라 반대 감정일 수 있는 걸 구분하지 못한다는 데까지 원인을 좁혔습니다.",
        result:
          "라벨을 새로 만들지 않고, 기존 인코더를 고정한 채 그 위에 영화 전체 시퀀스를 한 번에 보는 BiLSTM 헤드를 얹는 방식으로 설계를 바꿨습니다. 정확도가 안 나올 때 무조건 더 큰 모델을 찾기보다, 모델이 실제로 '무엇을 보고 있는지'부터 점검하면 더 저렴한 해결책을 찾을 수 있다는 걸 배웠습니다.",
      },
      {
        title: "부하테스트 중 DB 단일 노드가 붕괴점을 결정",
        situation: "부하테스트 중 약 700명 동시 사용자 지점에서 서비스가 버티지 못하고 응답이 급격히 느려지기 시작했습니다.",
        task: "병목이 정확히 어디에 있는지 짚어내야 다음 확장 방향을 잡을 수 있었습니다.",
        action:
          "처음엔 부하를 급하게 올리는 방식으로 테스트했다가 너무 빨리 중단돼서, 이게 실제 서비스 한계가 아니라 테스트 방식 자체의 문제라는 걸 깨닫고 부하를 완만하게 올리도록 다시 설계했습니다. 이후 경로별 지연시간과 노드별 CPU 사용률을 같이 보면서, 문제가 앱 서버가 아니라 단일 DB 노드에 몰려 있다는 걸 확인했습니다.",
        result:
          "자주 조회되는 영화 목록 API에 캐싱을 붙여 DB를 아예 거치지 않게 만들자, 같은 인프라에서 버틸 수 있는 동시 사용자 수가 700명에서 3,600명까지 늘었습니다. 부하테스트는 테스트 방식 자체가 결과를 왜곡할 수 있다는 것, 병목은 추측하지 말고 경로별로 직접 확인해야 한다는 걸 배웠습니다.",
      },
    ],
    growth: {
      before:
        "부트캠프 이전에는 Kubernetes나 ArgoCD를 실제로 다뤄본 적이 없었습니다. 이 프로젝트에서도 제 메인 역할은 프론트엔드와 ML이었지만, 팀의 인프라 세팅 과정을 옆에서 지켜만 보지 않고 매니페스트를 같이 리뷰하고 왜 이렇게 구성했는지 팀원에게 묻고 다녔습니다.",
      how: "VM 5대에 걸쳐 네임스페이스를 어떻게 나누는지, ArgoCD Application을 앱 단위로 어떻게 쪼개는지, Supabase를 왜 2개(서비스용/AI용)로 분리해서 보안 경계를 인프라 레벨에서 긋는지 같은 결정들을 매니페스트와 팀원 설명을 통해 하나씩 이해해갔습니다. 직접 만든 코드가 실제로 5대의 서버에 걸쳐 배포·운영되는 걸 보면서 'ML 모델을 만드는 것'과 '그 모델을 안정적으로 서빙하는 인프라를 만드는 것'이 완전히 다른 스킬이라는 걸 깨달았습니다.",
      forward:
        "Oasis Tram에서 막 생기기 시작한 인프라 쪽 관심이, 이 프로젝트에서 실제 팀 규모의 GitOps 운영을 직접 보면서 훨씬 구체적으로 굳어졌습니다. 무언가를 만드는 것보다, 여러 사람이 만든 걸 안정적으로 돌아가게 하는 쪽에 더 끌린다는 걸 확인한 프로젝트였습니다.",
    },
    evidence: [
      { key: "peakly-climax-graph", group: "서비스 화면", caption: "클라이맥스 그래프 — 장면 감정(arousal) 타임라인 시각화" },
      { key: "peakly-graph-comparison", group: "서비스 화면", caption: "그래프 비교 추천 — pgvector 코사인 유사도 기반" },
      { key: "peakly-filter-bar", group: "서비스 화면", caption: "필터바 — 정렬·필터·검색" },
      { key: "peakly-onboarding", group: "서비스 화면", caption: "온보딩 — 첫 방문 안내" },
      { key: "peakly-manager-login", group: "매니저 콘솔", caption: "매니저 로그인 — 세션 인증" },
      { key: "peakly-manager-dashboard", group: "매니저 콘솔", caption: "대시보드 — 방문 통계·모델 지표(MAE/Spearman)" },
      { key: "peakly-manager-api-keys", group: "매니저 콘솔", caption: "API 키 관리" },
    ],
    stack: [
      "K3s",
      "ArgoCD",
      "Argo Workflows",
      "KServe",
      "Python",
      "PyTorch",
      "RoBERTa",
      "BiLSTM",
      "pgvector",
      "Next.js",
      "FastAPI",
      "Supabase",
    ],
  },
  {
    id: "fbrl",
    name: "FBRL",
    tagline: "금융 백엔드 신뢰성 검증 실험 플랫폼 (Financial Backend Reliability Lab)",
    status: "stable",
    statusLabel: "Stable",
    repo: "https://github.com/fbrlTeam/fbrl-infra",
    role: "3인 팀 · Infra / SRE 담당",
    overview:
      "금융 거래의 신뢰성·분산 동시성 제어·장애 복구 메커니즘을 직접 구현하고 검증하기 위한 백엔드 실험 플랫폼입니다. 실제 서비스가 아니라, 분산 락·Saga·EOD 배치·Kafka CDC 기반 이벤트 발행 같은 금융 백엔드 신뢰성 패턴을 헥사고날 아키텍처 위에서 검증하는 게 목적입니다. 3인 팀(백엔드 1명, 프론트엔드 1명, 인프라 1명)으로 진행 중이며, 본인은 Azure 인프라 구축·Kubernetes 배포·CI/CD, 그리고 백엔드가 구현한 신뢰성 메커니즘이 실제 장애 상황에서도 동작하는지 검증하는 Infra/SRE 역할을 맡고 있습니다.",
    architecture: {
      diagram: "none",
      description:
        "GitHub Actions가 fbrl-backend를 빌드해 Azure Container Registry에 푸시하고, Azure VM 위 k3s 클러스터에 self-hosted runner가 직접 배포합니다. Traefik이 Let's Encrypt(ACME HTTP-01)로 HTTPS를 발급해 백엔드를 노출하고, 프론트엔드는 Azure Static Web Apps로 별도 배포됩니다. 상태를 직접 들고 있는 Postgres(운영/데모 2대)와 Redis는 Azure 관리형 서비스로 분리했고, Kafka·Kafka Connect만 k3s 안에서 직접 운영하며 Debezium이 PostgreSQL 논리적 복제(WAL) 기반으로 Outbox 이벤트를 Kafka로 발행합니다.",
    },
    keyDecisions: [
      {
        q: "18개에 달하는 Azure 리소스를 왜 Terraform으로 관리했나?",
        a: "VM+k3s, Postgres Flexible Server 2대(운영/데모), Azure Managed Redis, ACR, Static Web Apps까지 손으로 만들면 재현이 안 되고, 실수로 리소스를 지웠을 때 복구도 어렵습니다. 코드로 관리해두면 전체 리소스 구성을 한눈에 볼 수 있고, 나중에 같은 환경을 다시 만들 때도 재현 가능하다는 게 핵심 이유였습니다.",
      },
      {
        q: "Kafka·Kafka Connect만 k3s로 옮기고 Postgres·Redis는 왜 Azure 관리형으로 남겼나?",
        a: "상태를 직접 들고 있는 저장소(DB, 캐시)는 관리형 서비스에 맡기고, 상대적으로 무상태에 가까운 메시징 계층만 직접 운영하며 배운다는 원칙을 세웠습니다. 관리형 서비스의 백업·장애조치까지 직접 구현하는 건 이 프로젝트의 학습 목표가 아니었습니다.",
      },
      {
        q: "Chaos Mesh를 먼저 설치하지 않고 왜 수동으로 장애를 주입했나?",
        a: "Chaos Mesh 도입은 로드맵에 있지만, 도구부터 세팅하기보다 검증하고 싶은 질문(Kafka가 죽으면 얼마나 걸려 복구되는가, Saga 보상 트랜잭션이 실제로 동작하는가, 배치가 중간에 죽으면 재개할 수 있는가)을 먼저 명확히 하기로 했습니다. docker stop·kill -9 같은 수동 방식으로 3개 시나리오를 먼저 검증해 실제로 뭘 확인해야 하는지 파악한 뒤, Chaos Mesh는 이 수동 검증을 반복 가능하게 만드는 다음 단계로 남겨뒀습니다.",
      },
    ],
    metrics: [
      { label: "Kafka 장애 복구", value: "브로커 22초 · CDC 5분14초", sub: "리밸런스 지연으로 인한 격차" },
      { label: "EOD 배치 강제종료 재개", value: "5,000건 · 중복 0 · 누락 0", sub: "kill -9 후 수동 개입으로 복구" },
      { label: "Terraform 관리 리소스", value: "18개", sub: "Azure VM·Postgres×2·Redis·ACR·SWA" },
    ],
    troubleshooting: [
      {
        title: "VM 재시작 후 Kafka Connect 커넥터가 통째로 사라짐",
        situation:
          "작업 종료 전 최종 상태를 캡처하려는데, Kafka Connect에 등록해둔 main/demo 커넥터가 둘 다 사라져 있는 걸 발견했습니다. 설정은 분명 토픽 기반으로 영속화되도록 구성해뒀는데도 그랬습니다.",
        task: "재부팅 한 번에 왜 영속화된 설정이 통째로 날아갔는지 원인을 찾아야 했습니다.",
        action:
          "VM이 예기치 않게 재부팅되면서 Kafka와 Kafka Connect가 동시에 재시작된 로그를 확인했습니다. Kafka Connect가 설정 저장 토픽을 읽는 시점이 Kafka 브로커의 로그 복구가 끝나기도 전이라, 커넥터가 없는 '빈 상태'로 스냅샷을 찍어버리는 레이스 컨디션이라는 걸 확인했습니다. 실제 데이터는 브로커에 그대로 남아있었고, 설정 자체가 아니라 시작 순서 문제였습니다.",
        result:
          "재시작마다 반복될 수 있는 문제라고 판단해, 커넥터 상태를 확인하고 없으면 자동으로 재등록하는 스크립트를 만들어 실제로 커넥터를 강제로 지운 뒤 재등록되는 것까지 검증하고 커밋했습니다. '설정이 영속화되어 있다'와 '재시작 후에도 그 순서대로 복구된다'는 서로 다른 문제라는 걸 확인한 경험이었습니다.",
      },
      {
        title: "커넥터 재등록 중 발생한 비밀번호 평문 노출 사고",
        situation:
          "위 문제로 커넥터를 재등록하는 과정에서, 등록 응답에 DB 비밀번호가 마스킹 없이 그대로 노출되는 걸 뒤늦게 발견했습니다.",
        task: "이미 노출된 비밀번호를 어디까지 되돌려야 안전한지 판단하고, 같은 실수가 재발하지 않게 만들어야 했습니다.",
        action:
          "노출 범위를 지레짐작하지 않고 Postgres 서버 레벨 비밀번호부터 IaC 변수(terraform.tfvars), k3s Secret, 그 값을 참조하는 커넥터 설정과 백엔드 Pod까지 전 구간을 순서대로 교체했습니다. 커넥터 등록 시 요청 본문은 서버 쪽에서만 값을 채우고, 응답은 비밀번호를 마스킹한 뒤에만 확인하는 걸 표준 절차로 만들었습니다.",
        result:
          "전 구간 교체 후 재검증까지 마쳤습니다. 이후로는 시크릿을 다룰 때 커맨드라인 인자(--from-literal)처럼 셸 히스토리나 프로세스 목록에 남는 방식 대신, stdin으로만 흘려보내는 방식을 기본으로 쓰게 됐습니다.",
      },
    ],
    growth: {
      before:
        "이전에는 Terraform·Kubernetes를 문서로만 익혔고, 여러 클라우드 리소스를 한 번에 관리하거나 실제 장애를 재현해본 적은 없었습니다.",
      how: "Azure에 18개 리소스를 Terraform으로 직접 구성하고, VM 재부팅·비밀번호 노출 같은 예상 못 한 사고를 실시간으로 겪으며 대응하는 과정에서 '설계한 대로 동작하는지'와 '실제로 재시작·장애 후에도 그 상태를 유지하는지'는 완전히 다른 질문이라는 걸 체감했습니다. Kafka 다운 시 브로커 복구(22초)와 CDC 파이프라인 정상화(5분14초) 사이의 격차처럼, 컴포넌트 하나하나가 아니라 컴포넌트 사이의 복구 시간 차이를 직접 재고 나서야 보이는 문제들이 있다는 것도 배웠습니다.",
      forward:
        "Oasis Tram과 Peakly를 거치며 넓어진 인프라 관심이, 이 프로젝트에서 실제 장애를 만들고 대응하는 과정을 통해 SRE/신뢰성 쪽으로 더 구체화됐습니다. 클라우드 인프라를 만드는 것만큼, 만든 인프라가 실패 상황에서 어떻게 행동하는지 검증하는 일에 흥미를 느낀다는 걸 확인한 프로젝트였습니다.",
    },
    evidence: [
      { key: "fbrl-acr-overview", caption: "Azure Container Registry — fbrl-backend 이미지 태그·매니페스트" },
      { key: "fbrl-kafka-connect-status", caption: "k3s 위 Kafka Connect — main/demo 커넥터 RUNNING 상태" },
      { key: "fbrl-postgres-overview", caption: "Azure Postgres Flexible Server — 운영 DB 개요" },
    ],
    stack: [
      "Azure",
      "Terraform",
      "k3s",
      "Traefik",
      "GitHub Actions",
      "Docker",
      "Kafka",
      "Kafka Connect",
      "Debezium",
      "Redis",
      "PostgreSQL",
      "Jaeger",
      "Spring Boot",
    ],
  },
];
