import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/consulting-service/consulting';

export const getConsultationsByManagerId = async (managerId) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${BASE_URL}/manager/${managerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.results?.consultations || [];
};

export const updateConsultationStatus = async (sessionId, status) => {
  const token = localStorage.getItem("accessToken");

  return await axios.patch(
    `http://localhost:8000/api/v1/consulting-service/consulting/${sessionId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// userId로 유저 정보 불러오기
export const getUserById = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `http://localhost:8000/api/v1/user-service/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 바로 응답 객체 반환
  return response.data;
};

