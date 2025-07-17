"use client";

import React from "react";
import styles from "../reservation/page.module.css";

export default function ConfirmModal({ type, onConfirm, onCancel }) {
  const getModalTitle = () => {
    return "알림";
  };

  const getModalMessage = () => {
    switch (type) {
      case "approve":
        return "해당 상담 신청을 승인 하시겠습니까?";
      case "reject":
        return "해당 상담 신청을 거절 하시겠습니까?";
      case "cancel":
        return "해당 상담을 취소 하시겠습니까?";
      case "complete":
        return "해당 상담을 완료 처리하시겠습니까?";
      case "delete":
        return "해당 예약내역을 삭제 하시겠습니까?";
      default:
        return "상태를 변경하시겠습니까?";
    }
  };

  const getConfirmButtonLabel = () => {
    switch (type) {
      case "approve":
        return "Approve";
      case "reject":
        return "Reject";
      case "cancel":
        return "Cancel";
      case "complete":
        return "Complete";
      case "delete":
        return "Delete";
      default:
        return "Confirm";
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case "approve":
      case "complete":
        return styles.purpleButton;
      case "reject":
      case "cancel":
      case "delete":
        return styles.redButton;
      default:
        return styles.purpleButton;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalTitle}>{getModalTitle()}</div>
        <div className={styles.modalText}>{getModalMessage()}</div>

        <div className={styles.modalButtons}>
          {/* 왼쪽: Confirm 버튼 */}
          <button onClick={onConfirm} className={getConfirmButtonClass()}>
            {getConfirmButtonLabel()}
          </button>

          {/* 오른쪽: Back 버튼 */}
          <button onClick={onCancel} className={styles.backBtn}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

// styles
const overlay = {
  position: "fixed",
  top: 0, left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "24px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const title = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const message = {
  fontSize: "14px",
  marginBottom: "20px",
  textAlign: "center",
};

const textarea = {
  width: "100%",
  height: "100px",
  fontSize: "14px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  resize: "none",
  marginBottom: "20px",
};

const buttonWrap = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  width: "100%",
};

const confirmBtn = {
  flex: 1,
  padding: "10px 0",
  borderRadius: "24px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const backBtn = {
  flex: 1,
  padding: "10px 0",
  borderRadius: "24px",
  border: "1px solid #9C7DEB",
  backgroundColor: "#fff",
  color: "#9C7DEB",
  fontWeight: "bold",
  cursor: "pointer",
};
