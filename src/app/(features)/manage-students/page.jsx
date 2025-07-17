'use client'

import React, { useState, useEffect } from 'react';
import styles from '../mypage/style.profile.module.css';
import CreateUserModal from './CreateUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import BanStudentModal from './BanStudentModal';
import { fetchUsers, createUser, banUser, unbanUser, resetUserPassword } from './api';

export default function ManageStudentsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('students');
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
    <div className={styles.pageContainer}>
      <nav className={styles.lnb}>User Management</nav>
      <div style={{ display: 'flex' }}>
        <aside className={styles.snbContainer}>
          <div className={styles.menuButtonGroup}>
            <button
              className={`${styles.menuButton} ${activeTab === 'students' ? styles.selected : ''}`}
              onClick={() => setActiveTab('students')}
            >
              User List
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '40px', backgroundColor: '#fff' }}>
          {activeTab === 'students' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Search by email or name"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: 240, marginRight: 16 }}
                />
                <button className={styles.positiveButton} onClick={() => setShowCreateModal(true)}>Create User</button>
              </div>
              <div className={styles.profileTable} style={{ width: 600 }}>
                <div className={styles.row} style={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                  <span className={styles.label}>Email</span>
                  <span className={styles.label}>Name</span>
                  <span className={styles.label}>Role</span>
                  <span className={styles.label}>Course</span>
                  <span className={styles.label}>Status</span>
                  <span className={styles.label}>Manage</span>
                </div>
                {filteredUsers.map(u => (
                  <div className={styles.row} key={u.id}>
                    <span className={styles.value}>{u.email}</span>
                    <span className={styles.value}>{u.username}</span>
                    <span className={styles.value}>{u.role}</span>
                    <span className={styles.value}>{u.course}</span>
                    <span className={styles.value}>{u.status}</span>
                    <span className={styles.value}>
                      <button className={styles.positiveButton} style={{ marginRight: 4 }} onClick={() => handleResetPassword(u.id, u.username)}>Reset PW</button>
                      <button className={styles.negativeButton} onClick={() => handleBanUser(u.id, u.username)}>Ban</button>
                    </span>
                  </div>
                ))}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
} 