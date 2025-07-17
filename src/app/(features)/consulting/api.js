// src/app/(features)/consulting/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/consulting-service/consulting";

// 상담 예약 생성
const createConsultingReservation = async (consultationDetailsDto, token) => {
  const response = await axios.post(BASE_URL, consultationDetailsDto, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const consultingApi = { createConsultingReservation };

export default consultingApi;

// // 상담 세부 정보 조회 (sessionId로)
// export const getConsultationDetails = async (sessionId) => {
//   const response = await axios.get(`${BASE_URL}/${sessionId}`);
//   return response.data;
// };

// // 유저별 상담 예약 목록 조회
// export const getConsultationsByUserId = async (userId) => {
//   const response = await axios.get(`${BASE_URL}/user/${userId}`);
//   return response.data;
// };

// // 매니저별 상담 예약 목록 조회
// export const getConsultationsByManagerId = async (managerId) => {
//   const response = await axios.get(`${BASE_URL}/manager/${managerId}`);
//   return response.data;
// };

// // 유저별 상태별 상담 예약 조회
// export const getConsultationsByUserIdAndStatus = async (userId, status) => {
//   const response = await axios.get(`${BASE_URL}/user/${userId}/status`, {
//     params: { status },
//   });
//   return response.data;
// };

// // 매니저별 상태별 상담 예약 조회
// export const getConsultationsByManagerIdAndStatus = async (
//   managerId,
//   status
// ) => {
//   const response = await axios.get(`${BASE_URL}/manager/${managerId}/status`, {
//     params: { status },
//   });
//   return response.data;
// };

// // 피드백 및 평점 작성
// export const submitFeedbackAndReview = async (
//   sessionId,
//   consultationFeedbackDto
// ) => {
//   const response = await axios.post(
//     `${BASE_URL}/${sessionId}/feedback`,
//     consultationFeedbackDto
//   );
//   return response.data;
// };

// // 상담 취소
// export const cancelConsultation = async (sessionId) => {
//   const response = await axios.patch(`${BASE_URL}/${sessionId}/cancel`);
//   return response.data;
// };

// // 상담 상태 업데이트
// export const updateConsultationStatus = async (
//   sessionId,
//   statusUpdateRequestDto
// ) => {
//   const response = await axios.patch(
//     `${BASE_URL}/${sessionId}/status`,
//     statusUpdateRequestDto
//   );
//   return response.data;
// };
