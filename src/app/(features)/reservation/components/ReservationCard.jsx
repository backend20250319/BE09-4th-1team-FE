"use client";

import React, { useState } from 'react';
import CancelModal from './CancelModal';
import CancelReasonModal from './CancelReasonModal';
import styles from '../page.module.css';

export default function ReservationCard({ data }) {
  const { name, date, time, status, adminMessage, messageTime } = data;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showReason, setShowReason] = useState(false);

  const getButtonText = () => {
    if (status === 'Waiting' || status === 'Approved') return 'Cancel';
    return 'Delete';
  };

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
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <img src="/profile.jpg" alt="avatar" className={styles.avatar} />

        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.datetime}>
            {date} <span className={styles.time}>{time}</span>
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
