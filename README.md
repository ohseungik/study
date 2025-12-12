# 🚀 Frontend Mastery 6-Month Plan  
**React 19 / Next.js 15 / DX / Architecture / AI Integration**

---

## 📌 개요

이 프로젝트는 **6년차 프론트엔드 개발자**로서  
단순한 기술 학습을 넘어 **React 심화 → DX 개선 → 아키텍처 설계 → AI 연계 → 비즈니스 임팩트**까지  
전 영역을 커버하기 위한 6개월 성장 로드맵입니다.

각 주차마다 **공부 주제 + 실습 프로젝트 + 결과물**을 구성하여  
배운 내용을 바로 코드로 체화하는 것을 목표로 합니다.

---

## 🗓️ 전체 로드맵 개요

| 구간 | 주제 | 주요 산출물 |
|------|------|-------------|
| 1~4주 | React/Next.js 심화 | Server Components Playground |
| 5~8주 | DX & Design System | Storybook + Token System |
| 9~12주 | 프론트엔드 아키텍처 설계 | GraphQL + React Query 캐싱 대시보드 |
| 13~16주 | AI × Frontend 융합 | LLM Playground |
| 17~20주 | 비즈니스 임팩트 | A/B Test Dashboard |
| 21~24주 | 통합 & 포트폴리오 | 완성형 SaaS급 프로젝트 |

---

## 📍 1~4주차: React & Next.js 심화 (Core Deep Dive)

**🎯 목표:**  
React 19와 Next.js 15의 렌더링 구조를 완벽히 이해하고, Fiber 렌더링 구조를 시각화하는 툴 제작

**📚 학습 포인트**
- React 19 주요 변경점 (`use()`, Actions, Server Components)
- Fiber 구조 및 렌더링 파이프라인
- Next.js App Router, Edge Rendering, Streaming SSR

**⚙️ 프로젝트: `React Fiber Visualizer`**
- DevTools Hook을 이용해 Fiber 트리 추출
- React Flow로 Fiber 구조 시각화
- 변경 플래그(Placement, Update 등) 하이라이트 표시

**🧾 결과물**
- Server Components Playground
- Fiber 트리 시각화 웹앱 (React Flow 기반)

---

## 📍 5~8주차: DX & Design System (Developer Experience)

**🎯 목표:**  
개발 생산성을 높이는 내부용 UI 시스템과 코드 자동화를 구축

**📚 학습 포인트**
- Design Token 관리 (Figma ↔ Code Sync)
- Storybook 문서화, Controls, MDX 자동 생성
- 모노레포(Turborepo, Changeset) 구조
- CLI 자동 코드 생성기 제작

**⚙️ 프로젝트: `UI System + CLI Builder`**
- 공통 UI 컴포넌트 + Token 기반 스타일 시스템
- `create-ui` CLI 툴로 컴포넌트 스캐폴딩 자동화
- Storybook Docs 자동화 + npm 배포 환경 구성

**🧾 결과물**
- ✅ Storybook 가이드 (기초, Controls, MDX, Addons, Auto-Docs, Design Tokens)
- ✅ 실제 동작하는 컴포넌트 데모 페이지 (Button, Input, Card, Alert)
- ✅ TypeScript 기반 UI 컴포넌트 라이브러리
- 🔄 CLI Component Generator Tool (예정)

---

## 📍 9~12주차: 프론트엔드 아키텍처 설계 (Architecture)

**🎯 목표:**  
복잡한 데이터 흐름을 최적화하고, 효율적인 상태 관리 및 캐싱 구조 설계

**📚 학습 포인트**
- Zustand, Recoil, Jotai 비교
- React Query + Suspense 통합 구조
- GraphQL + Codegen + 캐싱 전략
- 퍼포먼스 분석 (Lighthouse, Web Vitals, Bundle Analyzer)

**⚙️ 프로젝트: `GraphQL Caching Dashboard`**
- React Query + GraphQL 통합 캐싱 레이어 구현
- 실시간 API 호출 시각화 및 성능 비교
- 상태 변화 / 요청 병합 / Suspense 활용 구조 설계

**🧾 결과물**
- GraphQL 캐싱 대시보드  
- Lighthouse & Performance Report Tool

---

## 📍 13~16주차: AI × Frontend 융합 (AI Integration)

**🎯 목표:**  
AI API를 활용해 대화형 UX를 설계하고, LLM 기반 Playground 개발

**📚 학습 포인트**
- OpenAI API, Vercel AI SDK, LangChain.js
- Prompt 설계 및 RAG 구조 이해
- Chat Stream UI / Prompt Result 저장 구조
- Embedding + 캐싱 전략 설계

**⚙️ 프로젝트: `LLM Prompt Playground`**
- JSON 기반 Prompt Builder
- 실시간 Chat Stream UI (React + Hooks)
- OpenAI API 연동 + 저장 기능
- Prompt 성능 비교 및 튜닝 기능 추가

**🧾 결과물**
- LLM Playground MVP  
- AI 기반 대화형 UI 프로토타입

---

## 📍 17~20주차: 비즈니스 임팩트 & 데이터 기반 개선

**🎯 목표:**  
사용자 행동 데이터를 기반으로 프론트엔드에서 제품 성과를 측정하고 개선

**📚 학습 포인트**
- 전환율, 퍼널, Retention 등 제품 지표 구조
- PostHog / Amplitude 이벤트 로깅
- React 기반 A/B 테스트 Hook 설계
- 데이터 시각화 및 Conversion Dashboard

**⚙️ 프로젝트: `A/B Test & Analytics Dashboard`**
- React Hook 기반 실험 도구
- 이벤트 트래킹 & PostHog 연동
- 지표 시각화 대시보드 (Recharts, ECharts)

**🧾 결과물**
- 사용자 행동 데이터 분석 대시보드  
- A/B 테스트 자동화 툴

---

## 📍 21~24주차: 통합 프로젝트 & 포트폴리오화

**🎯 목표:**  
6개월간의 기술을 하나의 완성형 서비스로 통합하여 배포

**📚 학습 포인트**
- 프로젝트 설계 / CI-CD / 배포 자동화
- Vercel + GitHub Actions + Docker Pipeline
- 문서화, PRD, README, Notion 포트폴리오 정리

**⚙️ 프로젝트: `AI-driven UI Platform`**
- AI 기반 UI 컴포넌트 시스템  
- Server Components + Token + AI + Dashboard 통합  
- 개인 포트폴리오 & 기술 문서화 완료

**🧾 결과물**
- 완성형 SaaS 수준 프로젝트  
- GitHub / Notion 포트폴리오 구성

---

## 🧭 사용 기술 스택

| 분야 | 기술 |
|------|------|
| **Frontend** | React 19, Next.js 15, TypeScript, Vite |
| **Design System** | Storybook, Tailwind, Style Dictionary |
| **State & Data** | React Query, Zustand, GraphQL, SWR |
| **AI Integration** | OpenAI API, LangChain.js, Vercel AI SDK |
| **Infra & Tools** | Turborepo, Changeset, GitHub Actions, Vercel |
| **Visualization** | React Flow, Recharts, D3.js |

---

## ✅ 현재 진행 상황

### 완료된 섹션
- ✅ **React 19 Features** (3개 예제)
  - use() Hook 비동기 데이터 처리
  - Actions & useTransition
  - Server Components 기본 구조
  
- ✅ **Fiber & 렌더링** (3개 예제)
  - Fiber 트리 구조 시각화
  - 렌더링 파이프라인
  - Work Loop 동작 원리
  
- ✅ **Next.js App Router** (6개 예제)
  - Server/Client Components 차이
  - Streaming & Suspense
  - Data Fetching & 캐싱
  - Route Handlers (API Routes)
  - Parallel Routes & Intercepting
  - Server Actions
  
- ✅ **Storybook 가이드** (6개 학습 페이지)
  - Storybook 기초 & CSF 3.0
  - Controls & Args
  - MDX 문서화
  - Addons (Docs, Actions, Viewport, A11y 등)
  - Auto-Docs 자동 생성
  - Design Tokens 통합

- ✅ **UI 컴포넌트 데모**
  - Button, Input, Card, Alert 컴포넌트
  - TypeScript + JSDoc 완벽 문서화
  - Storybook Stories 작성
  - 인터랙티브 라이브 데모 페이지

- ✅ **상태 관리 라이브러리 비교** (4개 예제)
  - Zustand: Provider-free 상태 관리
  - Recoil: Atom/Selector 패턴
  - Jotai: 원시 Atom 방식
  - 상세 코드 비교 페이지

- ✅ **React Query + Suspense** (1개 예제)
  - useSuspenseQuery 사용법
  - 병렬/중첩 데이터 로딩
  - 캐싱 전략 (staleTime, gcTime)
  - ErrorBoundary 통합

- ✅ **GraphQL + Codegen** (1개 예제)
  - GraphQL Schema 설계
  - Apollo Client 캐싱 전략
  - Codegen으로 타입 자동 생성
  - 정규화 & 최적화
  - 캐싱 전략 시뮬레이터

- ✅ **성능 분석 & 최적화** (1개 예제)
  - Web Vitals 실시간 모니터링 (LCP, FID, CLS, FCP, TTFB)
  - Lighthouse 성능 점수 시각화
  - Bundle Analyzer 번들 크기 분석
  - Performance API 활용
  - 최적화 체크리스트

### 진행 중
- 🔄 Design Token System 구축
- 🔄 CLI Component Generator

### 예정
- ⏳ React Query + GraphQL 아키텍처
- ⏳ LLM Playground
- ⏳ A/B Test Dashboard
- ⏳ AI 기반 통합 프로젝트  

---

## 📚 참고 자료

- [React Docs (v19 Canary)](https://react.dev/)
- [Next.js Official Docs](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Storybook Docs](https://storybook.js.org/)
- [LangChain.js Docs](https://js.langchain.com/docs/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [PostHog Analytics](https://posthog.com/)

---

## 🧩 향후 확장 아이디어

- React Compiler 정식 적용 (useMemo/useCallback 제거 실험)
- AI 기반 Storybook Docs 자동 생성
- 내부용 Lint/Codegen 패키지 배포
- 성능 모니터링 & 에러 추적 SaaS 확장

---

## 🏁 마무리

이 6개월 플랜은 단순한 학습이 아니라  
**“제품 수준의 프론트엔드 엔지니어로 성장하기 위한 여정”**입니다.  
각 주차의 결과물은 모두 독립적인 프로젝트로도 활용할 수 있으며,  
최종적으로 **AI 기반 UI 개발 플랫폼** 형태의 포트폴리오로 완성됩니다.

> 💡 *코드로 성장하고, 시각화하며, 자동화하자.*



---

## Sample 순서

- [1주차 예제: React 19 Features](https://study-5tn.pages.dev/react19-features)
- [1주차 예제: Fiber 구조 및 렌더링](https://study-5tn.pages.dev/fiber)
- [1주차 예제: Next.js App Router](https://study-5tn.pages.dev/app-router)