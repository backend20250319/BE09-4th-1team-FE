"use client";

import React, { useState, useEffect } from "react";
import styles from "../reservation/page.module.css";
import ConfirmModal from "./ConfirmModal";
import { updateConsultationStatus, getUserById } from "./api";

export default function ManagerCard({ data, onStatusUpdated }) {
  const {
    sessionId,
    userId,
    localDateTime,
    status,
    adminMessage,
    messageTime,
  } = data;

  const [modalType, setModalType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then(setUserInfo)
        .catch((err) => {
          console.error("유저 정보 불러오기 실패:", err);
        });
    }
  }, [userId]);

  // 날짜 및 시간 포맷팅
  const dt = new Date(localDateTime);
  const dateStr = dt.toLocaleDateString("ko-KR").replace(/\./g, ".").replace(/\s/g, "");
  const timeStr = dt.toTimeString().slice(0, 5);

  const getStatusColor = () => {
    switch (status) {
      case "Waiting": return styles.waiting;
      case "Approved": return styles.approved;
      case "Rejected": return styles.rejected;
      case "Cancelled": return styles.cancelled;
      case "Completed": return styles.completed;
      default: return "";
    }
  };

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleConfirm = async () => {
    const newStatus =
      modalType === "cancel" ? "Cancelled" :
      modalType === "reject" ? "Rejected" :
      modalType === "approve" ? "Approved" :
      modalType === "complete" ? "Completed" :
      null;

    if (!newStatus) return;

    try {
      await updateConsultationStatus(sessionId, newStatus);
      onStatusUpdated();
    } catch (err) {
      console.error("상태 업데이트 실패:", err);
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.row}>
          {/* 좌측: 과정/이름 */}
          <div className={styles.userInfo}>
            <span className={styles.course}>{userInfo?.course || "과정 로딩 중"}</span>
            <span className={styles.name}>{userInfo?.name || "이름 로딩 중"}</span>
          </div>

          {/* 가운데: 날짜/시간 */}
          <div className={styles.datetimeBox}>
            <span className={styles.datetime}>{dateStr}</span>
            <span className={styles.time}>{timeStr}</span>
          </div>

          {/* 우측: 상태 + 버튼 */}
          <div className={styles.statusButtonArea}>
            <div className={`${styles.statusText} ${getStatusColor()}`}>
              {status}
            </div>

            <div className={styles.buttonGroup}>
              {status === "Waiting" && (
                <>
                  <button className={styles.purpleButton} onClick={() => openModal("approve")}>Approve</button>
                  <button className={styles.redButton} onClick={() => openModal("reject")}>Reject</button>
                </>
              )}

              {status === "Approved" && (
                <>
                  <button className={styles.purpleButton} onClick={() => openModal("complete")}>Complete</button>
                  <button className={styles.redButton} onClick={() => openModal("cancel")}>Cancel</button>
                </>
              )}

              {(status === "Rejected" || status === "Cancelled" || status === "Completed") && (
                <button className={styles.redButton} onClick={() => openModal("delete")}>Delete</button>
              )}
            </div>
          </div>
        </div>

        {/* 관리자 메시지 */}
        {adminMessage && (
          <div className={styles.adminMessage} style={{ marginTop: "12px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
              매니저 {userInfo?.name || ""}{" "}
              <span className={styles.messageTime}>· {messageTime}</span>
            </div>
            <div>{adminMessage}</div>
          </div>
        )}
      </div>

      {/* 확인 모달 */}
      {modalType && (
        <ConfirmModal
          type={modalType}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      )}
    </>
  );
}
