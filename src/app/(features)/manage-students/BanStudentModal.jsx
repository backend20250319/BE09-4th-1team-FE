import React, { useState } from 'react';
import styles from '../mypage/style.profile.module.css';

export default function BanStudentModal({ username, onClose, onSubmit }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('밴 사유를 입력하세요.');
      return;
    }
    onSubmit(reason);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox} style={{ minWidth: 350 }}>
        <h3 className={styles.title} style={{ fontSize: 22, marginBottom: 18 }}>학생 밴</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileTable} style={{ maxWidth: 300 }}>
            <div className={styles.row}>
              <span className={styles.label}>학생명</span>
              <span className={styles.value}>{username}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>밴 사유</span>
              <input
                className={styles.input}
                type="text"
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.button} style={{ marginTop: 24 }}>
            <button type="submit" className={styles.negativeButton} style={{ width: 120 }}>확인</button>
            <button type="button" className={styles.positiveButton} style={{ width: 120 }} onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
} 