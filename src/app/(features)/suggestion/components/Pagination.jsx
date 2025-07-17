// components/Pagination.jsx
import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 전체 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // '이전' 버튼 클릭 핸들러
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // '다음' 버튼 클릭 핸들러
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={handlePrevClick}
        className={styles.pageButton}
        disabled={currentPage === 1} // 첫 페이지면 비활성화
      >
        &lt; {/* HTML 엔티티로 < 표시 */}
      </button>

      {/* 페이지 번호 목록 */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pageButton} ${
            currentPage === number ? styles.active : ""
          }`}
        >
          {number}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={handleNextClick}
        className={styles.pageButton}
        disabled={currentPage === totalPages} // 마지막 페이지면 비활성화
      >
        &gt; {/* HTML 엔티티로 > 표시 */}
      </button>
    </div>
  );
};

export default Pagination;
