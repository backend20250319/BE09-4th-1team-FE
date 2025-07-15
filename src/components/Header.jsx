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
      if (!accessToken) return;

      try {
        const response = await fetch("http://localhost:8000/api/v1/user-service/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name); // 이름만 저장
        }
      } catch (e) {
        // 에러 처리
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
      <img src={`/images/common/playdata.svg`} alt="logo" className="logo" />

      {/* 메뉴바 - 본인 페이지 경로로 바꿔주세요 */}
      <nav className="menu-bar">
        <Link href="/suggestion">커뮤니티</Link>
        <Link href="/consulting">예약</Link>
        <Link href="/news">뉴스</Link>
      </nav>

      {/* 사용자 정보 */}
      <div className="user-info">
        <img src={`/images/common/user.png`} alt="user icon" className="icon" />
        <span className="username">{userName}</span>
        <span className="logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </header>
  );
}
