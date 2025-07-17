"use client";

import React, { useState, useEffect } from "react";
import CancelModal from "./CancelModal";
import CancelReasonModal from "./CancelReasonModal";
import styles from "../page.module.css";
import { getUserById } from "../../manage-reservation/api";

export default function ReservationCard({ data }) {
  const {
    sessionId,
    consultationDate,
    localDateTime,
    status,
    managerId,
    adminMessage,
    messageTime,
  } = data;

  const [managerName, setManagerName] = useState("상담사");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReason, setShowReason] = useState(false);

useEffect(() => {
  if (managerId) {
    getUserById(managerId)
      .then((user) => {
        console.log("🔍 getUserById 응답 구조:", user);
        // 응답 구조에 따라 아래 분기
        const name = user.name || user.result?.name;
        if (name) setManagerName(name);
        else console.warn("❗ 이름 필드가 존재하지 않음:", user);
      })
      .catch((err) => {
        console.error("❌ 상담사 이름 불러오기 실패:", err);
      });
  }
}, [managerId]);

  const getButtonText = () => {
    if (status === "Waiting" || status === "Approved") return "Cancel";
    return "Delete";
  };

  const getStatusColor = () => {
    switch (status) {
      case "Waiting":
        return styles.waiting;
      case "Approved":
        return styles.approved;
      case "Rejected":
        return styles.rejected;
      case "Cancelled":
        return styles.cancelled;
      case "Completed":
        return styles.completed;
      default:
        return "";
    }
  };

  const handleFinalSubmit = (reason) => {
    setShowReason(false);
    alert(`예약이 취소되었습니다.\n사유: ${reason}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <img src="/profile.jpg" alt="avatar" className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.name}>{managerName}</div>
          <div className={styles.datetime}>
            {consultationDate}{" "}
            <span className={styles.time}>{localDateTime?.split("T")[1]}</span>
          </div>
          <div className={`${styles.status} ${getStatusColor()}`}>{status}</div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowConfirm(true)}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      {adminMessage && (
        <div className={styles.adminMessage}>
          <div className={styles.messageTime}>{messageTime}</div>
          <div>{adminMessage}</div>
        </div>
      )}

      <CancelModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          setShowReason(true);
        }}
      />

      <CancelReasonModal
        isOpen={showReason}
        onClose={() => setShowReason(false)}
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
}
