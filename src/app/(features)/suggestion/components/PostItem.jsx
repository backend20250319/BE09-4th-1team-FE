// components/PostItem.jsx
import React from "react";
import styles from "../styles/PostItem.module.css"; // CSS Module 임포트
import Link from "next/link";

const PostItem = ({
  id,
  title,
  commentCount,
  status,
  author,
  date,
  isTitle,
  href,
}) => {
  // 상태에 따른 클래스명 동적 할당
  const statusClassName =
    status === "대기중" ? styles.statusPending : styles.statusCompleted;

  return (
    <div
      className={`${styles.postItemRow} ${
        isTitle === "true" ? styles.title : ""
      }`}
    >
      <div className={styles.columnId}>{id}</div>

      {isTitle === "true" ? (
        <div className={styles.columnTitle}>{title}</div>
      ) : (
        <Link
          href={href}
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
      )}

      <div className={`${styles.columnStatus} ${statusClassName}`}>
        {status}
      </div>
      <div className={styles.columnAuthor}>{author}</div>
      <div className={styles.columnDate}>{date}</div>
    </div>
  );
};

export default PostItem;
