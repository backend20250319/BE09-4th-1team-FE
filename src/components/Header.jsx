"use client";

import styles from "./header.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserName = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.replace('/login');
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/v1/user-service/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name); // 이름만 저장
        } else {
          // 토큰 만료 등 인증 실패 시
          router.replace('/login');
        }
      } catch (e) {
        // 네트워크 에러 등도 로그인 페이지로 이동
        router.replace('/login');
      }
    };
    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.replace("/login");
  };

  return (
    <header className="header-container">
      {/* 로고 */}
      <img src={`/images/common/playdata.svg`} alt="logo" className="logo" style={{cursor:'pointer'}} onClick={() => router.push('/mypage')} />

      {/* 메뉴바 - 본인 페이지 경로로 바꿔주세요 */}
      <nav className="menu-bar">
        <Link href="/suggestion">커뮤니티</Link>
        <Link href="/consulting">예약</Link>
        {/* <Link href="/news">뉴스</Link> */}
      </nav>

      {/* 사용자 정보 */}
      <div className="user-info">
        <img src={`/images/common/user.png`} alt="user icon" className="icon" style={{cursor:'pointer'}} onClick={() => router.push('/mypage/profile')} />
        <span className="username" style={{cursor:'pointer'}} onClick={() => router.push('/mypage/profile')}>{userName}</span>
        <span className="logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </header>
  );
}
