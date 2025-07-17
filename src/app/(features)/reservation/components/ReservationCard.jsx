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
      case 'Waiting':
        return styles.waiting;
      case 'Approved':
        return styles.approved;
      case 'Rejected':
        return styles.rejected;
      case 'Cancelled':
        return styles.cancelled;
      case 'Completed':
        return styles.completed;
      default:
        return '';
    }
  };

  const handleFinalSubmit = (reason) => {
    setShowReason(false);
    alert(`예약이 취소되었습니다.\n사유: ${reason}`);
    // TODO: 실제 상태 변경 or 서버 요청 처리
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.row}>
            {/* <img className={styles.avatar} src="https://randomuser.me/api/portraits/men/32.jpg" alt="profile" /> */}
            <span>{name}</span>
            <span>{date}</span>
            <span>{time}</span>
            <span className={getStatusColor()}>{status}</span>

            {/* ✅ 학생용 버튼 wrapper */}
            <div className={styles.studentButtonWrapper}>
  <button
    className={styles.cancelButton}
    onClick={
              status === 'Waiting' || status === 'Approved'
                ? () => setShowConfirm(true)
            : undefined // ✅ 나머지 상태는 클릭 무효
            }>
              {getButtonText()}
            </button>
</div>
          </div>

          {adminMessage && (
            <div className={styles.adminMessage}>
              <strong>매니저 {name}</strong>&nbsp;
              <span className={styles.messageTime}>{messageTime}</span>
              <p>{adminMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ 1차 확인 모달 */}
      {showConfirm && (
        <CancelModal
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
