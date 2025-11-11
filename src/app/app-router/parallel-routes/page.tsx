import Link from 'next/link';

export default function ParallelRoutesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Parallel Routes & Intercepting</h1>
                    <p className="text-gray-600 mb-4">
                        병렬 라우팅과 라우트 가로채기 패턴을 학습합니다.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">🔀 Parallel Routes란?</h2>
                    <p className="text-sm text-blue-800 mb-3">
                        같은 레이아웃에서 하나 이상의 페이지를 동시에 렌더링할 수 있는 기능입니다.
                        <code className="bg-blue-100 px-2 py-1 rounded mx-1">@folder</code> 형식으로 슬롯을 정의합니다.
                    </p>
                    <div className="bg-white p-4 rounded font-mono text-sm">
                        <pre>{`app/
  dashboard/
    @analytics/page.tsx
    @team/page.tsx
    layout.tsx
    page.tsx

// layout.tsx
export default function Layout({
  children,
  analytics,
  team
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  );
}`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📊 Parallel Routes 사용 사례</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><strong>대시보드:</strong> 여러 위젯을 독립적으로 로딩</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><strong>모달:</strong> 페이지 위에 모달 오버레이</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><strong>분할 뷰:</strong> 사이드바와 메인 콘텐츠 병렬</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><strong>A/B 테스트:</strong> 조건부 슬롯 렌더링</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎯 Intercepting Routes</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            특정 라우트를 가로채서 다른 UI를 표시합니다.
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                            <pre>{`app/
  feed/
    (..)photo/[id]/page.tsx  // 가로채기
  photo/
    [id]/page.tsx            // 원본

// (..) = 상위 1단계
// (...)  = 루트부터
// (.)    = 같은 레벨`}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-3">💡 실제 사용 예시: Instagram 스타일 모달</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border rounded p-3">
                            <div className="font-medium mb-2">피드에서 사진 클릭</div>
                            <div className="text-sm text-gray-600">
                                → Intercepting Route로 모달 표시<br />
                                → URL은 /photo/123으로 변경<br />
                                → 뒤로가기 가능
                            </div>
                        </div>
                        <div className="border rounded p-3">
                            <div className="font-medium mb-2">직접 URL 접근</div>
                            <div className="text-sm text-gray-600">
                                → /photo/123 직접 접근<br />
                                → 전체 페이지로 표시<br />
                                → 공유 링크에 최적
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                        <h4 className="font-semibold text-green-900 mb-2">✅ 장점</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• 독립적인 에러 처리</li>
                            <li>• 독립적인 로딩 상태</li>
                            <li>• 조건부 렌더링 용이</li>
                            <li>• SEO 친화적</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">⚠️ 주의사항</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• 복잡도 증가</li>
                            <li>• 과도한 사용 지양</li>
                            <li>• default.tsx 필요</li>
                            <li>• 상태 공유 어려움</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 팁</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• 슬롯은 선택적</li>
                            <li>• default.tsx로 폴백</li>
                            <li>• 모달에 활용</li>
                            <li>• 레이아웃 재사용</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-semibold text-purple-900 mb-3">📚 학습 참고</h3>
                    <p className="text-sm text-purple-800">
                        Parallel Routes와 Intercepting Routes는 고급 기능으로,
                        복잡한 레이아웃이나 모달 UX가 필요한 경우에 사용합니다.
                        대부분의 경우 일반적인 라우팅으로 충분합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
