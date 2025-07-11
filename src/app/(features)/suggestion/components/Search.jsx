"use client";

import styles from "@/app/(features)/suggestion/styles/Search.module.css";
import React, { useState } from "react";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const POSTS_PER_PAGE = 10;
  const inputCurrentPage = 10;
  const [currentPage, setCurrentPage] = useState(inputCurrentPage);
  const totalPage = 10;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`페이지 변경: ${pageNumber}`);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    // 실제 앱에서는 여기서 검색 결과나 데이터를 필터링하는 로직을 호출합니다.
    console.log(`필터 변경: ${filterType}, 현재 검색어: ${searchText}`);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // 실제 앱에서는 여기서 검색어에 따라 데이터를 필터링하는 로직을 호출합니다.
    console.log(`검색어 변경: ${e.target.value}`);
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
          All
        </div>
        <div
          className={`${styles.tab} ${
            activeFilter === "waiting" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("waiting")}
        >
          Waiting
        </div>
        <div
          className={`${styles.tab} ${
            activeFilter === "completed" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("completed")}
        >
          Completed
        </div>
      </div>

      {/* Post */}
      <PostItem
        id="번호"
        title="제목"
        commentCount=""
        status="상태"
        author="작성자"
        date="작성일"
        isTitle="true"
        href="/suggestion/1"
      ></PostItem>
      <PostItem
        id="1"
        title="얼음 정수기 배치 부탁드립니다!"
        commentCount="99"
        status="대기중"
        author="비니"
        date="2025-06-27"
        href="/suggestion/1"
      ></PostItem>
      <PostItem
        id="2"
        title="얼음 정수기 배치 부탁드립니다!"
        commentCount="99"
        status="대기중"
        author="비니"
        date="2025-06-27"
        href="/suggestion/1"
      ></PostItem>
      <PostItem
        id="3"
        title="얼음 정수기 배치 부탁드립니다!"
        commentCount="199"
        status="대기중"
        author="비니"
        date="2025-06-27"
        href="/suggestion/1"
      ></PostItem>
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
      <Pagination
        currentPage={currentPage}
        totalPages="10"
        onPageChange={handlePageChange}
      />
    </div>
  );
};
