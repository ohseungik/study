import Link from 'next/link';

export default function AppRouterPage() {
    const examples = [
        {
            title: 'Server Components vs Client Components',
            description: 'RSC와 Client Component의 차이점과 사용 시나리오',
            href: '/app-router/server-client',
            status: '완료',
            highlights: ['Server Components', 'Client Components', 'use client'],
        },
        {
            title: 'Streaming & Suspense',
            description: 'Streaming SSR과 Suspense를 활용한 점진적 렌더링',
            href: '/app-router/streaming',
            status: '완료',
            highlights: ['Streaming SSR', 'Suspense', 'Loading UI'],
        },
        {
            title: 'Data Fetching Patterns',
            description: 'Server Components에서의 데이터 페칭 패턴과 캐싱 전략',
            href: '/app-router/data-fetching',
            status: '완료',
            highlights: ['fetch API', 'Cache', 'Revalidate'],
        },
        {
            title: 'Route Handlers (API Routes)',
            description: 'App Router의 새로운 API Routes 패턴',
            href: '/app-router/route-handlers',
            status: '완료',
            highlights: ['GET', 'POST', 'Dynamic Routes'],
        },
        {
            title: 'Parallel Routes & Intercepting',
            description: '병렬 라우팅과 라우트 가로채기 패턴',
            href: '/app-router/parallel-routes',
            status: '완료',
            highlights: ['@slot', 'Parallel Routes', 'Intercepting Routes'],
        },
        {
            title: 'Server Actions',
            description: 'Server Actions를 활용한 폼 처리와 데이터 변경',
            href: '/app-router/server-actions',
            status: '완료',
            highlights: ['use server', 'Form Actions', 'Mutations'],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Next.js App Router 심화 학습</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← 메인으로 돌아가기
                </Link>
                <p className="text-gray-600 text-lg">
                    Next.js 15의 <code className="bg-gray-100 px-2 py-1 rounded">App Router</code>를 
                    실전 예제로 완벽하게 이해하세요.
                </p>
            </div>

            <div className="mb-8 p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4 text-blue-900">🚀 App Router란?</h2>
                <div className="space-y-3 text-gray-700">
                    <p>
                        <strong>App Router</strong>는 Next.js 13부터 도입된 새로운 라우팅 시스템으로,
                        React Server Components를 기본으로 사용하여 성능과 사용자 경험을 크게 개선했습니다.
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 mt-4">
                        <div className="p-4 bg-white rounded border border-blue-100">
                            <h4 className="font-medium text-blue-900 mb-2">주요 특징</h4>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Server Components 기본 지원</li>
                                <li>• Streaming SSR로 빠른 초기 로딩</li>
                                <li>• 파일 시스템 기반 라우팅</li>
                                <li>• Layout과 Template 분리</li>
                                <li>• Server Actions 통합</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white rounded border border-green-100">
                            <h4 className="font-medium text-green-900 mb-2">폴더 구조</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                <li>• <code>page.tsx</code>: 라우트 페이지</li>
                                <li>• <code>layout.tsx</code>: 공통 레이아웃</li>
                                <li>• <code>loading.tsx</code>: 로딩 UI</li>
                                <li>• <code>error.tsx</code>: 에러 핸들링</li>
                                <li>• <code>route.ts</code>: API 핸들러</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 mb-8">
                {examples.map((example, index) => (
                    <Link
                        key={index}
                        href={example.href}
                        className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                example.status === '완료'
                                    ? 'bg-green-100 text-green-800'
                                    : example.status === '진행중'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {example.status}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{example.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {example.highlights.map((highlight, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                        
                        <div className="text-blue-600 text-sm font-medium mt-4">
                            예제 보기 →
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3">📊 Pages Router vs App Router</h3>
                    <div className="text-purple-800 text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>렌더링 방식:</span>
                            <span className="font-medium">SSR/SSG → RSC</span>
                        </div>
                        <div className="flex justify-between">
                            <span>데이터 페칭:</span>
                            <span className="font-medium">getServerSideProps → fetch</span>
                        </div>
                        <div className="flex justify-between">
                            <span>API Routes:</span>
                            <span className="font-medium">pages/api → app/route</span>
                        </div>
                        <div className="flex justify-between">
                            <span>레이아웃:</span>
                            <span className="font-medium">_app.tsx → layout.tsx</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-3">⚡ 성능 최적화</h3>
                    <ul className="text-orange-800 text-sm space-y-2">
                        <li>• <strong>Automatic Code Splitting:</strong> 페이지별 자동 분할</li>
                        <li>• <strong>Streaming:</strong> 점진적 렌더링</li>
                        <li>• <strong>Smart Caching:</strong> fetch 레벨 캐싱</li>
                        <li>• <strong>Server Components:</strong> JS 번들 크기 감소</li>
                        <li>• <strong>Parallel Routes:</strong> 동시 렌더링</li>
                    </ul>
                </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">💡 학습 포인트</h3>
                <div className="text-yellow-800 text-sm space-y-2">
                    <p>
                        <strong>1. Server Components 이해:</strong> 기본적으로 모든 컴포넌트는 서버에서 렌더링됩니다.
                        클라이언트 인터랙션이 필요한 경우에만 &apos;use client&apos;를 사용하세요.
                    </p>
                    <p>
                        <strong>2. Streaming 활용:</strong> Suspense를 사용하여 중요한 콘텐츠를 먼저 보여주고
                        나머지는 준비되는 대로 표시하세요.
                    </p>
                    <p>
                        <strong>3. 캐싱 전략:</strong> fetch의 캐싱 옵션을 이해하고 적절히 활용하여
                        서버 부하를 줄이고 응답 속도를 개선하세요.
                    </p>
                    <p>
                        <strong>4. Server Actions:</strong> 폼 처리와 데이터 변경을 서버에서 안전하게 수행하고
                        클라이언트 JavaScript를 최소화하세요.
                    </p>
                </div>
            </div>
        </div>
    );
}
