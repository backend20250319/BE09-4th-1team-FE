"use client";

import "./ManagerSelection.css";
import React from "react";

const DUMMY_MANAGERS = [
  { id: 1, name: "Mr.빌 강사님", imageUrl: "/images/consulting/mr.bill.jpg" },
  { id: 2, name: "Mr.웨렌 강사님", imageUrl: "/images/consulting/warren.webp" },
  { id: 3, name: "Mr.마 강사님", imageUrl: "/images/consulting/ma.png" },
  { id: 4, name: "Mr.장 강사님", imageUrl: "/images/consulting/jang.jpeg" },
  { id: 5, name: "Mr.강 강사님", imageUrl: "/images/consulting/Kang.png" },
];

export default function ManagerSelection({
  selectedManager,
  onSelect = () => {},
}) {
  const centerManagerIndex = selectedManager
    ? DUMMY_MANAGERS.findIndex((m) => m.id === selectedManager.id)
    : 0;

  const navigateManager = (direction) => {
    let newIndex = centerManagerIndex;
    if (direction === "left") {
      newIndex = Math.max(0, centerManagerIndex - 1);
    } else {
      newIndex = Math.min(DUMMY_MANAGERS.length - 1, centerManagerIndex + 1);
    }
    if (newIndex !== centerManagerIndex) {
      onSelect(DUMMY_MANAGERS[newIndex]);
    }
  };

  return (
    <div className="manager-selection-container">
      <button
        className="arrow-btn left"
        aria-label="이전 매니저"
        onClick={() => navigateManager("left")}
        disabled={centerManagerIndex === 0}
      >
        <img
          src="/images/consulting/next.png"
          alt="이전"
          width={50}
          height={50}
          className={
            centerManagerIndex === 0 ? "arrow-img disabled" : "arrow-img"
          }
        />
      </button>
      <div className="manager-cards-3d">
        {DUMMY_MANAGERS.map((manager, index) => {
          const offset = index - centerManagerIndex;
          // -2, -1, 0, 1, 2만 보이게
          if (Math.abs(offset) > 2) return null;
          const isCenter = offset === 0;
          let style = {
            zIndex: 10 - Math.abs(offset),
            opacity: Math.abs(offset) === 2 ? 0.5 : 1,
            transform: `translate(-50%, -50%) translateX(${
              offset * 220
            }px) scale(${isCenter ? 1.15 : 0.92})`,
            borderColor: isCenter ? "#7C3AED" : "#D1D5DB",
            background: isCenter ? "#fff" : "#e5e6e8",
            boxShadow: isCenter
              ? "0 8px 32px rgba(167,139,250,0.10)"
              : "0 4px 16px rgba(0,0,0,0.08)",
            transition:
              "transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, background 0.3s, box-shadow 0.3s, opacity 0.3s",
            position: "absolute",
            left: "50%",
            top: "50%",
            transformOrigin: "center center",
          };
          return (
            <div
              key={manager.id}
              className={`manager-card${isCenter ? " selected" : ""}`}
              onClick={() => !isCenter && onSelect(manager)}
              style={style}
            >
              <div className="manager-image-box">
                <img
                  src={manager.imageUrl}
                  alt={manager.name}
                  className="manager-image"
                />
              </div>
              <div className="manager-name-box">
                <p className="manager-name">{manager.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="arrow-btn right"
        aria-label="다음 매니저"
        onClick={() => navigateManager("right")}
        disabled={centerManagerIndex === DUMMY_MANAGERS.length - 1}
      >
        <img
          src="/images/consulting/next.png"
          alt="다음"
          width={50}
          height={50}
          className={
            centerManagerIndex === DUMMY_MANAGERS.length - 1
              ? "arrow-img disabled right"
              : "arrow-img right"
          }
        />
      </button>
    </div>
  );
}
