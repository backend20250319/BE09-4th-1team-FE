"use client";

import styles from "./header.css";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Header() {
  // TODO : 나중에 실제 데이터로 변경
  const userName = "이정아";
  // ----

  const router = useRouter();
  const handleLogout = () => {
    // ✅ 세션/스토리지 클리어
    localStorage.clear();
    sessionStorage.clear();

    // 로그인 이동
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
