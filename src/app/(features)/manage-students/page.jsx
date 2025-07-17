'use client'

import React, { useState, useEffect } from 'react';
import styles from '../mypage/style.profile.module.css';
import CreateUserModal from './CreateUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import BanStudentModal from './BanStudentModal';
import { fetchUsers, createUser, banUser, unbanUser, resetUserPassword } from './api';
import reservationStyles from '../reservation/page.module.css';

export default function ManageStudentsPage() {
  const [search, setSearch] = useState('');
  // const [activeTab, setActiveTab] = useState('students'); // 제거
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [resetTarget, setResetTarget] = useState(null); // {id, username}
  const [banTarget, setBanTarget] = useState(null); // {id, username}

  // 목록 자동 갱신
  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    u => u.email.includes(search) || u.username.includes(search)
  );

  const handleCreateUser = async (newUser) => {
    await createUser(newUser);
    setShowCreateModal(false);
    loadUsers(); // 생성 후 목록 자동 갱신
  };

  const handleResetPassword = (id, username) => {
    setResetTarget({ id, username });
  };
  const handleBanUser = (id, username) => {
    setBanTarget({ id, username });
  };

  const handleResetPasswordSubmit = async (newPassword) => {
    // 실제로는 서버에 비밀번호 변경 요청
    alert(`'${resetTarget.username}'의 비밀번호가 변경되었습니다.`);
    setResetTarget(null);
  };
  const handleBanUserSubmit = async (reason) => {
    setUsers(users.map(u =>
      u.id === banTarget.id ? { ...u, status: 'BANNED' } : u
    ));
    alert(`'${banTarget.username}' 사용자가 밴 처리되었습니다.\n사유: ${reason}`);
    setBanTarget(null);
  };

  return (
    <main className={styles.mainContent}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="이메일 또는 이름으로 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className={styles.createUserBtn} onClick={() => setShowCreateModal(true)}>
          <span style={{ fontSize: '1.3em', fontWeight: '900', marginRight: 2 }}>＋</span>
          Create User
        </button>
      </div>
      <div className={reservationStyles.cardList}>
        {filteredUsers.length === 0 ? (
          <div style={{textAlign:'center', color:'#888', padding:'48px 0', fontSize:18, width:'100%'}}>학생이 없습니다.</div>
        ) : (
          filteredUsers.map(u => (
            <div className={styles.studentCardNews} key={u.id}>
              <div className={styles.cardProfile}>
                {u.username ? u.username[0].toUpperCase() : '?'}
              </div>
              <div className={styles.cardHeader}>
                <span className={styles.studentName}>{u.username}</span>
                <span className={styles.studentEmail}>{u.email}</span>
                <div className={styles.cardInfoRow}>
                  <span>{u.role}</span>
                  <span>{u.course}</span>
                </div>
              </div>
              <div className={styles.cardButtonRow}>
                <button className={styles.positiveButton} onClick={() => handleResetPassword(u.id, u.username)}>
                  <span style={{fontSize:'1.1em'}}>🔄</span> Reset PW
                </button>
                <button className={styles.negativeButton} onClick={() => handleBanUser(u.id, u.username)}>
                  <span style={{fontSize:'1.1em'}}>🚫</span> Ban
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
        />
      )}
      {resetTarget && (
        <ResetPasswordModal
          username={resetTarget.username}
          onClose={() => setResetTarget(null)}
          onSubmit={handleResetPasswordSubmit}
        />
      )}
      {banTarget && (
        <BanStudentModal
          username={banTarget.username}
          onClose={() => setBanTarget(null)}
          onSubmit={handleBanUserSubmit}
        />
      )}
    </main>
  );
} 