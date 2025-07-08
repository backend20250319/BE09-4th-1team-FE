'use client';

import styles from './comment-form.css';
import { useState } from 'react';

export default function CommentForm({ user, postId }) {
    const [text, setText] = useState('');

    return (
        <form className='comment-form'>
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
                    {/* 구분선 */}
                    <hr className='divider' />
                    <button type='submit' className='submit-btn'>
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}
