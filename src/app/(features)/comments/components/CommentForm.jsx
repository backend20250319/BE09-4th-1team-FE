'use client';

import styles from './comment-form.css';
import * as commentApi from '../api';
import { useState } from 'react';
import axios from 'axios';

export default function CommentForm({ user, postId, onCommentAdded }) {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const commentCreateRequest = {
            postId,
            content: text,
        };

        try {
            setIsSubmitting(true);
            const res = await commentApi.createComment(commentCreateRequest);
            console.log('댓글 등록 성공:', res);

            // ✅ 등록 후 상위로 전달
            if (onCommentAdded) {
                onCommentAdded(res.data);
            }

            setText('');
        } catch (error) {
            console.error('댓글 등록 실패:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            <div className='form-inner'>
                {/* 사용자 정보 */}
                <div className='item-left'>
                    <span className='course'>{user.course}</span>
                    <span className='name'>{user.name}</span>
                    <span className='date'>{user.createdAt}</span>
                </div>

                {/* 댓글 입력 */}
                <div className='input-container'>
                    <div className='input-wrapper'>
                        <textarea
                            className='comment-input'
                            placeholder='Please enter your comment here'
                            maxLength={2000}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className='text-count-wrapper'>
                        <span className='text-count'>{text.length}/2000</span>
                    </div>
                </div>

                {/* 제출 버튼 */}
                <div className='submit-container'>
                    <hr className='divider' />
                    <button type='submit' className='submit-btn' disabled={isSubmitting}>
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}
