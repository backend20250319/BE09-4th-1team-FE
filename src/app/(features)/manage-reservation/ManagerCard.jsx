"use client";

import React, { useState } from "react";
import styles from "../reservation/page.module.css";
import ConfirmModal from "./ConfirmModal";
import { updateConsultationStatus } from "./api";

export default function ManagerCard({ data, onStatusUpdated }) {
  const {
    sessionId, name, group, date, time, status, adminMessage, messageTime
  } = data;

  const [modalType, setModalType] = useState(null);

  const getStatusColor = () => {
    switch (status) {
      case "Waiting": return styles.waiting;
      case "Approved": return styles.approved;
      case "Rejected": return styles.rejected;
      case "Cancelled": return styles.cancelled;
      case "Completed": return styles.completed;
      default: return '';
    }
  };

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleConfirm = async () => {
    const newStatus =
      modalType === "cancel" ? "Cancelled" :
      modalType === "reject" ? "Rejected" :
      modalType === "approve" ? "Approved" :
      "Completed";

    const payload = { status: newStatus };

    try {
      console.log("✅ 보내는 sessionId:", sessionId);
      console.log("✅ 보내는 payload:", payload);
      await updateConsultationStatus(sessionId, payload);
      onStatusUpdated();
      closeModal();
    } catch (err) {
      console.error("❗ 상태 변경 실패:", err.response?.data || err);
      alert("상태변경 실패");
    }
  };

  const renderButtons = () => {
    if (status === "Waiting") {
      return (
        <div className={styles.buttonGroup}>
          <button className={styles.approveButton} onClick={() => openModal("approve")}>Approve</button>
          <button className={styles.cancelButton} onClick={() => openModal("reject")}>Reject</button>
        </div>
      );
    }
    if (status === "Approved") {
      return (
        <div className={styles.buttonGroup}>
          <button className={styles.completeButton} onClick={() => openModal("complete")}>Complete</button>
          <button className={styles.cancelButton} onClick={() => openModal("cancel")}>Cancel</button>
        </div>
      );
    }
    return (
      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton}>Delete</button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.group}>{group}</span>
            <span>{name}</span>
            <span>{date}</span>
            <span>{time}</span>
            <span className={getStatusColor()}>{status}</span>
            {renderButtons()}
          </div>

          {adminMessage && (
            <div className={styles.adminMessage}>
              <strong>{group} {name}</strong>&nbsp;
              <span className={styles.messageTime}>{messageTime}</span>
              <p>{adminMessage}</p>
            </div>
          )}
        </div>
      </div>

      {modalType && (
        <ConfirmModal
          type={modalType}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
