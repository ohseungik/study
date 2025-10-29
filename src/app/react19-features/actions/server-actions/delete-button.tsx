'use client';

/**
 * 삭제 버튼 Client Component
 */

interface DeleteButtonProps {
    post: {
        id: number;
        title: string;
        content: string;
        createdAt: Date;
    };
    deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteButton({ post, deleteAction }: DeleteButtonProps) {
    return (
        <form action={deleteAction} className="inline-block">
            <input type="hidden" name="postId" value={post.id} />
            <button
                type="submit"
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                onClick={(e) => {
                    if (!confirm(`"${post.title}" 포스트를 삭제하시겠습니까?`)) {
                        e.preventDefault();
                    }
                }}
            >
                삭제
            </button>
        </form>
    );
}