import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/comment-service/comments';

// 댓글 생성
export const createComment = async (commentCreateRequest) => {
    const response = await axios.post(BASE_URL, commentCreateRequest);
    return response.data;
};

// 댓글 조회
export const getComments = async (postId, page = 0, size = 3) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
        params: { page, size },
    });
    return response.data;
};

// 댓글 수정
export const updateComment = async (commentId, commentUpdateRequest) => {
    const response = await axios.patch(`${BASE_URL}/${commentId}`, commentUpdateRequest);
    return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${BASE_URL}/${commentId}`);
    return response.data;
};

// 댓글 리액션 업데이트
export const updateReaction = async (commentId, reactionStatus) => {
    const response = await axios.patch(`${BASE_URL}/${commentId}/reaction`, null, {
        params: { type: reactionStatus },
    });
    return response.data;
};

// 댓글 총 개수 조회
export const getCommentCount = async (postId) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/count`);
    return response.data;
};
