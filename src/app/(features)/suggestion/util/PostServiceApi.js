import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1/post-service/suggestionPost";

export const createSuggestionPost = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data.data;
};

export const getSuggestionPost = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};

export const updateSuggestionPost = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, data);
  return response.data.data;
};

export const likeSuggestionPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/like`, data);
  return response.data.data;
};

export const unlikeSuggestionPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/unlike`, data);
  return response.data.data;
};

export const deleteSuggestionPost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data.data;
};

export const increaseCommentCount = async (data) => {
  const response = await axios.post(`${BASE_URL}/increaseComment`, data);
  return response.data.data;
};

export const decreaseCommentCount = async (data) => {
  const response = await axios.post(`${BASE_URL}/decreaseComment`, data);
  return response.data.data;
};

export const getSuggestionPosts = async (pageable = {}) => {
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

// 사용 예시:
/*
// 게시글 생성
const newPost = await createSuggestionPost({
  userId: 1,
  title: "새로운 제안",
  content: "제안 내용입니다."
});

// 게시글 조회
const post = await getSuggestionPost(1);

// 게시글 수정
const updatedPost = await updateSuggestionPost(1, {
  userId: 1,
  title: "수정된 제목",
  content: "수정된 내용"
});

// 좋아요
await likeSuggestionPost({
  userId: 1,
  suggestionPostId: 1
});

// 좋아요 취소
await unlikeSuggestionPost({
  userId: 1,
  suggestionPostId: 1
});

// 게시글 삭제
await deleteSuggestionPost(1);

// 댓글 수 증가
await increaseCommentCount({
  userId: 1,
  suggestionPostId: 1
});

// 댓글 수 감소
await decreaseCommentCount({
  userId: 1,
  suggestionPostId: 1
});

// 게시글 목록 조회
const posts = await getSuggestionPosts({
  page: 0,
  size: 10,
  sort: 'createdAt',
  direction: 'DESC'
});
*/
