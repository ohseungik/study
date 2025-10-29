/**
 * React 19 Actions 기능 소개 및 예제 목록
 */

import Link from 'next/link';

export default function ActionsPage() {
    const examples = [
        {
            title: 'Server Actions',
            description: '서버에서 실행되는 Actions으로 데이터 변경 및 비즈니스 로직 처리',
            href: '/react19-features/actions/server-actions',
            status: '완료',
            highlights: ['서버사이드 실행', '타입 안전성', '자동 재검증'],
        },
        {
            title: 'Form Actions', 
            description: '폼과 연동된 Actions으로 간편한 상태 관리와 검증',
            href: '/react19-features/actions/form-actions',
            status: '완료',
            highlights: ['자동 폼 처리', '내장 검증', '로딩 상태'],
        },
        {
            title: 'Optimistic Updates',
            description: '낙관적 업데이트로 즉각적인 UI 반응과 향상된 사용자 경험',
            href: '/react19-features/actions/optimistic-updates',
            status: '완료',
            highlights: ['즉시 UI 반영', '에러 롤백', 'UX 최적화'],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">React 19 Actions</h1>
                <Link href="/react19-features" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← React 19 기능 목록으로 돌아가기
                </Link>
                <p className="text-gray-600 text-lg">
                    React 19에서 새롭게 도입된 <code className="bg-gray-100 px-2 py-1 rounded">Actions</code>의 다양한 활용 예제를 살펴보세요.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">🚀 Actions란?</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• <strong>Server Actions:</strong> 서버에서 실행되는 함수로 데이터 변경과 비즈니스 로직 처리</li>
                        <li>• <strong>Form Actions:</strong> 폼과 자동 연동되어 간편한 상태 관리 제공</li>
                        <li>• <strong>Optimistic Updates:</strong> UI를 먼저 업데이트하고 서버 응답을 기다리는 패턴</li>
                        <li>• <strong>자동 재검증:</strong> Actions 완료 후 관련 데이터 자동 새로고침</li>
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
                <h2 className="text-xl font-semibold mb-4">💡 Actions의 장점</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">🔒 보안성</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 서버에서 실행되어 민감한 로직 보호</li>
                            <li>• 클라이언트 코드에 비즈니스 로직 노출 방지</li>
                            <li>• 자동 CSRF 보호</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">⚡ 성능</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 번들 크기 감소 (서버 로직 분리)</li>
                            <li>• 자동 캐시 무효화</li>
                            <li>• 스트리밍 응답 지원</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">🎯 개발자 경험</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 타입스크립트 완전 지원</li>
                            <li>• 간단한 폼 처리</li>
                            <li>• 자동 에러 처리</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">👥 사용자 경험</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 즉각적인 UI 반응</li>
                            <li>• 자동 로딩 상태 관리</li>
                            <li>• 오프라인 대응 가능</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">🛠️ 기본 사용법</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// server action 정의 (server component 또는 별도 파일)
'use server'

async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    // 서버에서 데이터베이스 작업 수행
    await db.post.create({ data: { title } });
    revalidatePath('/posts'); // 관련 페이지 재검증
}

// client component에서 사용
function PostForm() {
    return (
        <form action={createPost}>
            <input name="title" placeholder="제목 입력" />
            <button type="submit">작성</button>
        </form>
    );
}`}
                </pre>
            </div>
        </div>
    );
}