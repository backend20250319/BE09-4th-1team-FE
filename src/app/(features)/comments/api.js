import axios from './axiosInstance'; // axios 인스턴스 사용, accessToken 자동 주입됨

// 댓글 생성
export const createComment = async (commentCreateRequest) => {
    const response = await axios.post('', commentCreateRequest); // baseURL이 이미 /comments니까 ''로 호출
    return response.data;
};

// 댓글 조회
export const getComments = async (postId, page = 0, size = 3) => {
    const response = await axios.get(`/posts/${postId}`, {
        params: { page, size },
    });
    return response.data;
};

// 댓글 수정
export const updateComment = async (commentId, commentUpdateRequest) => {
    const response = await axios.patch(`/${commentId}`, commentUpdateRequest);
    return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
    const response = await axios.delete(`/${commentId}`);
    return response.data;
};

// 댓글 리액션 업데이트
export const updateReaction = async (commentId, reactionStatus) => {
    const response = await axios.patch(`/${commentId}/reaction`, null, {
        params: { type: reactionStatus },
    });
    return response.data;
};

// 댓글 총 개수 조회
export const getCommentCount = async (postId) => {
    const response = await axios.get(`/posts/${postId}/count`);
    return response.data;
};
