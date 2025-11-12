import Link from 'next/link';
import { revalidatePath } from 'next/cache';

// Server Action 정의
async function createTodo(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    
    // 여기서 DB에 저장할 수 있습니다
    console.log('Creating todo:', title);
    
    // 페이지 재검증
    revalidatePath('/app-router/server-actions');
}

export default function ServerActionsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Server Actions</h1>
                    <p className="text-gray-600 mb-4">
                        Server Actions를 활용한 폼 처리와 데이터 변경을 학습합니다.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">⚡ Server Actions란?</h2>
                    <p className="text-sm text-blue-800 mb-3">
                        서버에서 실행되는 비동기 함수로, 폼 처리와 데이터 변경을 간단하게 처리할 수 있습니다.
                        <code className="bg-blue-100 px-2 py-1 rounded mx-1">&apos;use server&apos;</code> 디렉티브로 정의합니다.
                    </p>
                    <div className="bg-white p-4 rounded font-mono text-sm">
                        <pre>{`// Server Action 정의
async function createPost(formData: FormData) {
  'use server';
  
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// 사용
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-4">📝 Server Action 폼 예제</h3>
                        <form action={createTodo} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    할 일 제목:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    className="w-full p-2 border rounded"
                                    placeholder="새로운 할 일 입력"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                생성하기
                            </button>
                        </form>
                        <div className="mt-3 text-xs text-gray-600">
                            폼 제출 시 Server Action이 실행됩니다.
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🔧 Server Actions의 장점</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span><strong>Progressive Enhancement:</strong> JavaScript 없이도 동작</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span><strong>타입 안정성:</strong> TypeScript 완벽 지원</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span><strong>자동 직렬화:</strong> FormData 자동 처리</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span><strong>재검증:</strong> revalidatePath/Tag로 캐시 갱신</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span><strong>보안:</strong> 서버에서만 실행</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">📊 Server Actions vs API Routes vs Client-side fetch</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left p-3">특성</th>
                                    <th className="text-left p-3">Server Actions</th>
                                    <th className="text-left p-3">API Routes</th>
                                    <th className="text-left p-3">Client Fetch</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">주 용도</td>
                                    <td className="p-3">폼 처리, Mutation</td>
                                    <td className="p-3">RESTful API</td>
                                    <td className="p-3">클라이언트 요청</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">타입 안정성</td>
                                    <td className="p-3">✅ 완벽</td>
                                    <td className="p-3">⚠️ 수동</td>
                                    <td className="p-3">⚠️ 수동</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Progressive</td>
                                    <td className="p-3">✅ 지원</td>
                                    <td className="p-3">❌ 미지원</td>
                                    <td className="p-3">❌ 미지원</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">재검증</td>
                                    <td className="p-3">✅ 내장</td>
                                    <td className="p-3">⚠️ 수동</td>
                                    <td className="p-3">⚠️ 수동</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎯 사용 패턴</h3>
                        <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3">
                                <strong>인라인 정의</strong>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`<form action={async (formData) => {
  'use server';
  // ...
}}/>`}
                                </div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3">
                                <strong>별도 파일</strong>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`// actions.ts
'use server';
export async function create() { }`}
                                </div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3">
                                <strong>useFormState 사용</strong>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`const [state, formAction] = useFormState(
  serverAction, initialState
);`}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🔄 재검증 옵션</h3>
                        <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3">
                                <strong>revalidatePath</strong>
                                <div className="text-gray-600 text-xs mt-1">
                                    특정 경로의 캐시 재검증
                                </div>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`revalidatePath('/posts')`}
                                </div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3">
                                <strong>revalidateTag</strong>
                                <div className="text-gray-600 text-xs mt-1">
                                    특정 태그의 캐시 재검증
                                </div>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`revalidateTag('posts')`}
                                </div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3">
                                <strong>redirect</strong>
                                <div className="text-gray-600 text-xs mt-1">
                                    다른 페이지로 리다이렉트
                                </div>
                                <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-xs">
                                    {`redirect('/posts')`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>• 폼 처리에는 Server Actions 우선</li>
                            <li>• 입력 검증은 서버에서 수행</li>
                            <li>• 에러 처리 명확히 하기</li>
                            <li>• 재검증으로 UI 최신 유지</li>
                            <li>• 낙관적 업데이트 고려</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-semibold text-yellow-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-sm text-yellow-800">
                            <li>• 직렬화 가능한 데이터만 반환</li>
                            <li>• 클로저 사용 시 주의</li>
                            <li>• 무한 재검증 방지</li>
                            <li>• 보안 검증 필수</li>
                            <li>• 큰 파일 업로드는 별도 처리</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
