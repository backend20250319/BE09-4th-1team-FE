'use client';

import React, { useState } from 'react';
import styles from '../mypage/style.profile.module.css';

export default function CreateUserModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [courseInput, setCourseInput] = useState('');
  const [course, setCourse] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);

  const handleAddCourse = () => {
    if (courseInput && !courseOptions.includes(courseInput)) {
      setCourseOptions([...courseOptions, courseInput]);
      setCourse(courseInput);
      setCourseInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username || !password || !role || !course) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onSubmit({ email, username, password, role, course });
    setEmail('');
    setUsername('');
    setPassword('');
    setRole('STUDENT');
    setCourse('');
    setCourseInput('');
    setCourseOptions([]);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox} style={{ minWidth: 400 }}>
        <h3 className={styles.title} style={{ fontSize: 28, marginBottom: 24 }}>Create User</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileTable} style={{ maxWidth: 350 }}>
            <div className={styles.row}>
              <span className={styles.label}>Email</span>
              <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Name</span>
              <input className={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Password</span>
              <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Role</span>
              <select className={styles.input} value={role} onChange={e => setRole(e.target.value)} style={{ width: 120 }}>
                <option value="STUDENT">STUDENT</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Course</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  className={styles.input}
                  type="text"
                  value={courseInput}
                  onChange={e => setCourseInput(e.target.value)}
                  placeholder="Add new course"
                  style={{ width: 120 }}
                />
                <button type="button" className={styles.positiveButton} style={{ width: 60 }} onClick={handleAddCourse}>Add</button>
                <select
                  className={styles.input}
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  style={{ width: 120 }}
                >
                  <option value="">Select course</option>
                  {courseOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.button} style={{ marginTop: 32 }}>
            <button type="submit" className={styles.positiveButton} style={{ width: 140 }}>Create</button>
            <button type="button" className={styles.negativeButton} style={{ width: 140 }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}