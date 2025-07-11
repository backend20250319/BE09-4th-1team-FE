'use client';

import { useState } from 'react';
import * as commentApi from '../api'; // API 함수 import
import CommentForm from './CommentForm';
import styles from './comment-item.css';

export default function CommentItem({ item, onUpdate, onDelete }) {
    const [reaction, setReaction] = useState(item.myReaction); // 'LIKE' | 'UNLIKE' | 'NONE'
    const [likeCount, setLikeCount] = useState(item.likeCount);
    const [unlikeCount, setUnlikeCount] = useState(item.unlikeCount);

    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [editContent, setEditContent] = useState(item.content); // 수정할 내용

    const isLiked = reaction === 'LIKE';
    const isUnliked = reaction === 'UNLIKE';

    const handleReaction = async (type) => {
        try {
            const newReaction = reaction === type ? 'NONE' : type;
            const res = await commentApi.updateReaction(item.commentId, newReaction);
            const updated = res.data;

            setReaction(updated.myReaction);
            setLikeCount(updated.likeCount);
            setUnlikeCount(updated.unlikeCount);
        } catch (err) {
            console.error('리액션 업데이트 실패:', err);
        }
    };

    // 메뉴 버튼 클릭
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // 수정 버튼 클릭
    const onClickEdit = () => {
        setIsEditing(true);
        setMenuOpen(false);
    };

    // 삭제 버튼 클릭
    const onClickDelete = async () => {
        setMenuOpen(false);
        try {
            await commentApi.deleteComment(item.commentId);
            if (onDelete) onDelete(item.commentId);
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('삭제에 실패했습니다.');
        }
    };

    // 수정 내용 변경
    const onChangeEditContent = (e) => {
        setEditContent(e.target.value);
    };

    // 수정 완료 버튼 클릭
    const onSaveEdit = async () => {
        try {
            const res = await commentApi.updateComment(item.commentId, { content: editContent });
            setIsEditing(false);
            if (onUpdate) onUpdate(res.data);
        } catch (error) {
            console.error('수정 실패:', error);
            alert('수정에 실패했습니다.');
        }
    };
    // 수정 취소 버튼 클릭
    const onCancelEdit = () => {
        setIsEditing(false);
        setEditContent(item.content); // 원래 내용으로 복구
    };

    return (
        <div className='item-container'>
            {/* item header */}
            <div className='item-header'>
                {/* user info */}
                <div className='item-left'>
                    <span className='course'>{item.author.course}</span>
                    <span className='name'>{item.author.name}</span>
                    <span className='date'>{item.createdAt}</span>
                </div>
                <div className='item-right'>
                    {/* like */}
                    <div className='reaction' onClick={() => handleReaction('LIKE')}>
                        <img
                            src={`/images/comments/${isLiked ? 'like-on.png' : 'like-off.png'}`}
                            alt='like icon'
                            className='icon'
                        />
                        <span className='like-count'>{likeCount}</span>
                    </div>

                    {/* unlike */}
                    <div className='reaction' onClick={() => handleReaction('UNLIKE')}>
                        <img
                            src={`/images/comments/${isUnliked ? 'unlike-on.png' : 'unlike-off.png'}`}
                            alt='unlike icon'
                            className='icon'
                        />
                        <span className='unlike-count'>{unlikeCount}</span>
                    </div>

                    {/* menu */}
                    <div className='menu' onClick={toggleMenu}>
                        <img src={`/images/comments/menu.png`} alt='menu icon' className='icon' />
                    </div>

                    {/* 메뉴 드롭다운 */}
                    {menuOpen && (
                        <div className='menu-dropdown'>
                            <div className='edit' onClick={onClickEdit}>
                                수정 <img src='/images/comments/edit.png' alt='수정 아이콘' />
                            </div>
                            <div className='delete' onClick={onClickDelete}>
                                삭제 <img src='/images/comments/delete.png' alt='삭제 아이콘' />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* line */}
            <hr className='divider' />

            {/* content */}
            <div className='content-container'>
                {isEditing ? (
                    <div className='edit-mode-wrapper'>
                        <textarea
                            value={editContent}
                            onChange={onChangeEditContent}
                            rows={4}
                            className='edit-textarea'
                            maxLength={2000}
                        />
                        <div className='edit-buttons'>
                            <button onClick={onCancelEdit}>취소</button>
                            <button onClick={onSaveEdit}>저장</button>
                        </div>
                    </div>
                ) : (
                    <div className='content'>{item.content}</div>
                )}
            </div>
        </div>
    );
}
