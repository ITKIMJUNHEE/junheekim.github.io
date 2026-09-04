# proposals

`/proposals` 페이지의 "PDF 다운로드" 버튼이 참조하는 실제 파일을 넣는 폴더입니다.
아래 3개 파일을 이 폴더에 그대로 추가하면 다운로드 버튼이 바로 동작합니다.

- proposal-1-aws-adoption.pdf
- proposal-2-kakaocloud-gpu.pdf
- proposal-3-azure-reliability.pdf

이 폴더는 Vite의 `public/` 디렉터리라 빌드 시 그대로 `dist/proposals/`로 복사되어
`https://junheekim.cloud/proposals/<파일명>.pdf`로 서빙됩니다.
