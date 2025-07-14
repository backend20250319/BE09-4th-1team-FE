// components/PostItem.jsx
import React from "react";
import styles from "../styles/PostItem.module.css"; // CSS Module 임포트
import Link from "next/link";

const PostItem = ({ post, isTitle = false }) => {
  // isTitle이 true인 경우 헤더 행으로 처리
  if (isTitle) {
    return (
      <div className={`${styles.postItemRow} ${styles.title}`}>
        <div className={styles.columnId}>번호</div>
        <div className={styles.columnTitle}>제목</div>
        <div className={styles.columnStatus}>상태</div>
        <div className={styles.columnAuthor}>작성자</div>
        <div className={styles.columnDate}>작성일</div>
      </div>
    );
  }

  if(post === null|| post===undefined) {
    return null;
  }
  // post 객체에서 데이터 추출
  const {
    id,
    title,
    commentCount = 0,
    isAnswered,
    userName="비니",
    createdAt
  } = post;

  // 상태에 따른 클래스명 동적 할당
  const status = isAnswered ? "답변완료" : "대기중";
  const statusClassName = isAnswered ? styles.statusCompleted : styles.statusPending;

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={styles.postItemRow}>
      <div className={styles.columnId}>{id}</div>
      <Link
        href={`/suggestion/${id}`}
        className={styles.columnTitle}
        style={{
          cursor: "pointer",
          textDecorationLine: "none",
        }}
      >
        {title}
        {commentCount > 0 && (
          <span className={styles.commentCount}>
            {" "}
            [{commentCount > 99 ? "99+" : commentCount}]
          </span>
        )}
      </Link>
      <div className={`${styles.columnStatus} ${statusClassName}`}>
        {status}
      </div>
      <div className={styles.columnAuthor}>{userName}</div>
      <div className={styles.columnDate}>{formatDate(createdAt)}</div>
    </div>
  );
};

export default PostItem;
