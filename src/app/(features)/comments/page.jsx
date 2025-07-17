'use client';

import CommentSection from './components/CommentSection';

export default function Page() {
    const postId = 1;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>댓글 컴포넌트 사용 예시</h1>

            {/* 댓글 컴포넌트 : postId를 prop으로 넘김 */}
            <CommentSection postId={postId} />
        </div>
    );
}
