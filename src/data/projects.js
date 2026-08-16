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
        problem:
          "지금 스펙(EC2 단일 인스턴스, 2vCPU)이 동시 사용자 몇 명까지 안정적인지 감이 아니라 숫자로 알고 싶었습니다. 별도 장애가 발생한 상황은 아니고, 배포 전에 스스로 확인해둔 용량 조사입니다.",
        cause:
          "시민 대시보드 공개 API(/api/health, /api/stations, /api/weather)를 대상으로 k6 부하테스트를 10→30→50→100→200명 순으로 단계적으로 늘려가며 각 구간의 p95/p99 지연시간과 에러율을 측정했습니다. 동시에 Grafana로 노드 CPU 사용률을 함께 관찰해, 지연시간이 나빠지는 구간과 리소스 사용률이 오르는 구간이 실제로 맞물리는지 대조했습니다.",
        fix: "100명까지는 p95 지연시간이 8ms 이내로 안정적이었지만, 200명 구간부터 p95 119ms·p99 364ms로 지연시간이 급격히 증가하는 지점을 확인했습니다. 이 구간에서도 에러율은 0%를 유지했지만, 노드 CPU 사용률이 50~62%까지 상승하는 것과 맞물려 있어, 이 지점을 현재 스펙(EC2 단일 인스턴스, 2vCPU)의 실질적인 변곡점으로 결론짓고 문서화했습니다.",
        lesson:
          "'괜찮다'를 정성적으로 말하기보다 몇 명부터 어떤 지표가 어떻게 나빠지는지 구체적인 숫자로 확인해두면, 다음에 어느 시점에서 스펙을 올려야 하는지 판단할 근거가 생깁니다. 지연시간 하나만 보지 않고 리소스 사용률과 함께 대조한 게 '왜' 나빠지는지까지 설명할 수 있게 해줬습니다.",
      },
      {
        title: "GitOps 이미지 태그 치환 버그 2건 → ImagePullBackOff",
        problem:
          "ArgoCD가 매니페스트를 동기화했다는 로그는 남았는데, 실제 파드는 계속 ImagePullBackOff 상태에 머물러 있었습니다. kubectl describe pod로 확인해보니 이미지를 pull할 수 없다는 에러였습니다.",
        cause:
          "먼저 GHCR 인증 문제인가 의심했지만, 매니페스트에 박힌 이미지 태그 자체를 확인해보니 애초에 존재하지 않는 태그를 가리키고 있었습니다. 태그를 치환하는 sed 정규식을 들여다보니 ghcr.io/... 형식만 매칭하도록 짜여 있어서, 로컬 개발용 표기(image: 2026-tram-server:latest)를 걸러내지 못하고 있었던 게 1차 원인이었습니다 (커밋 3d93e8b로 수정). 이걸 고치고 다시 CI 로그를 확인했더니, 이번엔 docker/metadata-action이 실제로 만들어내는 태그가 sha-(short sha) 형태(prefix 포함)인데 치환 로직은 prefix 없이 넣고 있어서 또 다른 존재하지 않는 태그를 가리키고 있다는 걸 발견했습니다 (커밋 178d0fe).",
        fix: "정규식을 이미지명 뒤 태그 유무와 무관하게 매칭하도록 수정하고, 치환 스크립트에 sha- prefix를 명시적으로 반영했습니다. 두 커밋 모두 GitHub Actions 워크플로 안의 sed 치환 로직을 고친 것으로, ArgoCD 쪽 설정은 건드리지 않았습니다.",
        lesson:
          "GitOps 자동화가 한 번 성공했다고 끝이 아니라, CI 도구가 실제로 만들어내는 태그 포맷을 명시적으로 확인해야 합니다. 같은 증상(ImagePullBackOff)이라도 원인은 한 겹 더 있을 수 있어서, 첫 수정 후에도 실제 로그로 재확인하는 습관이 두 번째 버그를 잡아냈습니다.",
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
        problem:
          "1차 모델(RoBERTa+MLP)을 같은 test split(n=5,646)으로 평가했더니 arousal은 Pearson 0.796·영화내 Spearman 0.751인데, valence는 Pearson 0.738·Spearman 0.660으로 두 축의 정확도 격차가 뚜렷했습니다.",
        cause:
          "라벨을 만든 teacher(Claude)는 영화 전체 씬을 한 번에 보고 서사 맥락 속에서 채점하는데, student(RoBERTa+MLP)는 각 씬을 독립적으로(IID) 채점하고 있다는 구조적 차이를 먼저 의심했습니다. 실제로 v1이 쓰는 progress_ratio 피처를 뜯어보니 씬의 위치 좌표(0~1)일 뿐 '이웃 씬이 실제로 어떤 내용인지'는 담지 못하고 있었습니다. 같은 대사라도 앞뒤 맥락에 따라 valence가 정반대일 수 있는데, student는 이걸 구분할 방법이 없었다는 데까지 원인을 좁혔습니다.",
        fix: "라벨을 새로 만들지 않고(추가 LLM 비용 0), v1의 파인튜닝된 RoBERTa 인코더를 고정(freeze)해 특징 추출기로 재사용하고, 그 위에 양방향 BiLSTM(2층) 시퀀스 헤드를 새로 얹어 영화 전체 씬 시퀀스를 한 번에 보고 판단하도록 설계를 바꿨습니다(roberta-va-v2). 같은 test split으로 v1과 A/B 비교해 지표가 더 좋을 때만 promote하는 절차까지 설계해뒀습니다.",
        lesson:
          "정확도가 안 나올 때 곧바로 더 큰 모델이나 더 많은 라벨을 찾기보다, teacher와 student가 '보는 입력' 자체가 구조적으로 다른지부터 확인하면 더 저렴한 해결책(라벨 재사용 + 인코더 재사용)을 찾을 수 있습니다.",
      },
      {
        title: "부하테스트 중 DB 단일 노드가 붕괴점을 결정",
        problem: "읽기 핫패스 부하테스트에서 약 700 VU 지점에서 k6가 자동중단됐습니다(p95 3초 임계 도달).",
        cause:
          "처음엔 급경사 램프(1분에 400 VU)로 테스트했다가 31초·~210 VU에서 바로 중단됐는데, 이건 BE가 최소 1개 파드인 상태에서 급증을 맞아 HPA가 스케일업하기 전에 막힌 '부하 도구 자체의 아티팩트'라는 걸 확인하고 완만한 램프로 워크로드를 다시 설계했습니다. 다시 측정하니 병목은 db_movies 경로였고(p95 4.53초), Grafana로 노드별 CPU를 보니 vm4(DB) 하나만 CPU 100%에 붙어있고 앱 노드(vm2/vm3)는 40%대로 여유가 있어, 병목이 단일 DB 노드라는 걸 좁혔습니다.",
        fix: "영화 목록 API에 Next.js 라우트 레벨 캐싱(1시간)을 적용해 캐시 히트 시 DB를 아예 건드리지 않도록 바꿨습니다. 재측정 결과 700 VU에서 자동중단하던 것이 2,000 VU까지 완주했고(p95 4.53초 → 0.66초, vm4 CPU 100% → 20~25%), 이후 병목은 자동 확장 가능한 앱 노드로 옮겨가 약 3,600 VU까지 버텼습니다.",
        lesson:
          "부하테스트는 램프 설계에 따라 서비스가 아니라 테스트 도구 자체의 한계를 병목으로 잘못 짚을 수 있습니다. 그리고 병목은 추측하지 말고 경로별 지연시간(db_movies_ms vs fe_page_ms)과 노드별 CPU를 같이 봐야 정확히 좁힐 수 있었습니다.",
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
