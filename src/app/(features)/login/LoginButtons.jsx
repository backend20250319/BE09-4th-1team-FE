'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';

export const LoginButtons = ({ className, username, password }) => {
  const router = useRouter();
  const isDisabled = !(username && password);

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/v1/user-service/auth/login', {
        username,
        password,
      });

      // accessToken은 localStorage, refreshToken은 쿠키로 옴
      localStorage.setItem('accessToken', res.data.accessToken);

      alert('로그인 성공!');
      router.push('/'); // 메인페이지로 이동
    } catch (err) {
      console.error(err);
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={handleLogin}
    >
      Login
    </button>
  );
};
