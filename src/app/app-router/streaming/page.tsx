import { Suspense } from 'react';
import Link from 'next/link';

// 느린 데이터 페칭 시뮬레이션
async function fetchSlowData(delay: number) {
    await new Promise(resolve => setTimeout(resolve, delay));
    return {
        title: `데이터 (${delay}ms 지연)`,
        content: `이 데이터는 ${delay}ms 후에 로드되었습니다.`,
    };
}

// 빠른 컴포넌트
async function FastComponent() {
    const data = await fetchSlowData(500);
    return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">⚡ {data.title}</h3>
            <p className="text-sm text-green-800">{data.content}</p>
            <div className="text-xs text-gray-500 mt-2">빠르게 표시됨</div>
        </div>
    );
}

// 중간 속도 컴포넌트
async function MediumComponent() {
    const data = await fetchSlowData(1500);
    return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">🕐 {data.title}</h3>
            <p className="text-sm text-yellow-800">{data.content}</p>
            <div className="text-xs text-gray-500 mt-2">중간 속도로 표시됨</div>
        </div>
    );
}

// 느린 컴포넌트
async function SlowComponent() {
    const data = await fetchSlowData(3000);
    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">🐌 {data.title}</h3>
            <p className="text-sm text-red-800">{data.content}</p>
            <div className="text-xs text-gray-500 mt-2">천천히 표시됨</div>
        </div>
    );
}

// 로딩 스켈레톤 컴포넌트
function LoadingSkeleton({ label }: { label: string }) {
    return (
        <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            <div className="text-xs text-gray-400 mt-2">{label} 로딩 중...</div>
        </div>
    );
}

export default function StreamingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Streaming & Suspense</h1>
                    <p className="text-gray-600 mb-4">
                        Streaming SSR과 Suspense를 활용하여 점진적으로 UI를 렌더링합니다.
                        페이지를 새로고침하여 로딩 과정을 확인하세요.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">🌊 Streaming이란?</h3>
                    <p className="text-sm text-blue-800 mb-2">
                        모든 데이터가 준비될 때까지 기다리지 않고, 준비된 부분부터 순차적으로 전송합니다.
                    </p>
                    <div className="text-xs text-blue-700 space-y-1">
                        <div>✓ 초기 로딩 시간 단축 (TTFB 개선)</div>
                        <div>✓ 사용자는 빠르게 콘텐츠를 볼 수 있음</div>
                        <div>✓ SEO에도 유리 (점진적 렌더링)</div>
                    </div>
                </div>

                <div className="grid gap-6 mb-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">📦 Suspense 경계로 분리된 컴포넌트들</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            각 컴포넌트는 서로 다른 속도로 로드됩니다. Suspense를 사용하여 독립적으로 스트리밍됩니다.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <Suspense fallback={<LoadingSkeleton label="빠른 컴포넌트" />}>
                                <FastComponent />
                            </Suspense>

                            <Suspense fallback={<LoadingSkeleton label="중간 컴포넌트" />}>
                                <MediumComponent />
                            </Suspense>

                            <Suspense fallback={<LoadingSkeleton label="느린 컴포넌트" />}>
                                <SlowComponent />
                            </Suspense>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🔄 Streaming SSR 동작 방식</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="font-mono text-blue-600">1.</span>
                                <div>
                                    <strong>초기 HTML 전송:</strong> 즉시 사용 가능한 부분의 HTML을 먼저 전송
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-mono text-blue-600">2.</span>
                                <div>
                                    <strong>Suspense 경계 인식:</strong> 로딩 중인 부분은 fallback UI로 대체
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-mono text-blue-600">3.</span>
                                <div>
                                    <strong>점진적 렌더링:</strong> 데이터가 준비되는 대로 HTML 청크를 스트리밍
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-mono text-blue-600">4.</span>
                                <div>
                                    <strong>hydration:</strong> 클라이언트에서 인터랙티브하게 전환
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚙️ Suspense 사용 패턴</h3>
                        <div className="bg-gray-50 p-3 rounded text-xs font-mono overflow-x-auto">
                            <pre>{`<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>

// 중첩된 Suspense
<Suspense fallback={<PageLoading />}>
  <Header />
  <Suspense fallback={<ContentLoading />}>
    <MainContent />
  </Suspense>
  <Footer />
</Suspense>`}</pre>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                            각 Suspense 경계는 독립적으로 스트리밍됩니다.
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-3">📊 전통적 SSR vs Streaming SSR 비교</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 bg-gray-50">특성</th>
                                    <th className="text-left p-3 bg-red-50">전통적 SSR</th>
                                    <th className="text-left p-3 bg-green-50">Streaming SSR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">데이터 로딩</td>
                                    <td className="p-3">모든 데이터를 기다림</td>
                                    <td className="p-3">준비된 것부터 전송</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">TTFB</td>
                                    <td className="p-3">느림 (모든 데이터 대기)</td>
                                    <td className="p-3">빠름 (즉시 전송 시작)</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">사용자 경험</td>
                                    <td className="p-3">긴 백화면</td>
                                    <td className="p-3">점진적 표시</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">느린 API 영향</td>
                                    <td className="p-3">전체 페이지 지연</td>
                                    <td className="p-3">해당 부분만 지연</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">SEO</td>
                                    <td className="p-3">완전한 HTML</td>
                                    <td className="p-3">점진적이지만 완전함</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Streaming 사용 시나리오</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>대시보드: 각 위젯이 독립적으로 로드</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>상품 목록: 추천/리뷰/상세정보 별도 로딩</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>소셜 피드: 포스트가 준비되는 대로 표시</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>검색 결과: 필터/결과/광고 별도 스트리밍</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-semibold text-yellow-900 mb-3">💡 Best Practices</h3>
                        <ul className="space-y-2 text-sm text-yellow-800">
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>중요한 콘텐츠는 상단에 배치</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>의미 있는 로딩 상태 제공</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>너무 많은 Suspense 경계는 피하기</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>layout shift 최소화 (스켈레톤 크기)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
