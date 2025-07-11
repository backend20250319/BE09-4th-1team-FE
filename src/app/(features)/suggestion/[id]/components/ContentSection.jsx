"use client";
import React, { useState } from "react";
import styles from "../styles/ContentSection.module.css";

const ContentSection = ({
  userName,
  createdAt,
  isAnswered,
  content,
  likeCount,
  unlikeCount,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(unlikeCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prevLikes) => prevLikes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes((prevDislikes) => prevDislikes - 1);
        setHasDisliked(false);
      }
    } else {
      setLikes((prevLikes) => prevLikes - 1);
      setHasLiked(false);
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setDislikes((prevDislikes) => prevDislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes((prevLikes) => prevLikes - 1);
        setHasLiked(false);
      }
    } else {
      setDislikes((prevDislikes) => prevDislikes - 1);
      setHasDisliked(false);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.metaInfo}>
        <span className={styles.category}>폴스터디 9기</span>
        <span className={styles.author}>{userName}</span>
        <span className={styles.date}>{createdAt}</span>
      </div>
      <div
        className={`${styles["is-answered-container"]} ${
          isAnswered === null ? styles["answer-content"] : ""
        }`}
      >
        <div className={styles["is-answered"]}>
          {isAnswered === true ? "답변완료" : "답변 대기"}
        </div>
      </div>

      <div>{content}</div>

      <div className={styles.feedbackActions}>
        <button
          className={`${styles.actionButton} ${hasLiked ? styles.liked : ""}`}
          onClick={handleLike}
        >
          ❤️ {likes}
        </button>
        <button
          className={`${styles.actionButton} ${
            hasDisliked ? styles.disliked : ""
          }`}
          onClick={handleDislike}
        >
          🖤 {dislikes}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
