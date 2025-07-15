'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const LoginButtons = ({ className, username, password }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !(username && password) || isLoading;

  const handleLogin = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user-service/auth/login", {
        username,
        password,
      }, {
  withCredentials: true
});

      // accessToken은 localStorage에 저장
      console.log(res);
      localStorage.setItem('accessToken', res.data.accessToken);
      
      
      // 사용자 정보도 저장 (선택사항)
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userRole', res.data.role);

      alert('로그인 성공!');
      router.push('/mypage'); // 마이페이지로 이동
    } catch (err) {
      console.error('로그인 에러:', err);
      
      
      // 더 구체적인 에러 메시지 제공
      if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        } else if (status === 404) {
          alert('사용자를 찾을 수 없습니다.');
        } else {
          alert(`로그인 실패: ${err.response.data || '알 수 없는 오류가 발생했습니다.'}`);
        }
      } else if (err.request) {
        alert('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={handleLogin}
    >
      {isLoading ? '로그인 중...' : 'Login'}
    </button>
  );
};
