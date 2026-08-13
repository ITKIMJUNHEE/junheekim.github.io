# junheekim.cloud

김준희 포트폴리오 사이트. React + Vite, "라이브 시스템 대시보드" 컨셉으로 제작.

## 로컬 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages에 배포합니다.

커스텀 도메인은 `public/CNAME`(`junheekim.cloud`)으로 설정되어 있습니다. 최초 배포 후 GitHub 저장소
Settings → Pages에서 Custom domain이 반영됐는지 확인하고 Enforce HTTPS를 켜주세요. 가비아 DNS에는
A 레코드 4개(`185.199.108.153` / `.109.153` / `.110.153` / `.111.153`)를 `@`에, CNAME
`junheekim.github.io`를 `www`에 등록해야 합니다.
