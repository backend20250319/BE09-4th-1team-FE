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

export const updateConsultationStatus = async (sessionId, statusUpdateRequestDto) => {
  const token = localStorage.getItem("accessToken");

  return await axios.patch(
    `${BASE_URL}/${sessionId}/status`,
    statusUpdateRequestDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
