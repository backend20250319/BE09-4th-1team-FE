"use client";

import React, { useState } from 'react';
import styles from '../reservation/page.module.css'; // 공통 스타일 재사용
import ManagerCard from './ManagerCard';

const managerData = [
  {
    id: 1,
    name: '비빙비빙',
    group: '풀스택 9기',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Waiting',
  },
  {
    id: 2,
    name: '비빙비빙',
    group: '풀스택 9기',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Approved',
  },
  {
    id: 3,
    name: '비빙비빙',
    group: '풀스택 9기',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Cancelled',
    adminMessage: '상담 확정 안내가 없었으나 개인 사정으로 인해 부득이하게 취소하게 되었습니다.',
    messageTime: '2025.07.02. 17:50',
  },
  {
    id: 4,
    name: '조나단',
    group: '매니저',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Rejected',
    adminMessage: '상담 진행이 어려운 상황이 되었습니다. 다시 예약 부탁드립니다.',
    messageTime: '2025.07.02. 17:50',
  },
  {
    id: 5,
    name: '지훈구니',
    group: '풀스택 9기',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Completed',
  },
  {
    id: 6,
    name: '비빙비빙',
    group: '풀스택 9기',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Cancelled',
    adminMessage: '학생이 예약 시간에 미참석하여 자동 취소되었습니다.',
    messageTime: '2025.07.02. 17:50',
  },
];

export default function ManageReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const tabs = ['All', 'Waiting', 'Approved', 'Rejected', 'Cancelled', 'Completed'];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reservations</h1>
      <p className={styles.subtitle}>상담 예약 내역을 확인하세요</p>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <span
            key={tab}
            className={selectedStatus === tab ? styles.activeTab : styles.tab}
            onClick={() => setSelectedStatus(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className={styles.cardList}>
        {managerData
          .filter(item => selectedStatus === 'All' || item.status === selectedStatus)
          .map((item) => (
            <ManagerCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
}
