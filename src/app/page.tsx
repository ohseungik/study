import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Frontend Mastery
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          React 19 / Next.js 16 심화 학습 프로젝트
        </p>
        <div className="p-4 bg-blue-50 rounded-lg inline-block">
          <p className="text-blue-900 font-medium">
            🚀 6개월 성장 로드맵의 1단계: React 19 Core Deep Dive
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link 
          href="/react19-features"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
              ⚛️ React 19 기능
            </h2>
            <p className="text-gray-600 mt-2">
              use() Hook, Actions, Server Components 심화 학습
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>use() Hook 예제 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Actions 예제 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Server Components 예제 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-blue-600 group-hover:text-blue-800">
            시작하기 →
          </div>
        </Link>

        <Link
          href="/fiber"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
              🧵 Fiber & 렌더링 파이프라인
            </h2>
            <p className="text-gray-600 mt-2">
              React의 핵심 엔진 Fiber 구조와 렌더링 과정 시각화
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Fiber 트리 구조 시각화 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>렌더링 파이프라인 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Work Loop 동작 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-blue-600 group-hover:text-blue-800">
            시작하기 →
          </div>
        </Link>

        <Link
          href="/app-router"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
              🚀 Next.js App Router
            </h2>
            <p className="text-gray-600 mt-2">
              App Router의 핵심 기능과 패턴 마스터하기
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Server/Client Components (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Streaming & Suspense (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Data Fetching & Server Actions (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-blue-600 group-hover:text-blue-800">
            시작하기 →
          </div>
        </Link>

        <Link
          href="/storybook-guide"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
              📚 Storybook 가이드
            </h2>
            <p className="text-gray-600 mt-2">
              컴포넌트 문서화의 모든 것: CSF 3.0, Controls, MDX, Auto-Docs
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>기초 & CSF 3.0 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Controls & MDX (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Addons & Design Tokens (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-blue-600 group-hover:text-blue-800">
            가이드 보기 →
          </div>
        </Link>

        <Link
          href="/storybook-demo"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-purple-600 transition-colors">
              🎨 Storybook 데모
            </h2>
            <p className="text-gray-600 mt-2">
              Button, Input, Card 컴포넌트 라이브 데모
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>인터랙티브 Button 데모 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Form Input 검증 예제 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Card 레이아웃 예제 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-purple-600 group-hover:text-purple-800">
            데모 보기 →
          </div>
        </Link>

        <Link
          href="/state-management"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-emerald-600 transition-colors">
              🔄 상태 관리 비교
            </h2>
            <p className="text-gray-600 mt-2">
              Zustand, Recoil, Jotai 라이브러리 실전 비교
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Zustand Todo 예제 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Recoil Atom/Selector (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Jotai 원시 Atom (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>상세 코드 비교 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-emerald-600 group-hover:text-emerald-800">
            비교하기 →
          </div>
        </Link>

        <Link
          href="/react-query-suspense"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-indigo-600 transition-colors">
              🔄 React Query + Suspense
            </h2>
            <p className="text-gray-600 mt-2">
              선언적 데이터 페칭과 캐싱 전략
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>useSuspenseQuery 사용법 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>병렬 데이터 로딩 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>중첩 Suspense 패턴 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>캐싱 전략 가이드 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-indigo-600 group-hover:text-indigo-800">
            시작하기 →
          </div>
        </Link>

        <Link
          href="/graphql-caching"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-purple-600 transition-colors">
              🔮 GraphQL + Codegen
            </h2>
            <p className="text-gray-600 mt-2">
              타입 안전한 GraphQL과 지능형 캐싱
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Schema & Codegen 설정 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Apollo Client 캐싱 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>정규화 & 최적화 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>캐싱 전략 시뮬레이터 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-purple-600 group-hover:text-purple-800">
            시작하기 →
          </div>
        </Link>

        <Link
          href="/performance-analysis"
          className="group p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:shadow-lg transition-all"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold group-hover:text-cyan-600 transition-colors">
              📊 성능 분석
            </h2>
            <p className="text-gray-600 mt-2">
              Lighthouse, Web Vitals, Bundle Analyzer
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Web Vitals 모니터링 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Lighthouse 점수 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Bundle Size 분석 (완료)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>최적화 체크리스트 (완료)</span>
            </div>
          </div>
          
          <div className="mt-6 text-cyan-600 group-hover:text-cyan-800">
            시작하기 →
          </div>
        </Link>

        <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-400">
              🤖 AI 통합
            </h2>
            <p className="text-gray-500 mt-2">
              LLM Playground (13~16주차)
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div>• OpenAI API 연동</div>
            <div>• Prompt 최적화</div>
            <div>• Stream UI 구현</div>
          </div>
          
          <div className="mt-6 text-gray-400">
            Coming Soon...
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-400">
              🤖 AI 융합
            </h2>
            <p className="text-gray-500 mt-2">
              LLM Playground (13~16주차)
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div>• OpenAI API 연동</div>
            <div>• Prompt 최적화</div>
            <div>• Stream UI 구현</div>
          </div>
          
          <div className="mt-6 text-gray-400">
            Coming Soon...
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">📈 현재 진행 상황</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>React 19 Features (3개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Fiber 구조 & 렌더링 (3개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Next.js App Router (6개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Storybook 가이드 (6개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>상태 관리 라이브러리 비교 (4개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>React Query + Suspense 통합 (1개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>GraphQL + Codegen + 캐싱 (1개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>성능 분석 & 최적화 (1개 예제)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          💡 각 예제는 실제 코드와 함께 상세한 설명을 제공합니다.
        </p>
      </div>
    </div>
  );
}
