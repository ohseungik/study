'use client';

/**
 * 자동 스크롤 기능을 제공하는 Client Component
 */

import { useEffect, useRef } from 'react';

interface ScrollToEditProps {
    shouldScroll: boolean;
    children: React.ReactNode;
}

export default function ScrollToEdit({ shouldScroll, children }: ScrollToEditProps) {
    const editFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldScroll && editFormRef.current) {
            // 약간의 지연을 두고 스크롤 (DOM이 완전히 렌더링된 후)
            const timer = setTimeout(() => {
                editFormRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center', // 화면 중앙으로 스크롤
                });
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [shouldScroll]);

    return (
        <div ref={editFormRef}>
            {children}
        </div>
    );
}