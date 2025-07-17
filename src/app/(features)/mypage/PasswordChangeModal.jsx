import React, { useState } from 'react';
import styles from './style.profile.module.css';
import axios from 'axios';

export default function PasswordChangeModal({ onClose, onSuccess }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 비밀번호 변경 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 입력값 검증
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // 비밀번호 정책 체크
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};

      await axios.put(
        'http://localhost:8000/api/v1/user-service/users/me/password',
        { oldPassword, newPassword },
        { headers }
      );

      setLoading(false);
      onSuccess();
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        '비밀번호 변경에 실패했습니다.'
      );
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: 400 }}>
        <h3 style={{ marginBottom: 16 }}>비밀번호 변경</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.inputGroup}>
            <label>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className={styles.errorMsg}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <button
              type="button"
              className={styles.negativeButton}
              onClick={onClose}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.positiveButton}
              disabled={loading}
            >
              {loading ? '변경 중...' : '변경하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 