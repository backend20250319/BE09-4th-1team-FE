import axios from "./axiosInstance";
const BASE_URL = "http://localhost:8000/api/v1/post-service/answerPost";

// 답변 게시글 생성
export const createAnswerPost = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data.data;
};

// 답변 게시글 조회
export const getAnswerPost = async (id) => {
  const response = await axios.get(`${BASE_URL}/by-suggestion/${id}`);
  return response.data.data;
};

// 답변 게시글 수정
export const updateAnswerPost = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, data);
  return response.data.data;
};

// 답변 게시글 삭제
export const deleteAnswerPost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data.data;
};

// 답변 게시글 좋아요
export const likeAnswerPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/like`, data);
  return response.data.data;
};

// 답변 게시글 좋아요 취소
export const unlikeAnswerPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/unlike`, data);
  return response.data.data;
};

// 댓글 수 증가
export const increaseCommentCount = async (data) => {
  const response = await axios.post(`${BASE_URL}/increaseComment`, data);
  return response.data.data;
};

// 댓글 수 감소
export const decreaseCommentCount = async (data) => {
  const response = await axios.post(`${BASE_URL}/decreaseComment`, data);
  return response.data.data;
};

// 답변 게시글 목록 조회
export const getAnswerPosts = async (pageable = {}) => {
  const {
    page = 0,
    size = 10,
    sort = "createdAt",
    direction = "DESC",
  } = pageable;

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: `${sort},${direction}`,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data.data;
};
