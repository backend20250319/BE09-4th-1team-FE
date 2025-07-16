"use client";

import React from "react";

export default function ConfirmModal({ type, onClose, onConfirm, reason, setReason }) {
  const isInputRequired = type === "cancel" || type === "reject";

  const getTitle = () => {
    if (type === "cancel") return "취소 사유";
    if (type === "reject") return "거절 사유";
    return "알림";
  };

  const getMessage = () => {
    switch (type) {
      case "approve": return "해당 상담 신청을 승인 하시겠습니까?";
      case "reject": return "해당 상담 신청을 거절 하시겠습니까?";
      case "delete": return "해당 예약내역을 삭제 하시겠습니까?";
      case "complete": return "해당 상담을 완료 처리하시겠습니까?";
      case "cancel": return "해당 상담을 취소 하시겠습니까?";
      default: return "상태를 변경하시겠습니까?";
    }
  };

  const getConfirmLabel = () => {
    if (isInputRequired) return "Submit";
    if (type === "approve") return "Approve";
    if (type === "complete") return "Complete";
    if (type === "reject") return "Reject";
    if (type === "cancel") return "Confirm";
    if (type === "delete") return "Delete";
    return "Confirm";
  };

  const getButtonColor = () => {
    return type === "approve" || type === "complete" ? "#9C7DEB" : "#EF5350";
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={title}>{getTitle()}</h3>

        {!isInputRequired && (
          <p style={message}>{getMessage()}</p>
        )}

        {isInputRequired && (
          <textarea
            style={textarea}
            placeholder={type === "cancel" ? "예약을 취소하는 사유를 입력해주세요" : "거절 사유를 입력해주세요"}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}

        <div style={buttonWrap}>
          <button
            style={{ ...confirmBtn, backgroundColor: getButtonColor() }}
            onClick={onConfirm}
          >
            {getConfirmLabel()}
          </button>
          <button style={backBtn} onClick={onClose}>Back</button>
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
