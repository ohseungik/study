'use client';

/**
 * Optimistic Updates 예제 - 낙관적 업데이트로 즉각적인 UI 반응
 */

import { useOptimistic, useState } from 'react';
import Link from 'next/link';

// 데이터 타입 정의
type Post = {
    id: number;
    title: string;
    content: string;
    likes: number;
    createdAt: Date;
};

type Comment = {
    id: number;
    postId: number;
    author: string;
    content: string;
    createdAt: Date;
};

// 초기 데이터
const initialPosts: Post[] = [
    {
        id: 1,
        title: '첫 번째 포스트',
        content: 'Optimistic Updates 예제입니다.',
        likes: 5,
        createdAt: new Date('2024-01-01'),
    },
    {
        id: 2,
        title: '두 번째 포스트',
        content: '즉각적인 UI 반응을 경험해보세요.',
        likes: 12,
        createdAt: new Date('2024-01-02'),
    },
];

const initialComments: Comment[] = [
    {
        id: 1,
        postId: 1,
        author: '김철수',
        content: '좋은 포스트네요!',
        createdAt: new Date('2024-01-01T10:00:00'),
    },
    {
        id: 2,
        postId: 1,
        author: '이영희',
        content: '도움이 되었습니다.',
        createdAt: new Date('2024-01-01T11:00:00'),
    },
];

// 액션 함수들
async function likePost(postId: number): Promise<{ success: boolean; newLikes?: number; error?: string }> {
    // 시뮬레이션된 지연
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 가끔 실패 시뮬레이션 (10% 확률)
    if (Math.random() < 0.1) {
        return { success: false, error: '네트워크 오류가 발생했습니다.' };
    }
    
    // 성공 시 새로운 좋아요 수 반환
    const currentPost = initialPosts.find(p => p.id === postId);
    const newLikes = (currentPost?.likes || 0) + 1;
    
    // 실제로는 데이터베이스에 저장
    if (currentPost) {
        currentPost.likes = newLikes;
    }
    
    return { success: true, newLikes };
}

async function addComment(postId: number, author: string, content: string): Promise<{ success: boolean; comment?: Comment; error?: string }> {
    // 시뮬레이션된 지연
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 가끔 실패 시뮬레이션 (15% 확률)
    if (Math.random() < 0.15) {
        return { success: false, error: '댓글 작성에 실패했습니다.' };
    }
    
    const newComment: Comment = {
        id: Date.now(),
        postId,
        author,
        content,
        createdAt: new Date(),
    };
    
    // 실제로는 데이터베이스에 저장
    initialComments.push(newComment);
    
    return { success: true, comment: newComment };
}

// 좋아요 버튼 컴포넌트
function LikeButton({ post }: { post: Post }) {
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(
        post.likes,
        (currentLikes, increment: number) => currentLikes + increment
    );
    
    const [isLiking, setIsLiking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLike = async () => {
        if (isLiking) return;
        
        setIsLiking(true);
        setError(null);
        
        // 낙관적 업데이트: 즉시 UI에 반영
        setOptimisticLikes(1);
        
        try {
            const result = await likePost(post.id);
            
            if (result.success) {
                // 성공 시: 실제 데이터로 동기화 (이미 optimistic 값이 반영됨)
                console.log(`좋아요 완료: ${result.newLikes}`);
            } else {
                // 실패 시: 롤백
                setOptimisticLikes(-1);
                setError(result.error || '좋아요 처리에 실패했습니다.');
            }
        } catch {
            // 에러 시: 롤백
            setOptimisticLikes(-1);
            setError('네트워크 오류가 발생했습니다.');
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isLiking 
                        ? 'bg-gray-200 cursor-not-allowed' 
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
            >
                <span className="text-lg">❤️</span>
                <span className="font-medium">{optimisticLikes}</span>
                {isLiking && (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-1"></div>
                )}
            </button>
            
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}

// 댓글 폼 컴포넌트
function CommentForm({ postId, onCommentAdded }: { postId: number; onCommentAdded: (comment: Comment) => void }) {
    const [pendingComments, setPendingComments] = useState<Comment[]>([]);
    const [formData, setFormData] = useState({ author: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.author.trim() || !formData.content.trim()) {
            setError('이름과 댓글 내용을 모두 입력해주세요.');
            return;
        }
        
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        setError(null);
        
        // 낙관적 업데이트: 임시 댓글 생성
        const tempComment: Comment = {
            id: Date.now(),
            postId,
            author: formData.author,
            content: formData.content,
            createdAt: new Date(),
        };
        
        setPendingComments(prev => [...prev, tempComment]);
        
        try {
            const result = await addComment(postId, formData.author, formData.content);
            
            if (result.success && result.comment) {
                // 성공 시: 실제 댓글로 교체하고 콜백 호출
                onCommentAdded(result.comment);
                setFormData({ author: '', content: '' });
                setPendingComments(prev => prev.filter(c => c.id !== tempComment.id));
            } else {
                // 실패 시: pending 댓글 제거
                setPendingComments(prev => prev.filter(c => c.id !== tempComment.id));
                setError(result.error || '댓글 작성에 실패했습니다.');
            }
        } catch {
            // 에러 시: pending 댓글 제거
            setPendingComments(prev => prev.filter(c => c.id !== tempComment.id));
            setError('네트워크 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">💬 댓글 작성</h4>
            
            {error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <input
                        type="text"
                        placeholder="이름"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled={isSubmitting}
                    />
                </div>
                
                <div>
                    <textarea
                        placeholder="댓글 내용"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded h-20"
                        disabled={isSubmitting}
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded font-medium ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            작성 중...
                        </span>
                    ) : (
                        '댓글 작성'
                    )}
                </button>
            </form>
            
            {/* Pending 댓글 표시 */}
            {pendingComments.map((comment) => (
                <div key={`pending-${comment.id}`} className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-blue-800">{comment.author}</span>
                        <span className="text-xs text-blue-600 flex items-center gap-1">
                            <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            전송 중...
                        </span>
                    </div>
                    <p className="text-blue-700">{comment.content}</p>
                </div>
            ))}
        </div>
    );
}

// 포스트 컴포넌트
function PostCard({ post, comments }: { post: Post; comments: Comment[] }) {
    const [allComments, setAllComments] = useState(comments);
    
    const handleCommentAdded = (newComment: Comment) => {
        setAllComments(prev => [...prev, newComment]);
    };

    return (
        <div className="bg-white p-6 rounded-lg border">
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.content}</p>
                
                <div className="flex justify-between items-center">
                    <LikeButton post={post} />
                    <span className="text-sm text-gray-500">
                        {post.createdAt.toLocaleDateString('ko-KR')}
                    </span>
                </div>
            </div>
            
            {/* 댓글 목록 */}
            <div className="border-t pt-4">
                <h4 className="font-medium mb-3">댓글 ({allComments.length}개)</h4>
                
                {allComments.length === 0 ? (
                    <p className="text-gray-500 text-sm">첫 번째 댓글을 작성해보세요!</p>
                ) : (
                    <div className="space-y-3">
                        {allComments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-gray-50 rounded">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium">{comment.author}</span>
                                    <span className="text-xs text-gray-500">
                                        {comment.createdAt.toLocaleString('ko-KR')}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
            </div>
        </div>
    );
}

export default function OptimisticUpdatesPage() {
    const postComments = (postId: number) => 
        initialComments.filter(comment => comment.postId === postId);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Optimistic Updates 예제</h1>
                <Link href="/react19-features/actions" className="text-blue-600 hover:text-blue-800">
                    ← Actions 예제로 돌아가기
                </Link>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>• <code className="bg-white px-2 py-1 rounded">useOptimistic</code>로 즉각적인 UI 업데이트</li>
                    <li>• 서버 응답을 기다리지 않고 먼저 UI에 반영</li>
                    <li>• 실패 시 자동으로 이전 상태로 롤백</li>
                    <li>• 향상된 사용자 경험과 체감 성능</li>
                </ul>
            </div>

            <div className="space-y-6">
                {initialPosts.map((post) => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        comments={postComments(post.id)}
                    />
                ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Optimistic Updates 패턴</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// 1. useOptimistic 사용
const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    currentLikes,
    (current, increment) => current + increment
);

// 2. 액션 실행 시 즉시 UI 업데이트
const handleLike = async () => {
    setOptimisticLikes(1); // 즉시 UI에 반영
    
    try {
        const result = await likePost();
        if (!result.success) {
            setOptimisticLikes(-1); // 실패 시 롤백
        }
    } catch {
        setOptimisticLikes(-1); // 에러 시 롤백
    }
};

// ✅ 결과:
// - 버튼 클릭 즉시 좋아요 수 증가
// - 서버 처리 완료까지 기다리지 않음
// - 실패 시 자동으로 원래 값으로 복원`}
                </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🚀 사용자 경험 개선</h4>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                    <div>
                        <h5 className="font-medium text-blue-900 mb-2">기존 방식</h5>
                        <ul className="text-blue-800 space-y-1">
                            <li>• 클릭 → 로딩 → 결과 표시</li>
                            <li>• 서버 응답까지 대기 필요</li>
                            <li>• 느린 체감 성능</li>
                            <li>• 답답한 사용자 경험</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-medium text-blue-900 mb-2">Optimistic Updates</h5>
                        <ul className="text-blue-800 space-y-1">
                            <li>• 클릭 → 즉시 결과 → 서버 동기화</li>
                            <li>• 즉각적인 피드백</li>
                            <li>• 빠른 체감 성능</li>
                            <li>• 자연스러운 사용자 경험</li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-100 rounded">
                    <p className="text-blue-900 font-medium text-sm">
                        💡 <strong>체험해보기:</strong> 위의 좋아요 버튼을 클릭하면 즉시 숫자가 증가하고, 
                        서버 처리가 완료되면 실제 값으로 동기화됩니다. 가끔 실패하는 경우도 체험할 수 있습니다!
                    </p>
                </div>
            </div>
        </div>
    );
}