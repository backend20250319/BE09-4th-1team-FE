"use client";

import React, { useState } from 'react';
import styles from '../reservation/page.module.css';
import CancelModal from '../reservation/components/CancelModal';
import CancelReasonModal from '../reservation/components/CancelReasonModal';

export default function ManagerCard({ data }) {
  const { name, group, date, time, status, adminMessage, messageTime } = data;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reasonType, setReasonType] = useState("cancel"); // "cancel" or "reject"

  const getStatusColor = () => {
    switch (status) {
      case 'Waiting': return styles.waiting;
      case 'Approved': return styles.approved;
      case 'Rejected': return styles.rejected;
      case 'Cancelled': return styles.cancelled;
      case 'Completed': return styles.completed;
      default: return '';
    }
  };

  const handleFinalSubmit = (reason) => {
    setShowReason(false);
    alert(`예약이 취소되었습니다.\n사유: ${reason}`);
    // TODO: 상태 변경 처리 or API 호출
  };

  const renderButtons = () => {
    if (status === 'Waiting') {
      return (
        <div className={styles.buttonGroup}>
          <button className={styles.approveButton}>Approve</button>
          <button
            className={styles.cancelButton}
            onClick={() => {
              setReasonType("reject");
              setShowConfirm(true);
            }}
          >
            Reject
          </button>
        </div>
      );
    }
    if (status === 'Approved') {
      return (
        <div className={styles.buttonGroup}>
          <button className={styles.completeButton}>Complete</button>
          <button
            className={styles.cancelButton}
            onClick={() => {
              setReasonType("cancel");
              setShowConfirm(true);
            }}
          >
            Cancel
          </button>
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

      {/* ✅ 1차 확인 모달 */}
      {showConfirm && (
        <CancelModal
          type={reasonType} // 👈 reject 또는 cancel
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowReason(true);
          }}
        />
      )}

      {/* ✅ 2차 사유 입력 모달 */}
      {showReason && (
        <CancelReasonModal
          type={reasonType}
          onBack={() => {
            setShowReason(false);
            setShowConfirm(true);
          }}
          onSubmit={handleFinalSubmit}
        />
      )}
    </>
  );
}
