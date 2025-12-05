'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';

// React Query 설치 후 주석 해제
// import { QueryClient, QueryClientProvider, useQuery, useSuspenseQuery } from '@tanstack/react-query';

// Mock API 함수들
const fetchUser = async (userId: number): Promise<{ id: number; name: string; email: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
    };
};

const fetchPosts = async (userId: number): Promise<Array<{ id: number; title: string; body: string }>> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return [
        { id: 1, title: 'First Post', body: 'This is the first post content...' },
        { id: 2, title: 'Second Post', body: 'This is the second post content...' },
        { id: 3, title: 'Third Post', body: 'This is the third post content...' },
    ];
};

const fetchComments = async (postId: number): Promise<Array<{ id: number; text: string; author: string }>> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
        { id: 1, text: 'Great post!', author: 'Alice' },
        { id: 2, text: 'Very informative', author: 'Bob' },
    ];
};

// 패키지 설치 후 주석 해제
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5분
//       gcTime: 1000 * 60 * 10, // 10분
//     },
//   },
// });

// useSuspenseQuery를 사용하는 컴포넌트
// function UserProfile({ userId }: { userId: number }) {
//   const { data: user } = useSuspenseQuery({
//     queryKey: ['user', userId],
//     queryFn: () => fetchUser(userId),
//   });

//   return (
//     <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
//       <h3 className="text-xl font-bold text-blue-900 mb-2">{user.name}</h3>
//       <p className="text-blue-700">{user.email}</p>
//     </div>
//   );
// }

// function UserPosts({ userId }: { userId: number }) {
//   const { data: posts } = useSuspenseQuery({
//     queryKey: ['posts', userId],
//     queryFn: () => fetchPosts(userId),
//   });

//   return (
//     <div className="space-y-4">
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
//           <h4 className="font-bold text-gray-900 mb-2">{post.title}</h4>
//           <p className="text-gray-600 text-sm">{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// 임시 데모 컴포넌트 (패키지 설치 전)
function UserProfile({ userId }: { userId: number }) {
    const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useState(() => {
        fetchUser(userId).then((data) => {
            setUser(data);
            setLoading(false);
        });
    });

    if (loading || !user) {
        return (
            <div className="bg-gray-100 animate-pulse h-24 rounded-lg"></div>
        );
    }

    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-bold text-blue-900 mb-2">{user.name}</h3>
            <p className="text-blue-700">{user.email}</p>
        </div>
    );
}

function UserPosts({ userId }: { userId: number }) {
    const [posts, setPosts] = useState<Array<{ id: number; title: string; body: string }>>([]);
    const [loading, setLoading] = useState(true);

    useState(() => {
        fetchPosts(userId).then((data) => {
            setPosts(data);
            setLoading(false);
        });
    });

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 animate-pulse h-32 rounded-lg"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{post.title}</h4>
                    <p className="text-gray-600 text-sm">{post.body}</p>
                </div>
            ))}
        </div>
    );
}

function DemoSection() {
    const [userId, setUserId] = useState(1);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">사용자 데이터</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setUserId(1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            userId === 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        User 1
                    </button>
                    <button
                        onClick={() => setUserId(2)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            userId === 2
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        User 2
                    </button>
                    <button
                        onClick={() => setUserId(3)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            userId === 3
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        User 3
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <UserProfile userId={userId} />
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts</h3>
                    <UserPosts userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default function ReactQuerySuspensePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
                >
                    ← 홈으로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🔄 React Query + Suspense 통합
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    선언적 데이터 페칭과 로딩 상태 관리
                </p>

                {/* 설치 안내 */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                        📦 패키지 설치 필요
                    </h2>
                    <pre className="bg-yellow-100 p-3 rounded text-sm text-yellow-900 mb-2">
                        npm install @tanstack/react-query
                    </pre>
                    <p className="text-yellow-800 text-sm">
                        현재는 임시 로딩 상태로 구현되어 있습니다. 패키지 설치 후 코드 주석을 해제하세요.
                    </p>
                </div>

                {/* 특징 */}
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-indigo-900 mb-3">
                        ✨ React Query + Suspense의 핵심 특징
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 text-indigo-800">
                        <div>
                            <h3 className="font-semibold mb-2">React Query</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 자동 캐싱 및 백그라운드 재검증</li>
                                <li>• 중복 요청 제거 (deduplication)</li>
                                <li>• Stale/Fresh 상태 자동 관리</li>
                                <li>• DevTools로 캐시 시각화</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Suspense 통합</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 선언적 로딩 상태 처리</li>
                                <li>• 컴포넌트 수준 경계 설정</li>
                                <li>• 병렬 데이터 로딩 최적화</li>
                                <li>• 에러 경계와 함께 사용</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 데모 */}
                <DemoSection />

                {/* 코드 예제 1: 기본 설정 */}
                <div className="bg-gray-900 rounded-lg p-6 mt-8 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">1️⃣ QueryClient 설정</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
      gcTime: 1000 * 60 * 10,   // 10분 동안 캐시 보관
      retry: 3,                  // 실패 시 3번 재시도
      refetchOnWindowFocus: true, // 창 포커스 시 재검증
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`}
                    </pre>
                </div>

                {/* 코드 예제 2: useSuspenseQuery */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">2️⃣ useSuspenseQuery 사용</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { useSuspenseQuery } from '@tanstack/react-query';

// API 함수
async function fetchUser(userId: number) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

// 컴포넌트
function UserProfile({ userId }: { userId: number }) {
  // ✅ Suspense를 트리거 (로딩 중일 때)
  // ✅ 캐시가 있으면 즉시 반환
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],  // 캐시 키
    queryFn: () => fetchUser(userId),
  });

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Suspense로 감싸기
function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}`}
                    </pre>
                </div>

                {/* 코드 예제 3: 병렬 로딩 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">3️⃣ 병렬 데이터 로딩</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`function UserDashboard({ userId }: { userId: number }) {
  // 🚀 두 쿼리가 병렬로 실행됨
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const { data: posts } = useSuspenseQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userId),
  });

  return (
    <div>
      <UserInfo user={user} />
      <PostList posts={posts} />
    </div>
  );
}

// ✅ Suspense는 모든 쿼리가 완료될 때까지 대기
<Suspense fallback={<LoadingSpinner />}>
  <UserDashboard userId={1} />
</Suspense>`}
                    </pre>
                </div>

                {/* 코드 예제 4: 중첩 Suspense */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">4️⃣ 중첩 Suspense (점진적 로딩)</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`function UserPage({ userId }: { userId: number }) {
  return (
    <div>
      {/* 1. 사용자 정보 먼저 로딩 */}
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>

      {/* 2. 포스트는 독립적으로 로딩 */}
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>

      {/* 3. 댓글은 가장 나중에 로딩 */}
      <Suspense fallback={<CommentsSkeleton />}>
        <RecentComments userId={userId} />
      </Suspense>
    </div>
  );
}

// ✅ 각 섹션이 독립적으로 로딩되어 더 빠른 초기 렌더링
// ✅ 사용자는 먼저 로딩된 부분부터 볼 수 있음`}
                    </pre>
                </div>

                {/* 코드 예제 5: 에러 처리 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">5️⃣ 에러 처리 (Error Boundary)</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
      <h2 className="text-red-900 font-bold mb-2">
        데이터 로딩 실패
      </h2>
      <p className="text-red-700 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        다시 시도
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <UserDashboard userId={1} />
      </Suspense>
    </ErrorBoundary>
  );
}

// ✅ API 에러는 ErrorBoundary가 캐치
// ✅ 로딩 상태는 Suspense가 처리
// ✅ 완벽하게 분리된 관심사`}
                    </pre>
                </div>

                {/* 장단점 비교 */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">✅ 장점</h3>
                        <ul className="space-y-2 text-green-800">
                            <li>• <strong>선언적 로딩 상태</strong>: if-else 분기 제거</li>
                            <li>• <strong>자동 캐싱</strong>: 중복 요청 방지</li>
                            <li>• <strong>백그라운드 재검증</strong>: 항상 최신 데이터</li>
                            <li>• <strong>병렬 로딩 최적화</strong>: Waterfall 방지</li>
                            <li>• <strong>DevTools 제공</strong>: 캐시 상태 시각화</li>
                            <li>• <strong>TypeScript 지원</strong>: 완벽한 타입 추론</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-red-800">
                            <li>• <strong>SSR 주의</strong>: Hydration 이슈 가능</li>
                            <li>• <strong>에러 경계 필수</strong>: ErrorBoundary 설정</li>
                            <li>• <strong>캐시 전략 이해</strong>: staleTime, gcTime 조정</li>
                            <li>• <strong>번들 크기</strong>: ~40KB 추가</li>
                            <li>• <strong>러닝 커브</strong>: 캐싱 개념 학습 필요</li>
                        </ul>
                    </div>
                </div>

                {/* 캐싱 전략 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                        💡 캐싱 전략 이해하기
                    </h3>
                    <div className="space-y-4 text-sm">
                        <div className="bg-white rounded p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">
                                staleTime (Fresh → Stale 전환 시간)
                            </h4>
                            <p className="text-gray-700 mb-2">
                                데이터가 "최신"으로 간주되는 시간. 이 시간 내에는 재요청하지 않음.
                            </p>
                            <code className="bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs">
                                staleTime: 1000 * 60 * 5 // 5분
                            </code>
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-semibold text-purple-900 mb-2">
                                gcTime (Garbage Collection Time)
                            </h4>
                            <p className="text-gray-700 mb-2">
                                사용하지 않는 캐시가 메모리에서 제거되기까지 대기 시간.
                            </p>
                            <code className="bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs">
                                gcTime: 1000 * 60 * 10 // 10분
                            </code>
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-semibold text-green-900 mb-2">
                                refetchOnWindowFocus (창 포커스 시 재검증)
                            </h4>
                            <p className="text-gray-700 mb-2">
                                사용자가 다른 탭에서 돌아올 때 자동으로 데이터 갱신.
                            </p>
                            <code className="bg-green-100 text-green-900 px-2 py-1 rounded text-xs">
                                refetchOnWindowFocus: true
                            </code>
                        </div>
                    </div>
                </div>

                {/* 실전 패턴 */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        🎯 실전 사용 패턴
                    </h3>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                1. 자주 변경되는 데이터 (예: 실시간 알림)
                            </h4>
                            <code className="text-sm bg-gray-100 px-3 py-1 rounded text-gray-800">
                                staleTime: 0, refetchInterval: 5000
                            </code>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                2. 거의 변경되지 않는 데이터 (예: 사용자 프로필)
                            </h4>
                            <code className="text-sm bg-gray-100 px-3 py-1 rounded text-gray-800">
                                staleTime: Infinity, gcTime: 1000 * 60 * 30
                            </code>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                3. 중간 정도 (예: 게시글 목록)
                            </h4>
                            <code className="text-sm bg-gray-100 px-3 py-1 rounded text-gray-800">
                                staleTime: 1000 * 60 * 5, refetchOnWindowFocus: true
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
