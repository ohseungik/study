'use client';

import { useState } from 'react';
import Link from 'next/link';

// Server Component 예제 (실제로는 별도 파일)
function ServerComponentExample() {
    // 서버에서 실행되는 코드
    const serverTime = new Date().toISOString();
    
    return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🖥️ Server Component</h3>
            <p className="text-sm text-green-800 mb-2">
                이 컴포넌트는 서버에서만 렌더링됩니다.
            </p>
            <div className="bg-white p-3 rounded text-xs font-mono">
                <div>Server Time: {serverTime}</div>
                <div className="text-gray-500 mt-1">
                    {/* 이 시간은 빌드/요청 시점의 서버 시간입니다 */}
                </div>
            </div>
            <div className="mt-3 text-xs text-green-700">
                ✅ 데이터베이스 직접 접근 가능<br />
                ✅ 비밀 환경 변수 안전하게 사용<br />
                ✅ 클라이언트 JavaScript 번들에 포함되지 않음
            </div>
        </div>
    );
}

// Client Component 예제
function ClientComponentExample() {
    const [count, setCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💻 Client Component</h3>
            <p className="text-sm text-blue-800 mb-3">
                이 컴포넌트는 클라이언트에서 인터랙티브하게 동작합니다.
            </p>
            
            <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                    <div className="text-sm font-medium mb-2">useState 사용:</div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCount(c => c - 1)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            -
                        </button>
                        <span className="font-mono text-lg font-bold">{count}</span>
                        <button 
                            onClick={() => setCount(c => c + 1)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="bg-white p-3 rounded">
                    <div className="text-sm font-medium mb-2">이벤트 핸들러:</div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {isOpen ? '닫기' : '열기'}
                    </button>
                    {isOpen && (
                        <div className="mt-2 p-2 bg-blue-100 rounded text-sm">
                            클라이언트에서 동적으로 표시되는 내용입니다!
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-3 text-xs text-blue-700">
                ✅ useState, useEffect 등 React Hooks 사용<br />
                ✅ 이벤트 리스너 (onClick, onChange 등)<br />
                ✅ 브라우저 API 접근 (localStorage, window 등)
            </div>
        </div>
    );
}

export default function ServerClientPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Server Components vs Client Components</h1>
                    <p className="text-gray-600 mb-4">
                        React Server Components(RSC)와 Client Components의 차이점을 실습으로 이해하세요.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <ServerComponentExample />
                    <ClientComponentExample />
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">📚 주요 차이점</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 bg-gray-50">특성</th>
                                    <th className="text-left p-3 bg-green-50">Server Component</th>
                                    <th className="text-left p-3 bg-blue-50">Client Component</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">렌더링 위치</td>
                                    <td className="p-3">서버</td>
                                    <td className="p-3">클라이언트 (브라우저)</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">JavaScript 번들</td>
                                    <td className="p-3">❌ 포함되지 않음</td>
                                    <td className="p-3">✅ 포함됨</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">React Hooks</td>
                                    <td className="p-3">❌ 사용 불가</td>
                                    <td className="p-3">✅ 사용 가능</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">이벤트 핸들러</td>
                                    <td className="p-3">❌ 사용 불가</td>
                                    <td className="p-3">✅ 사용 가능</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">데이터베이스 접근</td>
                                    <td className="p-3">✅ 직접 접근 가능</td>
                                    <td className="p-3">❌ API를 통해서만</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">환경 변수</td>
                                    <td className="p-3">✅ 서버 환경 변수 접근</td>
                                    <td className="p-3">⚠️ NEXT_PUBLIC_만 접근</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">선언 방법</td>
                                    <td className="p-3">기본값 (별도 선언 불필요)</td>
                                    <td className="p-3">&apos;use client&apos; 디렉티브</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 text-green-900">🖥️ Server Component 사용 시나리오</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>데이터베이스에서 직접 데이터 조회</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>비밀 API 키나 토큰 사용</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>큰 용량의 라이브러리를 서버에서만 사용</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>정적 콘텐츠 렌더링 (블로그 포스트 등)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>SEO 최적화가 중요한 페이지</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 text-blue-900">💻 Client Component 사용 시나리오</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>사용자 인터랙션 (클릭, 입력 등)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>useState, useEffect 등 React Hooks</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>브라우저 API (localStorage, geolocation 등)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>실시간 업데이트 (WebSocket, polling 등)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>커스텀 React Context 사용</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">💡 Best Practices</h3>
                    <div className="space-y-3 text-sm text-yellow-800">
                        <div>
                            <strong>1. 기본은 Server Component:</strong> 특별한 이유가 없다면 Server Component를 사용하세요.
                            클라이언트 JavaScript 번들 크기를 줄여 성능이 향상됩니다.
                        </div>
                        <div>
                            <strong>2. Leaf에서 Client Component 사용:</strong> 트리의 가장 하위(leaf)에서만 &apos;use client&apos;를 사용하여
                            클라이언트 컴포넌트의 범위를 최소화하세요.
                        </div>
                        <div>
                            <strong>3. Server Component에서 Client Component로 props 전달:</strong> Server Component에서 fetch한 데이터를
                            Client Component에 props로 전달할 수 있습니다.
                        </div>
                        <div>
                            <strong>4. 직렬화 가능한 데이터만 전달:</strong> Server Component에서 Client Component로 전달하는 props는
                            JSON으로 직렬화 가능해야 합니다 (함수나 클래스 인스턴스는 불가).
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
