import React from 'react';
import styles from '../mypage/style.profile.module.css';

export default function ConsultingList({ items }) {
  return (
    <div className={styles.profileTable} style={{ width: 600 }}>
      <div className={styles.row} style={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
        <span className={styles.label}>학생명</span>
        <span className={styles.label}>예약일</span>
        <span className={styles.label}>시간</span>
        <span className={styles.label}>상태</span>
        <span className={styles.label}>메시지</span>
      </div>
      {items.length === 0 ? (
        <div className={styles.row}>
          <span className={styles.value} colSpan={5}>상담 신청 내역이 없습니다.</span>
        </div>
      ) : (
        items.map(item => (
          <div className={styles.row} key={item.id}>
            <span className={styles.value}>{item.studentName}</span>
            <span className={styles.value}>{item.date}</span>
            <span className={styles.value}>{item.time}</span>
            <span className={styles.value}>{item.status}</span>
            <span className={styles.value}>{item.message || '-'}</span>
          </div>
        ))
      )}
    </div>
  );
} 