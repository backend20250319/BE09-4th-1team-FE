"use client";

import styles from "../styles/Search.module.css";
import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
import { getSuggestionPosts } from "../util/PostServiceApi";

export const Search = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const POSTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0); // API는 0부터 시작
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 게시글 목록을 가져오는 함수
  const fetchPosts = async (page = 0) => {
    console.log("get posts", page);
    try {
      setLoading(true);
      setError(null);

      // 검색 파라미터 구성
      const params = {
        page: page,
        size: POSTS_PER_PAGE,
        sort: "createdAt",
        direction: "DESC",
      };

      const accessToken = localStorage.getItem("accessToken");
      const response = await getSuggestionPosts(accessToken, params);
      setPosts(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      console.error("게시글을 가져오는 중 오류 발생:", err);
      setError("게시글을 불러오는데 실패했습니다.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPosts(currentPage, activeFilter);
  }, [currentPage]);

  // 필터 변경 시 데이터 다시 로드
  useEffect(() => {
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 리셋
    fetchPosts(0, activeFilter);
  }, [activeFilter]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1); // API는 0부터 시작하므로 -1
    console.log(`페이지 변경: ${pageNumber}`);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    console.log(`필터 변경: ${filterType}`);
  };

  // 상태 텍스트 변환 함수
  const getStatusText = (status) => {
    switch (status) {
      case "WAITING":
        return "대기중";
      case "COMPLETED":
        return "완료";
      case "IN_PROGRESS":
        return "진행중";
      default:
        return status;
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  return (
    <div className={styles.inputContainer}>
      <input type="text" placeholder="Search" className={styles.input}></input>
      <div className={styles["filter-tabs"]}>
        <div
          className={`${styles.tab} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("all")}
        >
          전체
        </div>
        <div
          className={`${styles.tab} ${
            activeFilter === "waiting" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("waiting")}
        >
          대기중
        </div>
        <div
          className={`${styles.tab} ${
            activeFilter === "completed" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("completed")}
        >
          완료
        </div>
      </div>

      {/* 헤더 */}
      <PostItem
        id="번호"
        title="제목"
        commentCount=""
        status="상태"
        author="작성자"
        date="작성일"
        isTitle="true"
        href="/suggestion/1"
      />

      {/* 로딩 상태 */}
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          {error}
        </div>
      )}

      {/* 게시글 목록 */}
      {!loading && !error && posts.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          {activeFilter !== "all"
            ? "해당 상태의 게시글이 없습니다."
            : "게시글이 없습니다."}
        </div>
      )}

      {!loading &&
        !error &&
        posts.map((post) => <PostItem key={post.id} post={post} />)}

      <button
        style={{
          width: "200px",
          height: "50px",
          border: "none",
          borderRadius: "30px",
          backgroundColor: "#8876D9",
          marginTop: "30px",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
        }}
        onClick={() => {
          router.push("/suggestion/new");
        }}
      >
        건의하기
      </button>

      {!loading && !error && totalPages > 0 && (
        <Pagination
          currentPage={currentPage + 1} // API는 0부터 시작하지만 UI는 1부터 시작
          totalPages={totalPages.toString()}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
