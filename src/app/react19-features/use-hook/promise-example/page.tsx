"use client";

/**
 * use() Hook으로 Promise 처리하기
 */

import { use, Suspense, useState } from "react";
import Link from "next/link";

// 가상의 데이터 페칭 함수
const fetchUserData = async (
  userId: number
): Promise<{ id: number; name: string; email: string }> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  ); // 1-3초 대기

  if (Math.random() > 0.8) {
    throw new Error("네트워크 오류가 발생했습니다.");
  }

  return {
    id: userId,
    name: `사용자 ${userId}`,
    email: `user${userId}@example.com`,
  };
};

// 사용자 데이터 타입 정의
type User = {
  id: number;
  name: string;
  email: string;
};

// use()를 사용하는 컴포넌트
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // Promise를 직접 읽음

  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="font-semibold text-green-900 mb-2">✅ 사용자 정보</h3>
      <div className="space-y-1 text-green-800">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>이름:</strong> {user.name}
        </p>
        <p>
          <strong>이메일:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

// 로딩 컴포넌트
function LoadingFallback() {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="animate-pulse">
        <h3 className="font-semibold text-blue-900 mb-2">🔄 로딩 중...</h3>
        <div className="space-y-2">
          <div className="h-4 bg-blue-200 rounded w-1/3"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2"></div>
          <div className="h-4 bg-blue-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

// 에러 경계 컴포넌트
function ErrorBoundary({ onReset }: { onReset: () => void }) {
  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
      <h3 className="font-semibold text-red-900 mb-2">❌ 오류 발생</h3>
      <p className="text-red-800 mb-3">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        다시 시도
      </button>
    </div>
  );
}

export default function PromiseExamplePage() {
  const [userId, setUserId] = useState(1);
  const [userPromise, setUserPromise] = useState(() => fetchUserData(userId));
  const [error, setError] = useState<Error | null>(null);

  const handleFetchUser = (id: number) => {
    setError(null);
    setUserId(id);
    setUserPromise(fetchUserData(id));
  };

  const handleRetry = () => {
    setError(null);
    setUserPromise(fetchUserData(userId));
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Promise + use() 예제</h1>
          <Link
            href="/react19-features/use-hook"
            className="text-blue-600 hover:text-blue-800"
          >
            ← use() Hook 예제로 돌아가기
          </Link>
        </div>
        <ErrorBoundary onReset={handleRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Promise + use() 예제</h1>
        <Link
          href="/react19-features/use-hook"
          className="text-blue-600 hover:text-blue-800"
        >
          ← use() Hook 예제로 돌아가기
        </Link>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            • <code className="bg-white px-2 py-1 rounded">use(promise)</code>로
            Promise를 직접 읽을 수 있음
          </li>
          <li>• Suspense 경계에서 자동으로 로딩 상태 처리</li>
          <li>• Promise가 resolve되면 컴포넌트가 리렌더링</li>
          <li>• 기존의 useEffect + useState 패턴을 단순화</li>
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">사용자 선택</h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((id) => (
              <button
                key={id}
                onClick={() => handleFetchUser(id)}
                className={`px-4 py-2 rounded ${
                  userId === id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                사용자 {id}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">결과</h3>
          <Suspense fallback={<LoadingFallback />}>
            <UserProfile userPromise={userPromise} />
          </Suspense>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">💡 코드 설명</h4>
          <pre className="text-sm text-yellow-800 overflow-x-auto">
{`function UserProfile({ userPromise }) {
    const user = use(userPromise); // ✨ Promise를 직접 읽음
    return <div>{user.name}</div>;
}

// Suspense로 감싸면 자동 로딩 처리
<Suspense fallback={<Loading />}>
    <UserProfile userPromise={fetchUserData()} />
</Suspense>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
