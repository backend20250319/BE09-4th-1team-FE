"use client";

import React, { useEffect, useState } from 'react';
import styles from '../reservation/page.module.css';
import ManagerCard from './ManagerCard';
import { getConsultationsByManagerId } from './api';

export default function ManageReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [managerData, setManagerData] = useState([]);
  const tabs = ['All', 'Waiting', 'Approved', 'Rejected', 'Cancelled', 'Completed'];

  const fetchData = () => {
    const managerId = "1"; // 실제 로그인한 매니저 ID
    getConsultationsByManagerId(managerId)
      .then(data => {
        console.log("📋 매니저 상담 목록:", data);
        setManagerData(data);
      })
      .catch(err => {
        console.error("데이터 로딩 실패:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <ManagerCard key={item.id || item.sessionId} data={item} onStatusUpdated={fetchData} />
          ))}
      </div>
    </div>
  );
}
