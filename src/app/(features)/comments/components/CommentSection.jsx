'use client';

import { useEffect, useState } from 'react';
import * as commentApi from '../api';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import styles from './comment-section.css';

export default function CommentSection({ postId }) {
    // 댓글 목록
    const [comments, setComments] = useState([]);

    // 총 댓글 수
    const [totalCount, setTotalCount] = useState(0);

    // 페이지네이션
    const [page, setPage] = useState(0);
    const [size] = useState(3);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // 댓글 수 불러오기
    const loadCommentCount = async () => {
        try {
            const res = await commentApi.getCommentCount(postId);
            setTotalCount(res.data.count);
        } catch (error) {
            console.error('댓글 수 불러오기 실패', error);
        }
    };

    // 댓글 목록 불러오기
    const loadComments = async (pageToLoad) => {
        setLoading(true);
        try {
            const res = await commentApi.getComments(postId, pageToLoad, size);
            const newComments = res.data.content || []; // 맞게 수정 필요
            setComments((prev) => (pageToLoad === 0 ? newComments : [...prev, ...newComments]));
            setHasMore(newComments.length === size); // 더 불러올 댓글이 있으면 true
            setPage(pageToLoad);
        } catch (error) {
            console.error('댓글 로딩 실패', error);
        } finally {
            setLoading(false);
        }
    };

    // 첫 렌더링 시 0페이지 댓글 불러오기
    useEffect(() => {
        // TODO 임시 토큰
        localStorage.setItem(
            'accessToken',
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMTIzIiwidXNlcklkIjoyLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc1MjQ4MTM2MywiZXhwIjoxNzUyNDgyMjYzfQ.TTGYFCvX8mCDI_qBD5uCp2i0SwkokpLdR-hFnAPQ1SvUz6NJoE-o6syFXlxdGFoM7z-X6fqwzgjAEEjakw7-Xg'
        );

        loadComments(0);
        loadCommentCount();
    }, [postId]);

    // 댓글 수정 시 상태 업데이트
    const handleUpdateComment = (updatedComment) => {
        setComments((prev) =>
            prev.map((comment) => (comment.commentId === updatedComment.commentId ? updatedComment : comment))
        );
    };

    // 댓글 삭제 시 상태 업데이트
    const handleDeleteComment = (deletedCommentId) => {
        setComments((prev) => prev.filter((comment) => comment.commentId !== deletedCommentId));
        loadCommentCount(); // 댓글 수 갱신
    };

    // 더 보기 버튼 클릭
    const handleLoadMore = () => {
        if (!loading && hasMore) {
            loadComments(page + 1);
        }
    };

    return (
        <div className='section-container'>
            <div className='section-inner'>
                <div className='comment-header'>
                    <img src='/images/comments/comment.png' alt='comment icon' className='comment-icon' />
                    <span className='comment-count'>
                        Comments : <span className='count-number'>{totalCount}</span>
                    </span>
                </div>

                {/* 댓글 리스트 */}
                {comments.map((item) => (
                    <CommentItem
                        key={item.commentId}
                        item={item}
                        onUpdate={handleUpdateComment}
                        onDelete={handleDeleteComment}
                    />
                ))}

                {/* 더 보기 버튼 */}
                {hasMore && (
                    <button className='more-comments' onClick={handleLoadMore} disabled={loading}>
                        {loading ? 'Loading...' : 'More comments'}
                    </button>
                )}

                {/* 댓글 작성 폼 */}
                <CommentForm
                    user={{ userId: 2, course: '백엔드 8기', name: '이정정' }}
                    postId={postId}
                    onCommentAdded={(newComment) => {
                        setComments((prev) => [newComment, ...prev]);
                        loadCommentCount(); // 댓글 수 갱신
                    }}
                />
            </div>
        </div>
    );
}
