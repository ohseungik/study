import Link from 'next/link';

export default function StateManagementPage() {
    const examples = [
        {
            title: 'Zustand',
            description: '간단하고 직관적한 상태 관리 라이브러리',
            href: '/state-management/zustand',
            status: '완료',
            highlights: ['간단한 API', 'Provider 불필요', 'TypeScript 지원'],
            pros: ['매우 작은 번들 사이즈', '보일러플레이트 최소화', 'React 외부에서도 사용 가능'],
        },
        {
            title: 'Recoil',
            description: 'Facebook이 만든 React 전용 상태 관리',
            href: '/state-management/recoil',
            status: '완료',
            highlights: ['Atom 기반', 'Selector', '비동기 지원'],
            pros: ['React 친화적', '파생 상태 관리 우수', '동시성 모드 지원'],
        },
        {
            title: 'Jotai',
            description: 'Primitive하고 유연한 상태 관리',
            href: '/state-management/jotai',
            status: '완료',
            highlights: ['Atomic 접근', 'Bottom-up', 'TypeScript 최적화'],
            pros: ['작은 번들 사이즈', 'Recoil보다 간단', '유연한 구조'],
        },
        {
            title: '종합 비교',
            description: '3가지 라이브러리의 실제 사용 예제 비교',
            href: '/state-management/comparison',
            status: '완료',
            highlights: ['Todo App 예제', '성능 비교', '코드 비교'],
            pros: ['실전 활용법', '선택 가이드', 'Best Practices'],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* 헤더 */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
                    >
                        ← 메인으로 돌아가기
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ⚡ 상태 관리 라이브러리 비교
                    </h1>
                    <p className="text-xl text-gray-600">
                        Zustand, Recoil, Jotai 완벽 비교 가이드
                    </p>
                </div>

                {/* 개요 */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">
                        📚 학습 목표
                    </h2>
                    <ul className="text-blue-800 space-y-1">
                        <li>• 각 라이브러리의 핵심 철학과 특징 이해</li>
                        <li>• 실제 Todo 앱을 통한 사용법 비교</li>
                        <li>• 프로젝트 상황에 맞는 라이브러리 선택 가이드</li>
                        <li>• 성능 및 번들 사이즈 비교</li>
                    </ul>
                </div>

                {/* 빠른 비교표 */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        🔍 한눈에 보는 비교
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border-b-2 border-gray-200 p-3 font-semibold">
                                        특징
                                    </th>
                                    <th className="border-b-2 border-gray-200 p-3 font-semibold text-purple-600">
                                        Zustand
                                    </th>
                                    <th className="border-b-2 border-gray-200 p-3 font-semibold text-blue-600">
                                        Recoil
                                    </th>
                                    <th className="border-b-2 border-gray-200 p-3 font-semibold text-green-600">
                                        Jotai
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        번들 사이즈
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ~3KB
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ~21KB
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ~3KB
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        러닝 커브
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ⭐ 매우 쉬움
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ⭐⭐ 보통
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ⭐⭐ 보통
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        Provider 필요
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ❌ 불필요
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 필요
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 필요
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        비동기 지원
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 수동 구현
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 내장 지원
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 내장 지원
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        DevTools
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 있음
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 있음
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 있음
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-3 font-medium">
                                        TypeScript
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 우수
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 우수
                                    </td>
                                    <td className="border-b border-gray-200 p-3">
                                        ✅ 매우 우수
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 예제 카드들 */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {examples.map((example) => (
                        <Link
                            key={example.title}
                            href={example.href}
                            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {example.title}
                                </h3>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    {example.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {example.description}
                            </p>
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {example.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    {example.pros.map((pro) => (
                                        <div
                                            key={pro}
                                            className="text-sm text-gray-600"
                                        >
                                            ✓ {pro}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-blue-600 font-medium">
                                예제 보기 →
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 선택 가이드 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        🎯 어떤 라이브러리를 선택해야 할까?
                    </h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="font-bold text-purple-900 mb-2">
                                Zustand를 선택하세요
                            </h3>
                            <ul className="text-gray-700 space-y-1">
                                <li>• 간단하고 빠르게 시작하고 싶을 때</li>
                                <li>• Provider 래핑을 피하고 싶을 때</li>
                                <li>• 번들 사이즈가 중요할 때</li>
                                <li>• Redux 패턴이 익숙할 때</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-bold text-blue-900 mb-2">
                                Recoil을 선택하세요
                            </h3>
                            <ul className="text-gray-700 space-y-1">
                                <li>• 복잡한 파생 상태가 많을 때</li>
                                <li>• 비동기 데이터 처리가 많을 때</li>
                                <li>• React Concurrent 기능을 활용할 때</li>
                                <li>• Facebook 생태계를 선호할 때</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-bold text-green-900 mb-2">
                                Jotai를 선택하세요
                            </h3>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Recoil의 간단한 대안을 원할 때</li>
                                <li>• TypeScript를 적극 활용할 때</li>
                                <li>• Bottom-up 접근이 필요할 때</li>
                                <li>• 작은 번들 + Atomic 패턴을 원할 때</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
