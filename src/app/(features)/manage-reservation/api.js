import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/consulting-service/consulting';

// ✅ 매니저 ID로 상담 조회
export const getConsultationsByManagerId = async (managerId) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${BASE_URL}/manager/${managerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.results?.consultations || [];
};

// ✅ 유저 ID로 상담 조회 (🆕 추가된 함수)
export const getConsultationsByUserId = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.results?.consultations || [];
};

// ✅ 상태 변경
export const updateConsultationStatus = async (sessionId, status) => {
  const token = localStorage.getItem("accessToken");

  return await axios.patch(
    `${BASE_URL}/${sessionId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// ✅ 유저 정보 조회
export const getUserById = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    "http://localhost:8000/api/v1/user-service/users/" + userId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
