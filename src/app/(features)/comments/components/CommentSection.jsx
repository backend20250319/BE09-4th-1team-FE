// CommentSerction 이동
// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/comments");
// }

import styles from './comment-section.css';
import CommentItem from './CommentItem';

export default function CommentSection({ postId }) {
    // test data -> TODO : 실제 데이터로 변경
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
        likeCount: 0,
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
                    <img src='/images/comments/comment.png' alt='comment icon' className='comment-icon' />
                    <span className='comment-count'>
                        Comments : <span className='count-number'>{commentCount}</span>
                    </span>
                </div>

                {/* comment list */}
                <CommentItem key={item.commentId} item={item} />
                <CommentItem key={item.commentId} item={item} />
                <CommentItem key={item.commentId} item={item} />

                {/* more comments */}
                <button className='more-comments'>
                    <span className='more-comments-text'>More comments</span>
                </button>

                {/* comment form */}
                <form className='comment-form'>
                    <div className='form-inner'>hi</div>
                </form>
            </div>
        </div>
    );
}
