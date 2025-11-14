# 프로젝트 실행 방법

.env파일 생성
```
API_BASE_URL = BASE URL을 적어주세요
```

```bash
  npm install
  npm run dev
```




# 사용한 기술 스택

- next.js
- react(19.2.0)
- typescript
- recharts
- tailwindCSS
- zustand
- tanstack-query
- shadcn + lucide-react

# 주요 구현 기능 요약

## 게시판 기능

- [x] **게시글 작성 / 조회 / 수정 / 삭제 (CRUD)**
- [x] **검색**: 제목 및 본문 내용 검색
- [x] **페이지네이션**: 커서 기반 페이징
- [x] **정렬**: `title` 또는 `createdAt` 기준 오름/내림차순
- [x] **필터**: 카테고리(`category`)별 필터링
- [x] **금칙어 필터**: 아래 단어 포함 시 등록 불가`"캄보디아"`, `"프놈펜"`, `"불법체류"`, `"텔레그램"`

## 데이터 시각화 기능

**(1) 스택형 바 / 면적 차트 (`/mock/weekly-mood-trend`)**

- [x] X축: `week`
- [x] Y축: 백분율(%)
- [x] 각 항목(`happy`, `tired`, `stressed`)이 누적(Stacked) 형태로 표시

**(2) 멀티라인 차트 (`/mock/coffee-consumption`)**

- [x] X축: 커피 섭취량(잔/일)
- [x] 왼쪽 Y축: 버그 수(`bugs`)
- [x] 오른쪽 Y축: 생산성 점수(`productivity`)
- [x] 범례(Legend): 팀별 라인 구분
- [x] 각 팀(Frontend, Backend, AI 등)에 대해 **두 개의 라인** 표시
  - [x] 실선: 버그 수
  - [x] 점선: 생산성
  - [x] 동일 팀은 동일 색상 유지
- [x] 데이터 포인트 마커 표시:
  - [x] 원형 → 버그 수
  - [x] 사각형 → 생산성
- [x] 데이터 포인트 호버 시 툴팁에 호버된 라인의 포인트 X축에 해당하는 커피 잔수와 버그 수, 생산성 점수를 함께 표시

**(3) 도넛 차트 (`/mock/top-coffee-brands`)**

- 브랜드 별 `popularity`를 통해 도넛 차트 구현

**(4) 바 차트 (`/mock/top-coffee-brands`)**

- 브랜드 별 `popularity`를 통해 바 차트 구현
- X축: `brand`
- Y축: `popularity`

# 배포 링크

[Vercel](https://directional-alpha.vercel.app/)
