import axios from 'axios';

const BASE_URL = ' http://localhost:8000/api/v1/consulting-service/api/v1/consulting';

// 유저별 상담 예약 목록 조회
export const getConsultationsByUserId = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};