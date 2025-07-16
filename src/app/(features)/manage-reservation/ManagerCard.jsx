"use client";

import React, { useState, useEffect } from "react";
import styles from "../reservation/page.module.css";
import ConfirmModal from "./ConfirmModal";
import { updateConsultationStatus, getUserById } from "./api";

export default function ManagerCard({ data, onStatusUpdated }) {
  const {
    sessionId,
    userId,
    date,
    time,
    status,
    adminMessage,
    messageTime,
  } = data;

  const [modalType, setModalType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // 🔹 userId로 유저 정보 불러오기
  useEffect(() => {
    if (userId !== null && userId !== undefined && userId !== "null") {
      getUserById(userId)
        .then(setUserInfo)
        .catch((err) => {
          console.error("유저 정보 불러오기 실패:", err);
        });
    }
  }, [userId]);

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
          {/* 왼쪽: 코스 + 이름 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <div className={styles.group}>{userInfo?.course || "로딩 중..."}</div>
            <div style={{ fontWeight: "bold" }}>{userInfo?.name || "불러오는 중..."}</div>
          </div>

          {/* 가운데: 날짜 + 시간 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div className={styles.datetime}>{date}</div>
            <div className={styles.time}>{time}</div>
          </div>

          {/* 오른쪽: 상태 + 버튼 (상태 좌, 버튼 우 세로 정렬) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "20px",
            flex: 1,
          }}>
            {/* 상태 텍스트 */}
            <div className={getStatusColor()}>{status}</div>

            {/* 버튼 세로 정렬 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {status === "Waiting" && (
                <>
                  <button className={styles.purpleButton} onClick={() => openModal("approve")}>
                    Approve
                  </button>
                  <button className={styles.redButton} onClick={() => openModal("reject")}>
                    Reject
                  </button>
                </>
              )}

              {status === "Approved" && (
                <>
                  <button className={styles.purpleButton} onClick={() => openModal("complete")}>
                    Complete
                  </button>
                  <button className={styles.redButton} onClick={() => openModal("cancel")}>
                    Cancel
                  </button>
                </>
              )}

              {(status === "Rejected" || status === "Cancelled" || status === "Completed") && (
                <button className={styles.redButton} onClick={() => openModal("delete")}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 관리자 메시지 영역 */}
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

      {/* 모달 */}
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
