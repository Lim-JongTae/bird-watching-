# Stitch 디자인 기반 Nuxt Form 리빌드

Stitch MCP에서 가져온 **2026 서산 천수만 탐조대회 모바일 참가신청 페이지** 디자인을 참고하여, 현재 Nuxt 프로젝트의 `app.vue`를 전면 리빌드합니다.

## 현재 상태
- 기존 `app.vue`: Google Form iframe 임베드 방식 → 자체 폼으로 전환
- 기술 스택: Nuxt 4 + @nuxt/ui v4 + Tailwind CSS v4 + Pretendard 폰트

## Stitch 디자인 핵심 요소
| 섹션 | 설명 |
|------|------|
| **TopBar** | 진한 그린 배경, 조직명 표시, "신청서 작성" 앵커 버튼 |
| **HeroBanner** | 천수만 철새 이미지 + 그래디언트 오버레이, 접수 기간 배지, 일시/장소/모집/참가비 4개 정보 카드 |
| **NoticeBanner** | 국제대회 전환 안내 (amber 배경) |
| **ProgramFeatures** | 대회 운영 방식 3개 카드 (탐조 룰, 초보자 혜택, 시상) |
| **ScheduleTimeline** | 1박2일 세부 일정 (1일차/2일차 카드) |
| **GuideAndBank** | 참가 세부 요강 & 혜택 (참가비, 포함내역, 입금계좌, 이동 안내) |
| **ApplicationForm** | 자체 폼 (팀 구분 라디오, 팀명, 대표자 성명/연락처/이메일, 참가 인원, 팀원 명단, 차량 형태, 특이사항, 개인정보 동의, 제출 버튼) |
| **FloatingCTA** | 하단 고정 "참가 신청하기" 버튼 |
| **SuccessModal** | 제출 완료 모달 |
| **Footer** | 주최·주관, 문의 정보 |

## Proposed Changes

### 데이터 레이어

#### [MODIFY] [event.json](file:///c:/Users/LimJongTae/Downloads/ai_temp/Project/Nuxt-Form/app/data/event.json)
- Stitch 디자인의 프로그램 특징, 안내 배너 등 추가 데이터 확장
- 폼 필드 기본값 및 참가비 옵션 추가

---

### UI 컴포넌트 (새로 생성)

#### [NEW] `app/components/TopBar.vue`
- 진한 그린 sticky 헤더, 조직명 + "신청서 작성" 앵커 버튼

#### [NEW] `app/components/HeroBanner.vue`
- 배경 이미지 + 그래디언트 오버레이
- 접수 기간 배지, 제목, 4개 정보 그리드 카드

#### [NEW] `app/components/NoticeBanner.vue`
- 국제대회 전환 안내 배너 (amber 테마)

#### [NEW] `app/components/ProgramFeatures.vue`
- 대회 운영 방식 & 시상 요강 카드 3개

#### [NEW] `app/components/ScheduleTimeline.vue`
- 1일차/2일차 세부 일정 타임라인 카드

#### [NEW] `app/components/GuideAndBank.vue`
- 참가비, 포함 내역, 입금 계좌, 이동 안내

#### [NEW] `app/components/ApplicationForm.vue`
- 자체 폼 (Google Form iframe 대체)
- 팀 구분 라디오, 텍스트 입력, select, textarea, 체크박스
- 클라이언트 사이드 validation
- 제출 시 SuccessModal 표시

#### [NEW] `app/components/SuccessModal.vue`
- 접수 완료 확인 모달

#### [NEW] `app/components/FloatingCTA.vue`
- 하단 고정 플로팅 신청 버튼

#### [NEW] `app/components/SiteFooter.vue`
- 주최·주관, 문의, 계좌 정보, 맨 위로 버튼

---

### 메인 페이지

#### [MODIFY] [app.vue](file:///c:/Users/LimJongTae/Downloads/ai_temp/Project/Nuxt-Form/app/app.vue)
- 위 컴포넌트들을 조합하는 모바일 우선 레이아웃
- `mobile-container` 패턴 (max-width 440px 중앙 배치)

---

### 스타일

#### [MODIFY] [main.css](file:///c:/Users/LimJongTae/Downloads/ai_temp/Project/Nuxt-Form/app/assets/css/main.css)
- Pretendard 폰트 import
- 커스텀 색상 변수 (brand-green, brand-orange 등)
- mobile-container, badge-blur 등 커스텀 유틸리티

---

### Nuxt 설정

#### [MODIFY] [nuxt.config.ts](file:///c:/Users/LimJongTae/Downloads/ai_temp/Project/Nuxt-Form/nuxt.config.ts)
- Pretendard 폰트 CDN 추가
- tailwindcss 색상 확장 설정

## Verification Plan

### Manual Verification
- `npm run dev`로 로컬 실행 후 브라우저에서 확인
- 모바일 뷰포트(440px)에서 디자인 확인
- 폼 입력 및 제출 인터랙션 테스트
- 플로팅 CTA 버튼 동작 확인
