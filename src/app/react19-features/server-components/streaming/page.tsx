/**
 * Streaming SSR 예제 - 점진적 로딩과 Suspense를 활용한 성능 최적화
 */

import Link from 'next/link';
import { Suspense } from 'react';

// 다양한 속도의 데이터 페칭 함수들
async function fetchFastData() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        title: '빠른 데이터',
        content: '이 데이터는 300ms 후에 로드됩니다.',
        loadTime: '300ms',
    };
}

async function fetchMediumData() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        title: '중간 속도 데이터',
        content: '이 데이터는 1.5초 후에 로드됩니다.',
        items: ['아이템 1', '아이템 2', '아이템 3', '아이템 4'],
        loadTime: '1500ms',
    };
}

async function fetchSlowData() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
        title: '느린 데이터',
        content: '이 데이터는 3초 후에 로드됩니다.',
        charts: [
            { label: 'React', value: 85 },
            { label: 'Next.js', value: 78 },
            { label: 'TypeScript', value: 92 },
            { label: 'Node.js', value: 70 },
        ],
        loadTime: '3000ms',
    };
}

async function fetchVerySlowData() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return {
        title: '매우 느린 데이터',
        content: '이 데이터는 5초 후에 로드됩니다.',
        bigData: Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `데이터 항목 ${i + 1}`,
            value: Math.floor(Math.random() * 1000),
            status: Math.random() > 0.5 ? 'active' : 'inactive',
        })),
        loadTime: '5000ms',
    };
}

// 로딩 컴포넌트들
function QuickLoader() {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    );
}

function DetailedLoader({ label }: { label: string }) {
    return (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2 text-center">
                {label} 로딩 중...
            </h3>
            <div className="space-y-2">
                <div className="h-3 bg-blue-200 rounded animate-pulse"></div>
                <div className="h-3 bg-blue-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-blue-200 rounded animate-pulse w-1/2"></div>
            </div>
        </div>
    );
}

function ComplexLoader() {
    return (
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <div className="flex items-center mb-4">
                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                <h3 className="text-lg font-semibold text-purple-900">복잡한 데이터 처리 중...</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-16 bg-purple-200 rounded animate-pulse"></div>
                ))}
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-700">
                    <span>데이터 처리 진행률</span>
                    <span>처리 중...</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
            </div>
        </div>
    );
}

// Server Components (각각 다른 속도로 로드)
async function FastComponent() {
    const data = await fetchFastData();
    
    return (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-green-900">{data.title}</h3>
                <span className="text-xs text-green-700 bg-green-200 px-2 py-1 rounded">
                    {data.loadTime}
                </span>
            </div>
            <p className="text-green-800">{data.content}</p>
            <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-green-700 text-sm">
                    ✅ 이 컴포넌트는 가장 빠르게 로드되어 사용자가 즉시 볼 수 있습니다.
                </p>
            </div>
        </div>
    );
}

async function MediumComponent() {
    const data = await fetchMediumData();
    
    return (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-yellow-900">{data.title}</h3>
                <span className="text-xs text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                    {data.loadTime}
                </span>
            </div>
            <p className="text-yellow-800 mb-4">{data.content}</p>
            
            <div className="grid grid-cols-2 gap-2">
                {data.items.map((item, index) => (
                    <div key={index} className="p-2 bg-yellow-100 rounded text-sm text-yellow-700">
                        {item}
                    </div>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded">
                <p className="text-yellow-700 text-sm">
                    ⏳ 이 컴포넌트는 빠른 컴포넌트 이후에 나타납니다.
                </p>
            </div>
        </div>
    );
}

async function SlowComponent() {
    const data = await fetchSlowData();
    
    return (
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-orange-900">{data.title}</h3>
                <span className="text-xs text-orange-700 bg-orange-200 px-2 py-1 rounded">
                    {data.loadTime}
                </span>
            </div>
            <p className="text-orange-800 mb-4">{data.content}</p>
            
            <div className="space-y-3">
                {data.charts.map((chart, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">{chart.label}</span>
                        <div className="flex-1 mx-3 bg-orange-200 rounded-full h-2">
                            <div 
                                className="bg-orange-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${chart.value}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-orange-700 w-10">{chart.value}%</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-orange-100 rounded">
                <p className="text-orange-700 text-sm">
                    🐌 이 컴포넌트는 복잡한 처리로 인해 늦게 나타납니다.
                </p>
            </div>
        </div>
    );
}

async function VerySlowComponent() {
    const data = await fetchVerySlowData();
    
    return (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-red-900">{data.title}</h3>
                <span className="text-xs text-red-700 bg-red-200 px-2 py-1 rounded">
                    {data.loadTime}
                </span>
            </div>
            <p className="text-red-800 mb-4">{data.content}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {data.bigData.map((item) => (
                    <div key={item.id} className="p-3 bg-red-100 rounded">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-red-900 text-sm">{item.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                                item.status === 'active' 
                                    ? 'bg-green-200 text-green-800' 
                                    : 'bg-gray-200 text-gray-800'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                        <div className="text-red-700 text-sm">값: {item.value}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-700 text-sm">
                    🚀 이 컴포넌트는 대용량 데이터 처리로 가장 늦게 나타납니다.
                </p>
            </div>
        </div>
    );
}

export default function StreamingSSRPage() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Streaming SSR 예제</h1>
                <Link href="/react19-features/server-components" className="text-blue-600 hover:text-blue-800">
                    ← Server Components 예제로 돌아가기
                </Link>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 Streaming SSR이란?</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>• <strong>점진적 렌더링:</strong> 페이지를 여러 부분으로 나누어 준비되는 대로 전송</li>
                    <li>• <strong>Suspense 경계:</strong> 각 컴포넌트가 독립적으로 로딩되고 표시됨</li>
                    <li>• <strong>향상된 UX:</strong> 빠른 부분을 먼저 보여줘서 체감 성능 개선</li>
                    <li>• <strong>병렬 처리:</strong> 여러 데이터를 동시에 페칭하여 전체 로딩 시간 단축</li>
                </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">📊 로딩 순서 관찰하기</h3>
                <p className="text-blue-800 text-sm">
                    페이지를 새로고침하면 컴포넌트들이 로딩 시간에 따라 순차적으로 나타나는 것을 확인할 수 있습니다:
                </p>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-green-100 text-green-800 rounded">1. 빠른 데이터 (300ms)</div>
                    <div className="p-2 bg-yellow-100 text-yellow-800 rounded">2. 중간 데이터 (1.5s)</div>
                    <div className="p-2 bg-orange-100 text-orange-800 rounded">3. 느린 데이터 (3s)</div>
                    <div className="p-2 bg-red-100 text-red-800 rounded">4. 매우 느린 데이터 (5s)</div>
                </div>
            </div>

            {/* Streaming 데모 */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* 빠른 컴포넌트 - 즉시 로드 */}
                <Suspense fallback={<QuickLoader />}>
                    <FastComponent />
                </Suspense>

                {/* 중간 속도 컴포넌트 */}
                <Suspense fallback={<DetailedLoader label="중간 속도 데이터" />}>
                    <MediumComponent />
                </Suspense>

                {/* 느린 컴포넌트 */}
                <Suspense fallback={<DetailedLoader label="복잡한 차트 데이터" />}>
                    <SlowComponent />
                </Suspense>

                {/* 매우 느린 컴포넌트 */}
                <Suspense fallback={<ComplexLoader />}>
                    <VerySlowComponent />
                </Suspense>
            </div>

            {/* 설명 섹션 */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-3">✅ Streaming의 장점</h3>
                    <ul className="text-green-800 text-sm space-y-2">
                        <li>• <strong>빠른 First Paint:</strong> 준비된 부분부터 즉시 표시</li>
                        <li>• <strong>점진적 향상:</strong> 느린 부분이 완료되면 자동으로 업데이트</li>
                        <li>• <strong>병렬 처리:</strong> 여러 데이터 소스를 동시에 처리</li>
                        <li>• <strong>메모리 효율성:</strong> 필요한 부분만 순차적으로 렌더링</li>
                    </ul>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3">🎮 사용자 경험</h3>
                    <ul className="text-purple-800 text-sm space-y-2">
                        <li>• <strong>즉각적 피드백:</strong> 빈 페이지 대신 부분적 콘텐츠</li>
                        <li>• <strong>진행 상황 인식:</strong> 로딩 중임을 명확히 표시</li>
                        <li>• <strong>상호작용 가능:</strong> 로드된 부분부터 상호작용 시작</li>
                        <li>• <strong>체감 성능:</strong> 전체 로딩 시간과 무관한 빠른 경험</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Streaming SSR 구현 패턴</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// 1. Suspense로 각 컴포넌트를 감싸기
<Suspense fallback={<LoadingComponent />}>
    <SlowServerComponent />
</Suspense>

// 2. 독립적인 Server Component 정의
async function SlowServerComponent() {
    const data = await fetchSlowData(); // 서버에서 데이터 페칭
    return <div>{data.content}</div>;
}

// 3. 다양한 로딩 UI 제공
function LoadingComponent() {
    return <div className="animate-pulse">로딩 중...</div>;
}

// ✅ 결과:
// - 각 컴포넌트가 준비되는 대로 표시
// - 사용자는 빈 페이지를 기다리지 않음
// - 전체 페이지 로딩 완료를 기다리지 않음`}
                </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-blue-900 text-sm">
                    🔄 <strong>실험해보기:</strong> 페이지를 새로고침하여 각 컴포넌트가 다른 시점에 
                    나타나는 Streaming 효과를 직접 체험해보세요! 개발자 도구의 Network 탭에서 
                    HTML이 여러 청크로 전송되는 것도 확인할 수 있습니다.
                </p>
            </div>
        </div>
    );
}