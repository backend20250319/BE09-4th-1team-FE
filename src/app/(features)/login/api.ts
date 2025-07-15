import api from '../lib/axios';

export async function login({ username, password }: { username: string; password: string }) {
  const res = await api.post('/api/v1/user-service/auth/login', {
    username,
    password,
  });
  return res.data;
}
