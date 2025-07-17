'use client';
import LoginPage from './LoginPage';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRoute() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        router.replace('/mypage/profile');
      }
    }
  }, []);
  return <LoginPage />;
}
