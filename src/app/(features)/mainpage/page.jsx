"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const cardData = [
  {
    title: "Reservation",
    description:
      "학습, 회고, 개인상담 공간까지!\n원하는 시간에 원하는 대상을 선택하여 상담을 예약해보세요",
    link: "/consulting",
    direction: "right",
  },
  {
    title: "Suggestions",
    description:
      "더 나은 Playdata를 위한 의견을 주세요\n작은 피드백이 커다란 변화를 만듭니다!",
    link: "/suggestion",
    direction: "left",
  },
  {
    title: "Story",
    description:
      "프로젝트, 스터디, 개인 경험 등에서 비롯된 오늘의 한 줄을 남겨보세요\n당신의 고민과 경험은 다른 누군가의 길이 될 수 있어요",
    link: "/suggestion",
    direction: "right",
  },
  {
    title: "Forum",
    description:
      "자유롭게 이야기 나누고 함께 성장하는 공간\nPlaydata 학습자들의 질문과 응답의 지식이 공유되는 열린 커뮤니티입니다\n학습 고민이라면, 당신의 이야기를 자유롭게 함께 소통해요",
    link: "/suggestion",
    direction: "left",
  },
];

export default function MainPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PLAYDATA Community</h1>
      <p className={styles.subtitle}>
        Where developers ask, share, and grow together
      </p>

      <div className={styles.cardContainer}>
        {cardData.map((item, index) => {
          const isLeft = item.direction === "left";

          return (
            <div
              key={index}
              className={`${styles.card} ${
                isLeft ? styles.rightCard : styles.leftCard
              }`}
            >
              {isLeft && (
                <div className={styles.absoluteLeftButton}>
                  <Link href={item.link}>
                    <button className={styles.arrowLeft}>&lt;</button>
                  </Link>
                </div>
              )}

              <div className={styles.cardContent}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>

              {!isLeft && (
                <Link href={item.link}>
                  <button className={styles.arrowRight}>&gt;</button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
