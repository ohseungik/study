/**
 * use() hook 예제 - React 19의 새로운 Hook
 */

import Link from "next/link";

const UseHookPage = () => {
  const examples = [
    {
      title: "Promise 예제",
      description: "use()로 Promise를 직접 읽어서 데이터 페칭",
      href: "/react19-features/use-hook/promise-example",
    },
    {
      title: "Context 예제",
      description: "use()로 Context 값을 조건부로 읽기",
      href: "/react19-features/use-hook/context-example",
    },
    {
      title: "Suspense 예제",
      description: "use()와 Suspense를 조합한 로딩 처리",
      href: "/react19-features/use-hook/suspense-example",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">React 19 use() Hook 예제</h1>
        <p className="text-gray-600 text-lg">
          React 19에서 새롭게 도입된
          <code className="bg-gray-100 px-2 py-1 rounded">use()</code> Hook의
          다양한 활용 예제를 살펴보세요.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">use() Hook이란?</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Promise나 Context를 직접 읽을 수 있는 새로운 Hook</li>
            <li>• 조건부로 호출 가능 (기존 Hook 규칙의 예외)</li>
            <li>• Suspense와 자연스럽게 연동되어 로딩 상태 관리</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
            <p className="text-gray-600">{example.description}</p>
            <div className="mt-4 text-blue-600 text-sm font-medium">
              예제 보기 →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/react19-features"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← React 19 기능 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default UseHookPage;
