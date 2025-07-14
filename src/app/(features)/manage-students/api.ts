import api from '../lib/axios';

// 사용자 목록 조회 (학생+매니저)
export async function fetchUsers() {
  const { data } = await api.get('/api/v1/user-service/manager/students', { withCredentials: true });
  return data;
}

// 사용자 생성 (role: STUDENT 또는 MANAGER)
export async function createUser(userData) {
  await api.post('/api/v1/user-service/manager/users', userData, { withCredentials: true });
}

// 사용자 밴
export async function banUser(id) {
  await api.post(`/api/v1/user-service/manager/students/${id}/ban`, {}, { withCredentials: true });
}

// 사용자 밴 해제
export async function unbanUser(id) {
  await api.post(`/api/v1/user-service/manager/students/${id}/unban`, {}, { withCredentials: true });
}

// 사용자 비밀번호 초기화
export async function resetUserPassword(id) {
  await api.post(`/api/v1/user-service/manager/students/${id}/reset-password`, {}, { withCredentials: true });
} 