import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/user-service/manager';

// 학생 목록 조회
export async function fetchUsers() {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axios.get(`${BASE_URL}/students`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

// 학생 생성
export async function createUser(newUser) {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axios.post(`${BASE_URL}/users`, newUser, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

// 학생 밴
export async function banUser(id) {
  const accessToken = localStorage.getItem('accessToken');
  await axios.post(`${BASE_URL}/students/${id}/ban`, {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// 학생 언밴
export async function unbanUser(id) {
  const accessToken = localStorage.getItem('accessToken');
  await axios.post(`${BASE_URL}/students/${id}/unban`, {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// 학생 비밀번호 초기화
export async function resetUserPassword(id) {
  const accessToken = localStorage.getItem('accessToken');
  await axios.post(`${BASE_URL}/students/${id}/reset-password`, {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
} 