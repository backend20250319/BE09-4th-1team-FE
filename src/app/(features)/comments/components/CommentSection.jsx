// CommentSerction 이동
// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/comments");
// }

import styles from './comment-section.css';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

export default function CommentSection({ postId }) {
    // test data -> TODO : 실제 데이터로 변경
    const user = {
        userId: 1,
        course: '백엔드 8기',
        name: '이정정',
    };

    const item = {
        commentId: 4,
        postId: 1,
        author: {
            userId: 1,
            course: '백엔드 9기',
            name: '이정아',
        },
        content:
            '이 글 정말 도움이 됐어요!2 이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2이 글 정말 도움이 됐어요!2',
        parentId: null,
        likeCount: 200,
        unlikeCount: 0,
        myReaction: 'NONE',
        createdAt: '2025.07.03. 11:38',
        updatedAt: '2025.07.03. 11:38',
    };
    const commentCount = 3;

    return (
        <div className='section-container'>
            <div className='section-inner'>
                {/* comment header */}
                <div className='comment-header'>
                    {/* comment count */}
                    <img src='/images/comments/comment.png' alt='comment icon' className='comment-icon' />
                    <span className='comment-count'>
                        Comments : <span className='count-number'>{commentCount}</span>
                    </span>
                </div>

                {/* comment list */}
                <CommentItem key={item.commentId} item={item} />
                <CommentItem key={item.commentId + 1} item={item} />
                <CommentItem key={item.commentId + 2} item={item} />

                {/* button - more comments */}
                <button className='more-comments'>
                    <span className='more-comments-text'>More comments</span>
                </button>

                {/* comment form */}
                <CommentForm user={user} postId={postId} />
            </div>
        </div>
    );
}
