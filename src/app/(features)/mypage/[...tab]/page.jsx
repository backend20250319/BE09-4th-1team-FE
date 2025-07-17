'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../style.profile.module.css';
import ReservationCard from '../../reservation/components/ReservationCard';
import reservationStyles from '../../reservation/page.module.css';
import ManageStudentsPage from '../../manage-students/page';
import ManageReservationPage from '../../manage-reservation/page';
import axios from 'axios';
import PasswordChangeModal from '../PasswordChangeModal';
import { useRouter, useParams } from 'next/navigation';
import Pagination from '../../suggestion/components/Pagination';
import paginationStyles from '../../suggestion/styles/Pagination.module.css';

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.contentWrapper}>{children}</div>
    </section>
  );
}

// 역할 한글 변환 함수
function getRoleLabel(role) {
  if (role === 'MANAGER') return '매니저';
  if (role === 'STUDENT') return '학생';
  return role;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();
  const params = useParams();
  // [...tab] 라우팅에서 /mypage → undefined, /mypage/profile → ['profile']
  const tab = !params.tab ? 'profile' : Array.isArray(params.tab) ? params.tab[0] : params.tab;

  // 토큰 없으면 바로 로그인 페이지로 이동
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.replace('/login');
    }
  }, []);

  const getUserInfo = async () => {
    const accessToken =  localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user-service/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo(response.data);
    } catch (err) {
      // 토큰 만료 등 사용자 정보 fetch 실패 시 로그인 페이지로 이동
      router.replace('/login');
    }
  }


  // 🔹 로그인 사용자 정보 불러오기
  useEffect(() => {
    getUserInfo();
    
  }, []);

  // 프로필 이미지 업로드/삭제 핸들러 (백엔드 연동)
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        "http://localhost:8000/api/v1/user-service/users/me/img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProfilePreview(res.data);
      setUserInfo((prev) => ({ ...prev, profileImageUrl: res.data }));
    } catch (err) {
      alert("업로드 실패");
    }
  };

  const handleProfileImageDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // userInfo에서 id, role 추출
      const userId = userInfo?.id;
      const userRole = userInfo?.role;
      const res = await axios.delete(
        "http://localhost:8000/api/v1/user-service/users/me/img",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-User-Id': userId,
            'X-User-Role': userRole,
          },
        }
      );
      setProfilePreview(res.data === '/images/common/user.png' ? `/images/common/user.png?v=${Date.now()}` : res.data);
      setUserInfo((prev) => ({ ...prev, profileImageUrl: res.data === '/images/common/user.png' ? `/images/common/user.png?v=${Date.now()}` : res.data }));
    } catch (err) {
      alert("삭제 실패");
    }
  };

  // 업로드 버튼에서 input 클릭 트리거
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const renderContent = () => {
    if (!userInfo) return <p>Loading...</p>;
    const userRole = userInfo?.role;
    switch (tab) {
      case 'profile':
        return (
          <Section title="프로필">
            <div className={styles.profileCardModern}>
              <div className={styles.profileCardHeader}>
                <div className={styles.profileAvatar} onClick={handleUploadButtonClick}>
                  <img
                    src={
                      !userInfo?.profileImageUrl || userInfo?.profileImageUrl === 'null'
                        ? '/images/common/user.png'
                        : userInfo?.profileImageUrl?.startsWith('http')
                        ? userInfo.profileImageUrl
                        : `http://localhost:8000${userInfo.profileImageUrl}`
                    }
                    alt="프로필 이미지"
                  />
                  <div className={styles.avatarOverlay}>
                    <span className={styles.avatarPlusIcon}>+</span>
                  </div>
                  <button
                    type="button"
                    className={styles.avatarDeleteBtn}
                    onClick={e => { e.stopPropagation(); handleProfileImageDelete(); }}
                    title="프로필 이미지 삭제"
                  >
                    <span style={{
                      fontSize: '1.3em',
                      fontWeight: 600,
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: 1,
                      display: 'inline-block',
                      pointerEvents: 'none'
                    }}>×</span>
                  </button>
                </div>
                <div className={styles.profileName}>{userInfo?.name}</div>
                <div className={styles.profileEmail}>{userInfo?.email}</div>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleProfileImageUpload}
                />
              </div>
              <div className={styles.profileCardInfoList}>
                <div className={styles.profileCardInfoRow}>
                  <span className={styles.profileCardLabel}>ID</span>
                  <span className={styles.profileCardValue}>{userInfo?.username}</span>
                </div>
                <div className={styles.profileCardInfoRow}>
                  <span className={styles.profileCardLabel}>ROLE</span>
                  <span className={styles.profileCardTag}>{getRoleLabel(userInfo?.role)}</span>
                </div>
                <div className={styles.profileCardInfoRow}>
                  <span className={styles.profileCardLabel}>COURSE</span>
                  <span className={styles.profileCardTag}>{userInfo?.course}</span>
                </div>
              </div>
              <div className={styles.listButtonGroup}>
                <button className={styles.listButton} onClick={() => setShowPasswordModal(true)}>
                  비밀번호 변경 <span className={styles.chevron}>&gt;</span>
                </button>
                <button className={styles.listButton}>
                  이메일 변경 <span className={styles.chevron}>&gt;</span>
                </button>
                <button className={styles.listButton} style={{color:'#ef3434', fontWeight:700}}>
                  회원 탈퇴 <span className={styles.chevron}>&gt;</span>
                </button>
              </div>
            </div>
          </Section>
        );
      case 'post':
        return (
          <Section title="내가 작성한 게시글">
            <MyPostList userId={userInfo?.id} />
          </Section>
        );
      case 'reservation':
        if (userRole === 'STUDENT') {
          return (
            <Section title="나의 예약 내역">
              <div className={reservationStyles.cardList}>
                {/* 예약 카드 내용 그대로 */}
                {(() => {
                  const studentReservations = [
                    { id: 1, name: '조나단', date: '2025.07.07', time: '18:00 ~ 18:10', status: 'Waiting', adminMessage: null },
                    { id: 2, name: '조나단', date: '2025.07.07', time: '18:00 ~ 18:10', status: 'Approved', adminMessage: null },
                  ];
                  return studentReservations.length === 0 ? (
                    <p>예약 내역이 없습니다.</p>
                  ) : (
                    studentReservations.map((item) => (
                      <ReservationCard key={item.id} data={item} />
                    ))
                  );
                })()}
              </div>
            </Section>
          );
        } else if (userRole === 'MANAGER') {
          return (
            <Section title="나에게 예약한 학생 목록">
              <div className={reservationStyles.cardList}>
                {/* 예약 카드 내용 그대로 */}
                {(() => {
                  const managerReservations = [
                    { id: 201, studentName: '학생A', date: '2025.07.09', time: '14:00 ~ 14:30', status: 'Waiting', adminMessage: null },
                    { id: 202, studentName: '학생B', date: '2025.07.10', time: '15:00 ~ 15:30', status: 'Approved', adminMessage: null },
                  ];
                  return managerReservations.length === 0 ? (
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
                  );
                })()}
              </div>
            </Section>
          );
        } else {
          return <Section title="예약 내역"><p>예약 내역을 볼 수 없습니다.</p></Section>;
        }
      case 'student':
        if (userInfo?.role !== 'MANAGER') {
          return <Section title="학생 관리"><p>접근 권한이 없습니다.</p></Section>;
        }
        return <Section title="학생 관리"><ManageStudentsPage /></Section>;
      case 'reservation-mgmt':
        if (userInfo?.role !== 'MANAGER') {
          return <Section title="예약 관리"><p>접근 권한이 없습니다.</p></Section>;
        }
        return <Section title="예약 관리"><ManageReservationPage /></Section>;
      default:
        return <p>No tab selected.</p>;
    }
  };

  return (
    <div className={styles.pageContainer} style={{ maxWidth: '1440px', minWidth: '1068px', margin: '0 auto', width: '100%' }}>
      <nav className={styles.lnb}>My Page</nav>
      <div style={{ display: 'flex', width: '100%' }}>
        <aside className={styles.snbContainer}>
          <div className={styles.menuButtonGroup}>
            <button className={`${styles.menuButton} ${tab === 'profile' ? styles.selected : ''}`} onClick={() => router.push('/mypage')}>Profile</button>
            <button className={`${styles.menuButton} ${tab === 'post' ? styles.selected : ''}`} onClick={() => router.push('/mypage/post')}>My Post</button>
            <button className={`${styles.menuButton} ${tab === 'reservation' ? styles.selected : ''}`} onClick={() => router.push('/mypage/reservation')}>My Reservation</button>
            {userInfo?.role === 'MANAGER' && (
              <>
                <button className={`${styles.menuButton} ${tab === 'student' ? styles.selected : ''}`} onClick={() => router.push('/mypage/student')}>Student Management</button>
                <button className={`${styles.menuButton} ${tab === 'reservation-mgmt' ? styles.selected : ''}`} onClick={() => router.push('/mypage/reservation-mgmt')}>Reservation Management</button>
              </>
            )}
          </div>
        </aside>

        <main className={styles.mainContent}>
          {renderContent()}
          {showPasswordModal && (
            <PasswordChangeModal
              onClose={() => setShowPasswordModal(false)}
              onSuccess={() => {
                setShowPasswordModal(false);
                alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
                // 필요시 로그아웃 처리
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function MyPostList({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    axios.get(`http://localhost:8000/api/v1/post-service/suggestionPost/my?userId=${userId}&page=${currentPage-1}&size=${POSTS_PER_PAGE}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(res => {
        const content = res?.data?.data?.content;
        setPosts(Array.isArray(content) ? content : []);
        setTotalPages(res?.data?.data?.totalPages || 0);
        setLoading(false);
      })
      .catch(err => {
        setError('불러오기 실패');
        setLoading(false);
      });
  }, [userId, currentPage]);

  if (!userId) return <PostTable posts={[]} loading={false} error={null} />;
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <PostTable posts={posts} />
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

function PostTable({ posts }) {
  const router = useRouter();
  return (
    <div style={{ width: '100%', marginTop: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #00bcd4', textAlign: 'center', height: 48 }}>
            <th style={{ width: 80 }}>번호</th>
            <th>제목</th>
            <th style={{ width: 120 }}>상태</th>
            <th style={{ width: 120 }}>작성자</th>
            <th style={{ width: 180 }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '48px 0', fontSize: 18, color: '#444' }}>
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            posts.map((post, idx) => (
              <tr key={post.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center', height: 44 }}>
                <td>{idx + 1}</td>
                <td
                  style={{ textAlign: 'left', paddingLeft: 16, color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => router.push(`/suggestion/${post.id}`)}
                >
                  {post.title}
                </td>
                <td>{post.status || '-'}</td>
                <td>{post.username || '-'}</td>
                <td>{post.createdAt ? post.createdAt.split('T')[0] : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
