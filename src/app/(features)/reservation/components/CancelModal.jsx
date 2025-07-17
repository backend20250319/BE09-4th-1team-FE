"use client";

import React from 'react';
import styles from '../page.module.css';

export default function CancelModal({ isOpen, onClose, onConfirm, type = 'cancel' }) {
  if (!isOpen) return null; // ✅ 표시 여부 체크

  const message =
    type === 'reject'
      ? '해당 예약을 거절하시겠습니까?'
      : '해당 예약을 취소하시겠습니까?';

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>알림</h3>
        <p className={styles.modalText}>{message}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>Confirm</button>
          <button className={styles.backBtn} onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
}
