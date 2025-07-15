'use client';

import React, { useState } from 'react';
import styles from './style.profile.module.css';
import ReservationCard from '../reservation/components/ReservationCard';
import reservationStyles from '../reservation/page.module.css';

// 예시: 실제로는 context, props, API 등에서 받아와야 함
const userRole = 'STUDENT'; // 'MANAGER'로 바꿔 테스트 가능

// 더미 데이터: 실제로는 API 등에서 받아와야 함
const studentReservations = [
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
];
const managerReservations = [
  {
    id: 101,
    name: '학생A',
    date: '2025.07.08',
    time: '10:00 ~ 10:30',
    status: 'Waiting',
    adminMessage: null,
  },
  {
    id: 102,
    name: '학생B',
    date: '2025.07.09',
    time: '11:00 ~ 11:30',
    status: 'Approved',
    adminMessage: null,
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <h2 className={styles.title}>프로필</h2>
                <div className={styles.profileTable}>
                <div className={styles.row}>
                    <span className={styles.label}>ID:</span>
                    <span className={styles.value}>123456</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.value}>홍길동</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>gildong@example.com</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Role:</span>
                    <span className={styles.value}>STUDENT</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Course:</span>
                    <span className={styles.value}>Web Fullstack 5기</span>
                </div>

                <div className={styles.button}>
                    <button className={styles.positiveButton}>비밀번호 변경</button>
                    <button className={styles.positiveButton}>이메일 인증</button>
                    <button className={styles.negativeButton}>회원 탈퇴</button>
                </div>
            </div>

          </>
        );
      case 'post':
        return <p>내가 작성한 게시글 목록입니다.</p>;
      case 'reservation':
        if (userRole === 'STUDENT') {
          return (
            <div className={reservationStyles.container}>
              <h2 className={reservationStyles.title}>나의 예약 내역</h2>
              <div className={reservationStyles.cardList}>
                {studentReservations.length === 0 ? (
                  <p>예약 내역이 없습니다.</p>
                ) : (
                  studentReservations.map((item) => (
                    <ReservationCard key={item.id} data={item} />
                  ))
                )}
              </div>
            </div>
          );
        } else if (userRole === 'MANAGER') {
          return (
            <div className={reservationStyles.container}>
              <h2 className={reservationStyles.title}>관리자 예약 관리</h2>
              <div className={reservationStyles.cardList}>
                {managerReservations.length === 0 ? (
                  <p>관리 중인 예약이 없습니다.</p>
                ) : (
                  managerReservations.map((item) => (
                    <ReservationCard key={item.id} data={item} />
                  ))
                )}
              </div>
            </div>
          );
        } else {
          return <p>예약 내역을 볼 수 없습니다.</p>;
        }
      default:
        return <p>선택된 탭이 없습니다.</p>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.lnb}>My Page</nav>
      <div style={{ display: 'flex' }}>
        <aside className={styles.snbContainer}>
          <div className={styles.menuButtonGroup}>
            <button
              className={`${styles.menuButton} ${activeTab === 'profile' ? styles.selected : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`${styles.menuButton} ${activeTab === 'post' ? styles.selected : ''}`}
              onClick={() => setActiveTab('post')}
            >
              My Post
            </button>
            <button
              className={`${styles.menuButton} ${activeTab === 'reservation' ? styles.selected : ''}`}
              onClick={() => setActiveTab('reservation')}
            >
              My Reservation
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px', backgroundColor: '#fff' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

