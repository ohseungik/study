'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DataFetchingPage() {
    const [revalidateTime, setRevalidateTime] = useState('60');
    const [cacheOption, setCacheOption] = useState('force-cache');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Data Fetching Patterns</h1>
                    <p className="text-gray-600 mb-4">
                        Next.js App Router에서의 데이터 페칭 패턴과 캐싱 전략을 학습합니다.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">📡 Server Components에서의 Data Fetching</h2>
                    <p className="text-sm text-blue-800 mb-3">
                        Server Components에서는 async/await를 직접 사용하여 데이터를 페칭할 수 있습니다.
                    </p>
                    <div className="bg-white p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{`// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // 60초마다 재검증
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <PostsList posts={posts} />;
}`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-4">🔧 fetch API 옵션 설정</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Cache 옵션:</label>
                            <select 
                                value={cacheOption}
                                onChange={(e) => setCacheOption(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="force-cache">force-cache (기본값)</option>
                                <option value="no-store">no-store</option>
                            </select>
                            <div className="text-xs text-gray-600 mt-1">
                                {cacheOption === 'force-cache' 
                                    ? '캐시를 사용하여 빠른 응답' 
                                    : '매번 새로운 데이터 요청'}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Revalidate (초):</label>
                            <input 
                                type="number"
                                value={revalidateTime}
                                onChange={(e) => setRevalidateTime(e.target.value)}
                                className="w-full p-2 border rounded"
                                min="0"
                            />
                            <div className="text-xs text-gray-600 mt-1">
                                {revalidateTime} 초마다 캐시를 재검증합니다
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                            <pre>{`fetch('url', {
  cache: '${cacheOption}',
  next: { 
    revalidate: ${revalidateTime}
  }
})`}</pre>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚙️ 캐싱 전략</h3>
                        <div className="space-y-3 text-sm">
                            <div className="p-3 bg-green-50 rounded">
                                <strong className="text-green-900">force-cache (기본값)</strong>
                                <p className="text-green-800 text-xs mt-1">
                                    • 캐시를 최대한 활용<br />
                                    • 빠른 응답 시간<br />
                                    • 정적 콘텐츠에 적합
                                </p>
                            </div>

                            <div className="p-3 bg-yellow-50 rounded">
                                <strong className="text-yellow-900">revalidate</strong>
                                <p className="text-yellow-800 text-xs mt-1">
                                    • ISR (Incremental Static Regeneration)<br />
                                    • 주기적으로 캐시 갱신<br />
                                    • 블로그, 뉴스 등에 적합
                                </p>
                            </div>

                            <div className="p-3 bg-red-50 rounded">
                                <strong className="text-red-900">no-store</strong>
                                <p className="text-red-800 text-xs mt-1">
                                    • 캐시 사용 안 함<br />
                                    • 항상 최신 데이터<br />
                                    • 실시간 데이터에 적합
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🔄 데이터 페칭 패턴 비교</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left p-3">패턴</th>
                                    <th className="text-left p-3">설명</th>
                                    <th className="text-left p-3">사용 시나리오</th>
                                    <th className="text-left p-3">코드 예제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Sequential</td>
                                    <td className="p-3">순차적으로 데이터 페칭</td>
                                    <td className="p-3">의존 관계가 있는 데이터</td>
                                    <td className="p-3 font-mono text-xs">await A; await B;</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Parallel</td>
                                    <td className="p-3">병렬로 데이터 페칭</td>
                                    <td className="p-3">독립적인 여러 데이터</td>
                                    <td className="p-3 font-mono text-xs">Promise.all([A, B])</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Streaming</td>
                                    <td className="p-3">Suspense로 점진적 로딩</td>
                                    <td className="p-3">느린 데이터 분리</td>
                                    <td className="p-3 font-mono text-xs">{`<Suspense>`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📝 Sequential Fetching</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto mb-3">
                            <pre>{`async function Page() {
  // user가 필요
  const user = await getUser();
  
  // user.id가 필요
  const posts = await getPosts(user.id);
  
  return <UserPosts user={user} posts={posts} />;
}`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            ⚠️ 총 시간 = A + B (느림)<br />
                            ✓ 데이터 간 의존성이 있을 때 사용
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚡ Parallel Fetching</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto mb-3">
                            <pre>{`async function Page() {
  // 병렬로 실행
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);
  
  return <Dashboard {...data} />;
}`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            ✓ 총 시간 = max(A, B, C) (빠름)<br />
                            ✓ 독립적인 데이터일 때 사용
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-3">🎯 Request Memoization (자동 중복 제거)</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Next.js는 같은 URL과 옵션을 가진 fetch 요청을 자동으로 중복 제거합니다.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-3 rounded">
                            <div className="font-medium text-red-900 mb-2">❌ 중복 요청</div>
                            <div className="bg-white p-2 rounded font-mono text-xs">
                                <pre>{`// Header.tsx
const user = await getUser();

// Sidebar.tsx
const user = await getUser();

// 2번 요청됨 (일반적인 경우)`}</pre>
                            </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                            <div className="font-medium text-green-900 mb-2">✅ 자동 최적화</div>
                            <div className="bg-white p-2 rounded font-mono text-xs">
                                <pre>{`// Header.tsx
const user = await getUser();

// Sidebar.tsx
const user = await getUser();

// 1번만 요청됨 (Next.js)`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>• Server Component에서 직접 페칭</li>
                            <li>• 가능한 경우 병렬 페칭 사용</li>
                            <li>• 적절한 캐싱 전략 선택</li>
                            <li>• Suspense로 느린 데이터 분리</li>
                            <li>• revalidate로 ISR 활용</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-semibold text-yellow-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-sm text-yellow-800">
                            <li>• Client Component에서는 fetch 사용 자제</li>
                            <li>• 민감한 데이터는 Server에서만 처리</li>
                            <li>• 과도한 캐싱은 오래된 데이터 위험</li>
                            <li>• no-store는 성능 저하 가능</li>
                            <li>• API 키는 환경 변수로 관리</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
