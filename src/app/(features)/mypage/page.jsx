'use client';

import React, { useEffect, useState } from 'react';
import styles from './style.profile.module.css';
import ReservationCard from '../reservation/components/ReservationCard';
import reservationStyles from '../reservation/page.module.css';
import ManageStudentsPage from '../manage-students/page';
import ManageReservationPage from '../manage-reservation/page';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userInfo, setUserInfo] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // 🔹 로그인 사용자 정보 불러오기
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-service/users/me`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setUserInfo(data))
      .catch((err) => {
        console.error(err);
        setUserInfo(null);
      });
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const renderContent = () => {
    if (!userInfo) return <p>Loading...</p>;
    const userRole = userInfo.role;

    switch (activeTab) {
      case 'profile':
        return (
          <>
            {userRole === 'MANAGER' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', background: '#eee', marginBottom: 12, border: '2px solid #ccc' }}>
                  <img
                    src={profilePreview || '/images/common/user.png'}
                    alt="프로필 사진"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  style={{ display: 'none' }}
                  onChange={handleProfileImageChange}
                />
                <label htmlFor="profile-upload">
                  <button className={styles.positiveButton} style={{ width: 140 }}>프로필 사진 업로드</button>
                </label>
              </div>
            )}

            <h2 className={styles.title}>프로필</h2>
            <div className={styles.profileTable}>
              <div className={styles.row}><span className={styles.label}>ID:</span><span className={styles.value}>{userInfo.id}</span></div>
              <div className={styles.row}><span className={styles.label}>Name:</span><span className={styles.value}>{userInfo.name}</span></div>
              <div className={styles.row}><span className={styles.label}>Email:</span><span className={styles.value}>{userInfo.email}</span></div>
              <div className={styles.row}><span className={styles.label}>Role:</span><span className={styles.value}>{userInfo.role}</span></div>
              <div className={styles.row}><span className={styles.label}>Course:</span><span className={styles.value}>{userInfo.course}</span></div>

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
        const studentReservations = [
          { id: 1, name: '조나단', date: '2025.07.07', time: '18:00 ~ 18:10', status: 'Waiting', adminMessage: null },
          { id: 2, name: '조나단', date: '2025.07.07', time: '18:00 ~ 18:10', status: 'Approved', adminMessage: null },
        ];
        const managerReservations = [
          { id: 201, studentName: '학생A', date: '2025.07.09', time: '14:00 ~ 14:30', status: 'Waiting', adminMessage: null },
          { id: 202, studentName: '학생B', date: '2025.07.10', time: '15:00 ~ 15:30', status: 'Approved', adminMessage: null },
        ];

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
              <h2 className={reservationStyles.title}>나에게 예약한 학생 목록</h2>
              <div className={reservationStyles.cardList}>
                {managerReservations.length === 0 ? (
                  <p>예약한 학생이 없습니다.</p>
                ) : (
                  managerReservations.map((item) => (
                    <ReservationCard key={item.id} data={{
                      name: item.studentName,
                      date: item.date,
                      time: item.time,
                      status: item.status,
                      adminMessage: item.adminMessage,
                    }} />
                  ))
                )}
              </div>
            </div>
          );
        } else {
          return <p>예약 내역을 볼 수 없습니다.</p>;
        }

      case 'student':
        return <ManageStudentsPage />;
      case 'reservation-mgmt':
        return <ManageReservationPage />;
      default:
        return <p>No tab selected.</p>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.lnb}>My Page</nav>
      <div style={{ display: 'flex' }}>
        <aside className={styles.snbContainer}>
          <div className={styles.menuButtonGroup}>
            <button className={`${styles.menuButton} ${activeTab === 'profile' ? styles.selected : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
            <button className={`${styles.menuButton} ${activeTab === 'post' ? styles.selected : ''}`} onClick={() => setActiveTab('post')}>My Post</button>
            <button className={`${styles.menuButton} ${activeTab === 'reservation' ? styles.selected : ''}`} onClick={() => setActiveTab('reservation')}>My Reservation</button>
            {userInfo.role === 'MANAGER' && (
              <>
                <button className={`${styles.menuButton} ${activeTab === 'student' ? styles.selected : ''}`} onClick={() => setActiveTab('student')}>Student Management</button>
                <button className={`${styles.menuButton} ${activeTab === 'reservation-mgmt' ? styles.selected : ''}`} onClick={() => setActiveTab('reservation-mgmt')}>Reservation Management</button>
              </>
            )}
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px', backgroundColor: '#fff' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
