/**
 * React 19 주요 기능들 소개 및 예제 목록
 */

import Link from "next/link";

export default function React19FeaturesPage() {
  const features = [
    {
      title: "use() Hook",
      description: "Promise와 Context를 직접 읽을 수 있는 혁신적인 Hook",
      href: "/react19-features/use-hook",
      status: "완료",
      highlights: [
        "조건부 호출 가능",
        "Suspense 자동 연동",
        "Promise/Context 직접 읽기",
      ],
    },
    {
      title: "Actions",
      description: "Server Actions와 Form Actions으로 간편한 상태 관리",
      href: "/react19-features/actions",
      status: "완료",
      highlights: ["Server Actions", "Form Actions", "Optimistic Updates"],
    },
    {
      title: "Server Components",
      description: "서버에서 렌더링되는 컴포넌트와 성능 최적화",
      href: "/react19-features/server-components",
      status: "준비중",
      highlights: ["SSR 최적화", "Streaming", "Client vs Server"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">React 19 주요 기능</h1>
        <p className="text-gray-600 text-lg">
          React 19에서 새롭게 도입된 핵심 기능들을 실습 예제와 함께 살펴보세요.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            🚀 React 19 주요 변화
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>
              • <strong>use() Hook:</strong> Promise와 Context를 조건부로 읽을
              수 있는 새로운 Hook
            </li>
            <li>
              • <strong>Actions:</strong> Server Actions와 Form Actions으로
              간편한 데이터 변경
            </li>
            <li>
              • <strong>Server Components:</strong> 서버에서 렌더링되어 성능과
              SEO 최적화
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.href}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    feature.status === "완료"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {feature.status}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{feature.description}</p>

              <div className="mb-4">
                <h4 className="font-medium text-sm text-gray-900 mb-2">
                  주요 특징:
                </h4>
                <ul className="space-y-1">
                  {feature.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {feature.status === "완료" ? (
                <Link
                  href={feature.href}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  예제 살펴보기 →
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed">
                  준비 중...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">📚 학습 로드맵</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <div>
              <h4 className="font-medium">use() Hook 마스터하기</h4>
              <p className="text-gray-600 text-sm">
                Promise와 Context를 조건부로 읽는 방법을 익혀보세요.
                Suspense와의 자연스러운 연동도 함께 학습합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <div>
              <h4 className="font-medium">Actions로 상태 관리 간소화</h4>
              <p className="text-gray-600 text-sm">
                Server Actions와 Form Actions을 활용해 복잡한 상태 관리를
                단순화하는 방법을 배웁니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <div>
              <h4 className="font-medium">Server Components로 성능 최적화</h4>
              <p className="text-gray-600 text-sm">
                서버에서 렌더링되는 컴포넌트의 장점과 클라이언트 컴포넌트와의
                차이점을 이해합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← 메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
