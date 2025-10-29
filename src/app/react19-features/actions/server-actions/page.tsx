/**
 * Server Actions 예제 - 서버에서 실행되는 Actions
 */

import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { use } from 'react';
import DeleteButton from './delete-button';
import ScrollToEdit from './scroll-to-edit';

// 가상의 데이터 저장소 (실제로는 데이터베이스 사용)
let posts: { id: number; title: string; content: string; createdAt: Date }[] = [
    {
        id: 1,
        title: '첫 번째 포스트',
        content: 'Server Actions를 사용한 첫 번째 예제입니다.',
        createdAt: new Date('2024-01-01'),
    },
    {
        id: 2,
        title: '두 번째 포스트',
        content: '서버에서 실행되는 Actions의 강력함을 보여줍니다.',
        createdAt: new Date('2024-01-02'),
    },
];

let nextId = 3;

// Server Action: 새 포스트 생성
async function createPost(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 유효성 검사
    if (!title || title.trim().length < 2) {
        throw new Error('제목은 2글자 이상이어야 합니다.');
    }
    
    if (!content || content.trim().length < 10) {
        throw new Error('내용은 10글자 이상이어야 합니다.');
    }
    
    // 시뮬레이션된 지연 (실제 DB 작업을 흉내)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 새 포스트 추가
    const newPost = {
        id: nextId++,
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
    };
    
    posts.unshift(newPost); // 맨 앞에 추가
    
    // 현재 페이지 재검증 (캐시 무효화)
    revalidatePath('/react19-features/actions/server-actions');
    
    console.log('새 포스트 생성됨:', newPost);
}

// Server Action: 포스트 삭제
async function deletePost(formData: FormData) {
    'use server';
    
    const postId = parseInt(formData.get('postId') as string);
    
    // 시뮬레이션된 지연
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 포스트 삭제
    posts = posts.filter(post => post.id !== postId);
    
    // 현재 페이지 재검증
    revalidatePath('/react19-features/actions/server-actions');
    
    console.log('포스트 삭제됨:', postId);
}

// Server Action: 포스트 수정 (리다이렉트 예제)
async function updatePost(formData: FormData) {
    'use server';
    
    const postId = parseInt(formData.get('postId') as string);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 유효성 검사
    if (!title || title.trim().length < 2) {
        throw new Error('제목은 2글자 이상이어야 합니다.');
    }
    
    // 시뮬레이션된 지연
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 포스트 수정
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = {
            ...posts[postIndex],
            title: title.trim(),
            content: content.trim(),
        };
    }
    
    // 수정 후 목록 페이지로 리다이렉트
    revalidatePath('/react19-features/actions/server-actions');
    redirect('/react19-features/actions/server-actions?updated=true');
}

// 삭제 확인 컴포넌트를 별도 파일로 분리합니다

// 수정 폼 컴포넌트
function EditForm({ post }: { post: typeof posts[0] }) {
    return (
        <form action={updatePost} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <input type="hidden" name="postId" value={post.id} />
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                </label>
                <input
                    name="title"
                    defaultValue={post.title}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                </label>
                <textarea
                    name="content"
                    defaultValue={post.content}
                    className="w-full p-2 border border-gray-300 rounded h-24"
                    required
                />
            </div>
            
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    ✅ 수정 완료
                </button>
                <Link
                    href="/react19-features/actions/server-actions"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
                >
                    취소
                </Link>
            </div>
        </form>
    );
}

export default function ServerActionsPage({
    searchParams,
}: {
    searchParams: Promise<{ edit?: string; updated?: string }>;
}) {
    // Next.js 15에서 searchParams는 Promise입니다
    const resolvedSearchParams = use(searchParams);
    const editingPostId = resolvedSearchParams.edit ? parseInt(resolvedSearchParams.edit) : null;
    const editingPost = editingPostId ? posts.find(p => p.id === editingPostId) : null;
    const showUpdatedMessage = resolvedSearchParams.updated === 'true';

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Server Actions 예제</h1>
                <Link href="/react19-features/actions" className="text-blue-600 hover:text-blue-800">
                    ← Actions 예제로 돌아가기
                </Link>
            </div>

            {showUpdatedMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ 포스트가 성공적으로 수정되었습니다!</p>
                </div>
            )}

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>• <code className="bg-white px-2 py-1 rounded">&apos;use server&apos;</code> 지시어로 서버에서 실행</li>
                    <li>• 자동 타입 안전성과 폼 데이터 처리</li>
                    <li>• <code className="bg-white px-2 py-1 rounded">revalidatePath()</code>로 캐시 무효화</li>
                    <li>• <code className="bg-white px-2 py-1 rounded">redirect()</code>로 페이지 이동</li>
                </ul>
            </div>

            {/* 새 포스트 작성 폼 */}
            <div className="mb-8 bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">✍️ 새 포스트 작성</h3>
                <form action={createPost} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="포스트 제목을 입력하세요 (최소 2글자)"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="content"
                            className="w-full p-3 border border-gray-300 rounded-lg h-32"
                            placeholder="포스트 내용을 입력하세요 (최소 10글자)"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        포스트 작성
                    </button>
                </form>
            </div>

            {/* 수정 중인 포스트 */}
            {editingPost && (
                <ScrollToEdit shouldScroll={!!editingPostId}>
                    <div className="mb-8 bg-white p-6 rounded-lg border shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">📝 포스트 수정</h3>
                            <Link
                                href="/react19-features/actions/server-actions"
                                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                취소
                            </Link>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                            <p className="text-blue-800 text-sm">
                                ✏️ <strong>&quot;{editingPost.title}&quot;</strong> 포스트를 수정하고 있습니다.
                            </p>
                        </div>
                        <EditForm post={editingPost} />
                    </div>
                </ScrollToEdit>
            )}

            {/* 포스트 목록 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">📝 포스트 목록 ({posts.length}개)</h3>
                
                {posts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">📭</p>
                        <p>아직 작성된 포스트가 없습니다.</p>
                        <p className="text-sm">위의 폼을 사용해서 첫 번째 포스트를 작성해보세요!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg border">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-semibold">{post.title}</h4>
                                <div className="flex gap-2">
                                    <Link
                                        href={`?edit=${post.id}`}
                                        className={`px-3 py-1 text-sm rounded transition-colors ${
                                            editingPostId === post.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        {editingPostId === post.id ? '수정 중' : '수정'}
                                    </Link>
                                    <DeleteButton post={post} deleteAction={deletePost} />
                                </div>
                            </div>
                            <p className="text-gray-600 mb-3">{post.content}</p>
                            <p className="text-sm text-gray-500">
                                작성일: {post.createdAt.toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Server Actions 동작 방식</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// 1. 서버 함수 정의
async function createPost(formData: FormData) {
    'use server'; // 🔑 서버에서 실행
    
    const data = formData.get('title');
    await db.create(data); // 서버에서 DB 작업
    revalidatePath('/posts'); // 캐시 무효화
}

// 2. 폼에서 직접 사용
<form action={createPost}>
    <input name="title" />
    <button type="submit">제출</button>
</form>

// ✅ 결과: 
// - 폼 제출 시 자동으로 서버 함수 실행
// - 로딩 상태 자동 관리
// - 완료 후 자동 페이지 재검증`}
                </pre>
            </div>
        </div>
    );
}