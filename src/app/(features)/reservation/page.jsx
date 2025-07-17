"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import ReservationCard from './components/ReservationCard';

const reservationData = [
  {
    id: 1,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Waiting',
    adminMessage: null,
  },
  {
    id: 2,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Approved',
    adminMessage: null,
  },
  {
    id: 3,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Rejected',
    adminMessage: `안녕하세요. 먼저 상담 신청해주셔서 감사합니다.
최종확인하는 일정 시간의 영향에 의해 상담을 진행하기 어려운 상황이 되었습니다.
확정된 일정 시간은 맞추지 못해 죄송하며, 번거로우시겠지만 다시 한 번 예약해 주시면 최대한 빠르게 대응해드리겠습니다.
감사합니다.`,
    messageTime: '2025.07.02. 17:50',
  },
  {
    id: 4,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Cancelled',
    adminMessage: null,
  },
  {
    id: 5,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Completed',
    adminMessage: null,
  },
  {
    id: 6,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Waiting',
    adminMessage: null,
  },
  {
    id: 7,
    name: '조나단',
    date: '2025.07.07',
    time: '18:00 ~ 18:10',
    status: 'Waiting',
    adminMessage: null,
  },
];

export default function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const statusTabs = ['All', 'Waiting', 'Approved', 'Rejected', 'Cancelled', 'Completed'];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reservations</h1>
      <p className={styles.subtitle}>상담 예약 내역을 확인하세요</p>

      <div className={styles.tabs}>
        {statusTabs.map((tab) => (
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
        {reservationData
          .filter(item => selectedStatus === 'All' || item.status === selectedStatus)
          .map((item) => (
            <ReservationCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
}
