"use client";

/**
 * use() Hook과 Suspense를 조합한 고급 로딩 처리
 */

import { use, Suspense, useState } from "react";
import Link from "next/link";

// 다양한 데이터 소스 시뮬레이션
const fetchSlowData = async (delay: number = 2000) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return `느린 데이터 (${delay}ms 후 로드됨)`;
};

const fetchFastData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return "빠른 데이터 (500ms)";
};

const fetchErrorData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error("의도적인 에러 발생");
};

const fetchUserProfile = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    id: userId,
    name: `사용자 ${userId}`,
    avatar: `https://i.pravatar.cc/100?img=${userId}`,
    posts: Math.floor(Math.random() * 100),
    followers: Math.floor(Math.random() * 1000),
  };
};

// 개별 데이터 컴포넌트들
function SlowComponent({ promise }: { promise: Promise<string> }) {
  const data = use(promise);
  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
      <h4 className="font-semibold text-red-900 mb-2">🐌 느린 컴포넌트</h4>
      <p className="text-red-800">{data}</p>
    </div>
  );
}

function FastComponent({ promise }: { promise: Promise<string> }) {
  const data = use(promise);
  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <h4 className="font-semibold text-green-900 mb-2">⚡ 빠른 컴포넌트</h4>
      <p className="text-green-800">{data}</p>
    </div>
  );
}

// 사용자 타입 정의
type User = {
  id: number;
  name: string;
  avatar: string;
  posts: number;
  followers: number;
};

function UserProfileComponent({ promise }: { promise: Promise<User> }) {
  const user = use(promise);
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-3">👤 사용자 프로필</h4>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h5 className="font-semibold text-blue-900">{user.name}</h5>
          <div className="text-sm text-blue-700 space-y-1">
            <p>게시물: {user.posts}개</p>
            <p>팔로워: {user.followers}명</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로딩 컴포넌트들
function BasicLoader() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}

function DetailedLoader({ label }: { label: string }) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-900 font-medium">{label} 로딩 중...</span>
      </div>
    </div>
  );
}

// 에러 바운더리
function ErrorBoundary({ onReset }: { onReset: () => void }) {
  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
      <h4 className="font-semibold text-red-900 mb-2">
        ❌ 에러가 발생했습니다
      </h4>
      <p className="text-red-800 mb-3">
        데이터를 불러오는 중 문제가 발생했습니다.
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

export default function SuspenseExamplePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  type ExampleType = "basic" | "nested" | "parallel" | "error";
  const [selectedExample, setSelectedExample] = useState<ExampleType>("basic");

  // 데이터 Promise들 (refreshKey가 변경될 때마다 새로 생성)
  const promises = {
    slow: fetchSlowData(3000),
    fast: fetchFastData(),
    error: fetchErrorData(),
    user: fetchUserProfile(refreshKey + 1),
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const examples = {
    basic: {
      title: "기본 Suspense",
      description: "하나의 컴포넌트를 Suspense로 감싸기",
    },
    nested: {
      title: "중첩 Suspense",
      description: "여러 레벨의 Suspense 경계 설정",
    },
    parallel: {
      title: "병렬 로딩",
      description: "여러 컴포넌트를 동시에 로딩",
    },
    error: {
      title: "에러 처리",
      description: "Suspense + Error Boundary 조합",
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Suspense + use() 예제</h1>
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
            • <code className="bg-white px-2 py-1 rounded">use()</code>와
            Suspense가 자연스럽게 연동
          </li>
          <li>• 여러 레벨의 Suspense 경계로 세밀한 로딩 제어</li>
          <li>• 병렬 데이터 로딩으로 성능 최적화</li>
          <li>• Error Boundary와 조합하여 완전한 비동기 처리</li>
        </ul>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key as ExampleType)}
              className={`px-4 py-2 rounded ${
                selectedExample === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {example.title}
            </button>
          ))}
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🔄 새로고침
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">
            {examples[selectedExample].title}
          </h3>
          <p className="text-gray-600">
            {examples[selectedExample].description}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        {selectedExample === "basic" && (
          <div>
            <h4 className="font-semibold mb-4">기본 Suspense 사용법</h4>
            <Suspense fallback={<BasicLoader />}>
              <FastComponent promise={promises.fast} />
            </Suspense>
          </div>
        )}

        {selectedExample === "nested" && (
          <div className="space-y-6">
            <h4 className="font-semibold mb-4">중첩된 Suspense 경계</h4>

            <Suspense fallback={<DetailedLoader label="외부 컨테이너" />}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-4">외부 컨테이너 (빠른 로딩)</h5>

                <FastComponent promise={promises.fast} />

                <div className="mt-4">
                  <Suspense fallback={<DetailedLoader label="내부 컴포넌트" />}>
                    <SlowComponent promise={promises.slow} />
                  </Suspense>
                </div>
              </div>
            </Suspense>
          </div>
        )}

        {selectedExample === "parallel" && (
          <div className="space-y-6">
            <h4 className="font-semibold mb-4">
              병렬 로딩 (각각 독립적인 Suspense)
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<DetailedLoader label="빠른 데이터" />}>
                <FastComponent promise={promises.fast} />
              </Suspense>

              <Suspense fallback={<DetailedLoader label="사용자 프로필" />}>
                <UserProfileComponent promise={promises.user} />
              </Suspense>
            </div>

            <Suspense fallback={<DetailedLoader label="느린 데이터" />}>
              <SlowComponent promise={promises.slow} />
            </Suspense>
          </div>
        )}

        {selectedExample === "error" && (
          <div className="space-y-6">
            <h4 className="font-semibold mb-4">Error Boundary + Suspense</h4>

            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<DetailedLoader label="정상 데이터" />}>
                <FastComponent promise={promises.fast} />
              </Suspense>

              <div>
                <ErrorBoundary onReset={handleRefresh} />
                <p className="text-gray-600 text-sm mt-2">
                  * 에러 처리 예제를 위해 의도적으로 실패하는 컴포넌트입니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">
          💡 패턴별 코드 예시
        </h4>
        <pre className="text-sm text-yellow-800 overflow-x-auto">
{selectedExample === "basic" &&
`// 기본 사용법
<Suspense fallback={<Loading />}>
    <ComponentWithUse />
</Suspense>`}

{selectedExample === "nested" &&
`// 중첩 Suspense
<Suspense fallback={<OuterLoading />}>
    <FastComponent />
    <Suspense fallback={<InnerLoading />}>
        <SlowComponent />
    </Suspense>
</Suspense>`}

{selectedExample === "parallel" &&
`// 병렬 로딩
<div>
    <Suspense fallback={<Loading1 />}>
        <Component1 />
    </Suspense>
    <Suspense fallback={<Loading2 />}>
        <Component2 />
    </Suspense>
</div>`}

{selectedExample === "error" &&
`// 에러 처리
<ErrorBoundary>
    <Suspense fallback={<Loading />}>
        <ComponentThatMightFail />
    </Suspense>
</ErrorBoundary>`}
        </pre>
      </div>
    </div>
  );
}
