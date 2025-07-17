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

  const handleRemoveCourse = (opt) => {
    setCourseOptions(courseOptions.filter(c => c !== opt));
    if (course === opt) setCourse('');
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
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.22)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 28, boxShadow: '0 6px 32px rgba(136, 118, 217, 0.16)', padding: '56px 48px 40px 48px', maxWidth: 440, minWidth: 340, width: '100%', margin: '48px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: -1, textAlign: 'center' }}>Create User</h3>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontWeight: 600, marginBottom: 2 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontWeight: 600, marginBottom: 2 }}>Name</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontWeight: 600, marginBottom: 2 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontWeight: 600, marginBottom: 2 }}>Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, width: '100%' }}>
                <option value="STUDENT">STUDENT</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontWeight: 600, marginBottom: 2 }}>Course</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
                <input
                  type="text"
                  value={courseInput}
                  onChange={e => setCourseInput(e.target.value)}
                  placeholder="Add new course"
                  style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, flex: 1 }}
                />
                <button type="button" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #3a6edb 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'background 0.18s, box-shadow 0.18s', boxShadow: '0 2px 8px rgba(79, 140, 255, 0.13)' }} onClick={handleAddCourse}>Add</button>
                <select
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  style={{ border: '1.5px solid #d1d5db', borderRadius: 12, padding: '10px 16px', fontSize: 16, minWidth: 120 }}
                >
                  <option value="">Select course</option>
                  {courseOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {courseOptions.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {courseOptions.map(opt => (
                    <span key={opt} style={{ background: '#e7edfd', color: '#4b3b8f', borderRadius: 16, padding: '6px 18px', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {opt}
                      <button type="button" onClick={() => handleRemoveCourse(opt)} style={{ background: 'none', border: 'none', color: '#4b3b8f', fontWeight: 900, fontSize: 15, marginLeft: 2, cursor: 'pointer' }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 32 }}>
            <button type="submit" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #3a6edb 100%)', color: '#fff', border: 'none', borderRadius: 16, padding: '12px 40px', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(79, 140, 255, 0.13)', transition: 'background 0.18s, box-shadow 0.18s' }}>Create</button>
            <button type="button" style={{ background: 'linear-gradient(90deg, #ff5a5a 0%, #d32f2f 100%)', color: '#fff', border: 'none', borderRadius: 16, padding: '12px 40px', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255, 90, 90, 0.13)', transition: 'background 0.18s, box-shadow 0.18s' }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}