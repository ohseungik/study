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
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Actions 예제 (준비중)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Server Components 예제 (준비중)</span>
            </div>
          </div>
          
          <div className="mt-6 text-blue-600 group-hover:text-blue-800">
            시작하기 →
          </div>
        </Link>

        <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-400">
              🎨 Design System
            </h2>
            <p className="text-gray-500 mt-2">
              Storybook + Token System (5~8주차)
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div>• Figma Token 연동</div>
            <div>• CLI 자동 생성기</div>
            <div>• 모노레포 구조</div>
          </div>
          
          <div className="mt-6 text-gray-400">
            Coming Soon...
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-400">
              🏗️ 아키텍처
            </h2>
            <p className="text-gray-500 mt-2">
              GraphQL + React Query (9~12주차)
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div>• 상태 관리 설계</div>
            <div>• 캐싱 최적화</div>
            <div>• 성능 분석</div>
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
            <span>React 19 use() Hook 예제</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>React 19 Actions 예제</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-0"></div>
              </div>
              <span className="text-sm text-gray-500 font-medium">0%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Server Components 예제</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-0"></div>
              </div>
              <span className="text-sm text-gray-500 font-medium">0%</span>
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
