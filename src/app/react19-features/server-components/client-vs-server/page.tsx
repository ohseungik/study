'use client';

/**
 * Client vs Server Components 비교 예제
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 클라이언트 데이터 타입 정의
interface ClientData {
    message: string;
    timestamp: string;
    userAgent: string;
    screenSize: string;
    language: string;
}

// Client Component 예제
function ClientComponentDemo() {
    const [data, setData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // 클라이언트에서 API 호출 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 2000));
            const mockData: ClientData = {
                message: '클라이언트에서 페칭한 데이터',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
            };
            setData(mockData);
        } catch {
            setError('데이터 페칭 실패');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 자동 실행
        handleFetchData();
    }, []);

    return (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">🖥️ Client Component</h3>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    CSR (Client-Side Rendering)
                </span>
            </div>

            {/* 인터랙티브 요소 */}
            <div className="mb-6 p-4 bg-blue-100 rounded">
                <h4 className="font-medium text-blue-900 mb-3">상호작용 가능한 요소</h4>
                <div className="flex items-center gap-4 mb-3">
                    <button
                        onClick={() => setCount(count + 1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        클릭 카운트: {count}
                    </button>
                    <button
                        onClick={handleFetchData}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? '로딩 중...' : '데이터 다시 가져오기'}
                    </button>
                </div>
            </div>

            {/* 데이터 표시 */}
            <div className="space-y-4">
                <h4 className="font-medium text-blue-900">클라이언트 데이터 페칭 결과</h4>
                
                {loading && (
                    <div className="p-4 bg-white rounded border">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-blue-700">클라이언트에서 데이터 로딩 중...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-100 border border-red-200 rounded">
                        <p className="text-red-800">❌ {error}</p>
                    </div>
                )}

                {data && !loading && (
                    <div className="p-4 bg-white rounded border">
                        <div className="space-y-2 text-sm">
                            <div><strong>메시지:</strong> {data.message}</div>
                            <div><strong>시간:</strong> {new Date(data.timestamp).toLocaleString('ko-KR')}</div>
                            <div><strong>브라우저:</strong> {data.userAgent?.substring(0, 50)}...</div>
                            <div><strong>화면 크기:</strong> {data.screenSize}</div>
                            <div><strong>언어:</strong> {data.language}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Client Component 특징 */}
            <div className="mt-6 p-4 bg-blue-200 rounded">
                <h4 className="font-medium text-blue-900 mb-2">✨ Client Component 특징</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                    <li>• React Hook 사용 가능 (useState, useEffect)</li>
                    <li>• 브라우저 API 접근 (window, navigator, localStorage)</li>
                    <li>• 사용자 이벤트 처리 (onClick, onChange)</li>
                    <li>• 실시간 상태 업데이트</li>
                    <li>• 클라이언트 번들에 포함됨</li>
                </ul>
            </div>
        </div>
    );
}

// 서버 데이터 시뮬레이션을 위한 컴포넌트
function ServerComponentSimulation() {
    // 서버에서 미리 렌더링된 데이터라고 가정
    const serverData = {
        message: '서버에서 미리 렌더링된 데이터',
        serverTime: new Date().toISOString(),
        nodeVersion: '20.x.x', // 실제로는 process.version
        environment: 'production',
        buildTime: '2024-01-16T09:30:00.000Z',
        seoTitle: 'React 19 Server Components 예제',
        description: '이 페이지는 SEO에 최적화되어 있습니다.',
    };

    return (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-900">🖥️ Server Component (시뮬레이션)</h3>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                    SSR (Server-Side Rendering)
                </span>
            </div>

            {/* 서버 데이터 표시 */}
            <div className="mb-6">
                <h4 className="font-medium text-green-900 mb-3">서버에서 미리 렌더링된 데이터</h4>
                <div className="p-4 bg-white rounded border space-y-2 text-sm">
                    <div><strong>메시지:</strong> {serverData.message}</div>
                    <div><strong>서버 시간:</strong> {new Date(serverData.serverTime).toLocaleString('ko-KR')}</div>
                    <div><strong>Node 버전:</strong> {serverData.nodeVersion}</div>
                    <div><strong>환경:</strong> {serverData.environment}</div>
                    <div><strong>빌드 시간:</strong> {new Date(serverData.buildTime).toLocaleString('ko-KR')}</div>
                </div>
            </div>

            {/* SEO 정보 */}
            <div className="mb-6 p-4 bg-green-100 rounded">
                <h4 className="font-medium text-green-900 mb-3">🔍 SEO 최적화</h4>
                <div className="space-y-2 text-sm text-green-800">
                    <div><strong>페이지 제목:</strong> {serverData.seoTitle}</div>
                    <div><strong>메타 설명:</strong> {serverData.description}</div>
                    <div className="text-xs text-green-600">
                        ※ 이 정보는 HTML에 포함되어 검색 엔진이 읽을 수 있습니다
                    </div>
                </div>
            </div>

            {/* Server Component 특징 */}
            <div className="p-4 bg-green-200 rounded">
                <h4 className="font-medium text-green-900 mb-2">⚡ Server Component 특징</h4>
                <ul className="text-green-800 text-sm space-y-1">
                    <li>• 서버에서 미리 렌더링</li>
                    <li>• 데이터베이스 직접 접근 가능</li>
                    <li>• 0KB 클라이언트 번들 크기</li>
                    <li>• SEO 최적화된 HTML</li>
                    <li>• 서버 환경 변수 안전 사용</li>
                </ul>
            </div>
        </div>
    );
}

// 성능 비교 차트 컴포넌트
function PerformanceComparison() {
    const metrics = [
        {
            metric: '초기 로딩 시간',
            client: 85,
            server: 45,
            unit: 'ms',
            description: 'HTML이 화면에 표시되는 시간',
        },
        {
            metric: '번들 크기',
            client: 120,
            server: 0,
            unit: 'KB',
            description: '클라이언트에 전송되는 JavaScript 크기',
        },
        {
            metric: 'SEO 점수',
            client: 60,
            server: 95,
            unit: '/100',
            description: '검색 엔진 최적화 점수',
        },
        {
            metric: '인터랙션 지원',
            client: 100,
            server: 0,
            unit: '%',
            description: '사용자 상호작용 기능 지원도',
        },
    ];

    return (
        <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 성능 비교</h3>
            
            <div className="space-y-6">
                {metrics.map((metric, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                            <span className="text-sm text-gray-600">{metric.description}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {/* Client Component */}
                            <div className="p-3 bg-blue-50 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-blue-900">Client</span>
                                    <span className="text-sm text-blue-700">
                                        {metric.client}{metric.unit}
                                    </span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min(metric.client, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Server Component */}
                            <div className="p-3 bg-green-50 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-green-900">Server</span>
                                    <span className="text-sm text-green-700">
                                        {metric.server}{metric.unit}
                                    </span>
                                </div>
                                <div className="w-full bg-green-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min(metric.server, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 사용 시나리오 가이드
function UsageScenarios() {
    const scenarios = [
        {
            title: '🖥️ Server Components 사용 권장',
            color: 'green',
            cases: [
                '데이터베이스에서 데이터를 페칭하는 경우',
                'SEO가 중요한 콘텐츠 페이지',
                '민감한 API 키나 서버 정보를 다루는 경우',
                '대용량 라이브러리를 사용하는 경우',
                '정적 콘텐츠 표시',
            ],
        },
        {
            title: '💻 Client Components 사용 권장',
            color: 'blue',
            cases: [
                '사용자 상호작용이 필요한 경우 (onClick, onChange)',
                '브라우저 API 사용 (localStorage, geolocation)',
                '실시간 데이터 업데이트가 필요한 경우',
                'React Hook을 사용해야 하는 경우',
                '복잡한 상태 관리가 필요한 경우',
            ],
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {scenarios.map((scenario, index) => (
                <div 
                    key={index}
                    className={`p-6 rounded-lg border ${
                        scenario.color === 'green' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-blue-50 border-blue-200'
                    }`}
                >
                    <h3 className={`text-lg font-semibold mb-4 ${
                        scenario.color === 'green' ? 'text-green-900' : 'text-blue-900'
                    }`}>
                        {scenario.title}
                    </h3>
                    
                    <ul className="space-y-2">
                        {scenario.cases.map((useCase, caseIndex) => (
                            <li 
                                key={caseIndex}
                                className={`text-sm flex items-start ${
                                    scenario.color === 'green' ? 'text-green-800' : 'text-blue-800'
                                }`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full mr-2 mt-2 shrink-0 ${
                                    scenario.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                                }`}></span>
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default function ClientVsServerPage() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Client vs Server Components 비교</h1>
                <Link href="/react19-features/server-components" className="text-blue-600 hover:text-blue-800">
                    ← Server Components 예제로 돌아가기
                </Link>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 비교 목적</h2>
                <p className="text-gray-700">
                    Client Components와 Server Components의 차이점을 실제 동작하는 예제를 통해 
                    직접 체험하고 각각의 장단점과 사용 시나리오를 이해해보세요.
                </p>
            </div>

            {/* 실시간 비교 데모 */}
            <div className="grid gap-6 lg:grid-cols-2 mb-12">
                <ClientComponentDemo />
                <ServerComponentSimulation />
            </div>

            {/* 성능 비교 */}
            <div className="mb-12">
                <PerformanceComparison />
            </div>

            {/* 사용 시나리오 가이드 */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">🗺️ 사용 시나리오 가이드</h2>
                <UsageScenarios />
            </div>

            {/* 하이브리드 접근법 */}
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">🚀 하이브리드 접근법</h3>
                <div className="text-purple-800 text-sm space-y-2">
                    <p>
                        <strong>최적의 성능을 위해서는 두 가지를 조합해서 사용하세요:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>페이지 레이아웃과 초기 데이터는 <strong>Server Components</strong>로</li>
                        <li>상호작용이 필요한 부분만 <strong>Client Components</strong>로</li>
                        <li>Server Component 안에 Client Component를 중첩하여 사용</li>
                        <li>props를 통해 Server에서 Client로 데이터 전달</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 실습 포인트</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• 왼쪽 Client Component에서 버튼을 클릭해보세요 (상호작용 확인)</li>
                    <li>• 페이지 소스 보기로 Server Component 데이터가 HTML에 포함된 것을 확인</li>
                    <li>• 개발자 도구 Network 탭에서 Client Component의 API 호출 확인</li>
                    <li>• Lighthouse로 두 방식의 성능 차이 측정해보기</li>
                </ul>
            </div>
        </div>
    );
}