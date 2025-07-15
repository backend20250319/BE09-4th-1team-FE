import api from '../lib/axios';

// 내 정보 조회
export async function fetchMyInfo() {
  const { data } = await api.get('/api/v1/user-service/users/me', {
    withCredentials: true,
  });
  return data;
}

// 이름 변경
export async function changeMyName(password: string, newName: string) {
  await api.put('/api/v1/user-service/users/me/name', { password, newName }, {
    withCredentials: true,
  });
}

// 이메일 변경
export async function changeMyEmail(password: string, newEmail: string) {
  await api.put('/api/v1/user-service/users/me/email', { password, newEmail }, {
    withCredentials: true,
  });
}

// 비밀번호 변경
export async function changeMyPassword(oldPassword: string, newPassword: string) {
  await api.put('/api/v1/user-service/users/me/password', { oldPassword, newPassword }, {
    withCredentials: true,
  });
}

// 회원 탈퇴
export async function deleteMyAccount(password: string) {
  await api.delete('/api/v1/user-service/users/me', {
    data: { password },
    withCredentials: true,
  });
}
