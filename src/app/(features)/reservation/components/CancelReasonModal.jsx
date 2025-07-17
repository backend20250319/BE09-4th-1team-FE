"use client";

import React, { useState } from 'react';
import styles from '../page.module.css';

export default function CancelReasonModal({ onBack, onSubmit, type = 'cancel' }) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert('사유를 입력해주세요.');
      return;
    }
    onSubmit(reason);
  };

  // type에 따라 텍스트 다르게 표시
  const title = type === 'reject' ? '거절 사유' : '취소 사유';
  const placeholder = type === 'reject'
    ? '예약을 거절하는 사유를 입력해주세요'
    : '예약을 취소하는 사유를 입력해주세요';

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <textarea
          className={styles.textarea}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={placeholder}
        />
        <div className={styles.modalButtons}>
          <button className={styles.confirmBtn} onClick={handleSubmit}>Submit</button>
          <button className={styles.backBtn} onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
