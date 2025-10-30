/**
 * React 19 Server Components 예제 메인 페이지
 */

import Link from 'next/link';

export default function ServerComponentsPage() {
    const examples = [
        {
            title: '기본 Server Components',
            description: '서버에서 렌더링되는 컴포넌트의 기본 개념과 데이터 페칭',
            href: '/react19-features/server-components/basic',
            status: '완료',
            highlights: ['서버사이드 렌더링', '직접 DB 접근', '0KB 번들 크기'],
        },
        {
            title: 'Streaming SSR',
            description: '점진적 로딩과 Streaming을 활용한 성능 최적화',
            href: '/react19-features/server-components/streaming',
            status: '완료',
            highlights: ['점진적 렌더링', 'Suspense 경계', '사용자 체감 성능'],
        },
        {
            title: 'Client vs Server 비교',
            description: 'Client Components와 Server Components의 차이점과 성능 비교',
            href: '/react19-features/server-components/client-vs-server',
            status: '완료',
            highlights: ['성능 측정', '번들 크기 비교', '렌더링 방식'],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">React 19 Server Components</h1>
                <Link href="/react19-features" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← React 19 기능 목록으로 돌아가기
                </Link>
                <p className="text-gray-600 text-lg">
                    React 19의 <code className="bg-gray-100 px-2 py-1 rounded">Server Components</code>로 성능을 최적화하고 SEO를 개선하는 방법을 살펴보세요.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">🚀 Server Components란?</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• <strong>서버 렌더링:</strong> 서버에서 HTML로 미리 렌더링되어 클라이언트로 전송</li>
                        <li>• <strong>0KB 번들:</strong> 서버 컴포넌트 코드는 클라이언트 번들에 포함되지 않음</li>
                        <li>• <strong>직접 접근:</strong> 데이터베이스, 파일 시스템 등 백엔드 리소스 직접 사용</li>
                        <li>• <strong>SEO 최적화:</strong> 검색 엔진이 완전한 HTML 콘텐츠를 읽을 수 있음</li>
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
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold">{example.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full break-keep ${
                                example.status === '완료' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {example.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{example.description}</p>
                        
                        <div className="mb-4">
                            <h4 className="font-medium text-sm text-gray-900 mb-2">주요 특징:</h4>
                            <ul className="space-y-1">
                                {example.highlights.map((highlight, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="text-blue-600 text-sm font-medium">
                            예제 보기 →
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">💡 Server Components의 장점</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">⚡ 성능 최적화</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 클라이언트 번들 크기 감소</li>
                            <li>• 서버에서 미리 렌더링</li>
                            <li>• 네트워크 요청 최소화</li>
                            <li>• 캐싱 효율성 향상</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">🔒 보안성</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• API 키, 데이터베이스 접속 정보 보호</li>
                            <li>• 민감한 로직 서버에서 처리</li>
                            <li>• 클라이언트 코드 노출 방지</li>
                            <li>• 서버 리소스 직접 접근</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">🔍 SEO 최적화</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 완전한 HTML 콘텐츠</li>
                            <li>• 검색 엔진 크롤링 최적화</li>
                            <li>• 소셜 미디어 메타 태그</li>
                            <li>• 빠른 초기 페이지 로드</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">🛠️ 개발 경험</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 백엔드 리소스 직접 사용</li>
                            <li>• 복잡한 상태 관리 불필요</li>
                            <li>• 서버/클라이언트 코드 분리</li>
                            <li>• 타입스크립트 완전 지원</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">🛠️ Server vs Client Components</h4>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                    <div>
                        <h5 className="font-medium text-yellow-900 mb-2">Server Components 사용 시기</h5>
                        <ul className="text-yellow-800 space-y-1">
                            <li>• 데이터 페칭이 필요한 경우</li>
                            <li>• SEO가 중요한 콘텐츠</li>
                            <li>• 민감한 정보 처리</li>
                            <li>• 대용량 의존성 라이브러리 사용</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-medium text-yellow-900 mb-2">Client Components 사용 시기</h5>
                        <ul className="text-yellow-800 space-y-1">
                            <li>• 사용자 상호작용 (onClick, onChange)</li>
                            <li>• 브라우저 전용 API (localStorage)</li>
                            <li>• React Hook 사용 (useState, useEffect)</li>
                            <li>• 실시간 업데이트가 필요한 경우</li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-100 rounded">
                    <pre className="text-yellow-800 text-xs overflow-x-auto">
{`// Server Component (기본)
export default async function ServerComponent() {
    const data = await fetch('API_URL'); // 서버에서 실행
    return <div>{data.title}</div>;
}

// Client Component ('use client' 필요)
'use client';
export default function ClientComponent() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}