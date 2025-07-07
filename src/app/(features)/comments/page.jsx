'use client';

import CommentSection from './components/CommentSection';

export default function Page() {
    const postId = 1;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>게시글 페이지</h1>
            <p>이곳은 게시글 #{postId}의 내용입니다.</p>

            <hr />

            {/* postId를 prop으로 넘김 */}
            <CommentSection postId={postId} />
        </div>
    );
}
