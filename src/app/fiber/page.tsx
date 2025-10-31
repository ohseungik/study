import Link from 'next/link';

export default function FiberPage() {
    const examples = [
        {
            title: 'Fiber 트리 구조 시각화',
            description: 'React Flow를 사용하여 Fiber 노드의 트리 구조를 시각적으로 탐색',
            href: '/fiber/tree-visualization',
            status: '완료',
            highlights: ['Fiber 노드 관계', '트리 구조', 'child/sibling/return'],
        },
        {
            title: '렌더링 파이프라인',
            description: 'Render Phase와 Commit Phase의 동작 과정 시각화',
            href: '/fiber/rendering-pipeline',
            status: '완료',
            highlights: ['Render Phase', 'Commit Phase', '우선순위 스케줄링'],
        },
        {
            title: 'Work Loop 동작',
            description: 'Fiber Work Loop의 동작 원리와 인터럽트 가능한 렌더링',
            href: '/fiber/work-loop',
            status: '준비중',
            highlights: ['Time Slicing', 'Concurrent Mode', 'Interruptible Rendering'],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">React Fiber 구조 및 렌더링 파이프라인</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← 메인으로 돌아가기
                </Link>
                <p className="text-gray-600 text-lg">
                    React의 핵심 엔진인 <code className="bg-gray-100 px-2 py-1 rounded">Fiber</code> 아키텍처와 
                    렌더링 파이프라인의 내부 동작을 시각적으로 이해해보세요.
                </p>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🧵 Fiber란?</h2>
                <div className="space-y-3 text-gray-700">
                    <p>
                        <strong>Fiber</strong>는 React 16부터 도입된 새로운 재조정(Reconciliation) 엔진입니다.
                        각 React 엘리먼트에 대응하는 Fiber 노드를 생성하여 트리 구조를 형성합니다.
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 mt-4">
                        <div className="p-4 bg-blue-50 rounded">
                            <h4 className="font-medium text-blue-900 mb-2">주요 특징</h4>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• 작업을 작은 단위로 분할</li>
                                <li>• 우선순위 기반 스케줄링</li>
                                <li>• 렌더링 중단 및 재개 가능</li>
                                <li>• 여러 타입의 업데이트 처리</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded">
                            <h4 className="font-medium text-green-900 mb-2">Fiber 노드 구조</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                <li>• <code>child</code>: 첫 번째 자식</li>
                                <li>• <code>sibling</code>: 다음 형제</li>
                                <li>• <code>return</code>: 부모 노드</li>
                                <li>• <code>alternate</code>: 이전 상태</li>
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
                    <h3 className="font-semibold text-purple-900 mb-3">🔄 Render Phase</h3>
                    <ul className="text-purple-800 text-sm space-y-2">
                        <li>• 가상 DOM 비교 (Reconciliation)</li>
                        <li>• Fiber 트리 순회</li>
                        <li>• 변경사항 표시 (Effects)</li>
                        <li>• 중단 및 재개 가능</li>
                        <li>• 부수효과 없음 (Pure)</li>
                    </ul>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-3">💥 Commit Phase</h3>
                    <ul className="text-orange-800 text-sm space-y-2">
                        <li>• 실제 DOM 업데이트</li>
                        <li>• useEffect 실행</li>
                        <li>• Ref 업데이트</li>
                        <li>• 동기적 실행 (중단 불가)</li>
                        <li>• 화면에 변경사항 반영</li>
                    </ul>
                </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">💡 왜 Fiber를 배워야 할까?</h3>
                <div className="text-yellow-800 text-sm space-y-2">
                    <p>
                        <strong>1. 성능 최적화:</strong> React가 어떻게 효율적으로 업데이트하는지 이해하면 
                        불필요한 리렌더링을 방지할 수 있습니다.
                    </p>
                    <p>
                        <strong>2. 디버깅:</strong> React DevTools에서 보이는 Fiber 트리를 이해하면 
                        복잡한 버그를 쉽게 찾을 수 있습니다.
                    </p>
                    <p>
                        <strong>3. 고급 패턴:</strong> Concurrent Mode, Suspense 등 최신 기능의 
                        동작 원리를 깊이 이해할 수 있습니다.
                    </p>
                    <p>
                        <strong>4. 인터뷰 준비:</strong> 시니어 개발자 면접에서 자주 나오는 주제입니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
