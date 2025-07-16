"use client";

import React, { useState, useEffect } from "react";
import ManagerSelection from "./components/ManagerSelection";
import CalendarComponent from "./components/CalendarComponent";
import TimeSelection from "./components/TimeSelection";
import consultingApi from "./api";
import { useRouter } from "next/navigation";
import "./consulting.css";

// ✅ Modal 컴포넌트는 그대로 사용

function Modal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.box}>
        <h2 style={modalStyles.title}>알림</h2>
        <div style={modalStyles.message}>
          선택하신 옵션으로 상담 예약이 진행됩니다
        </div>
        <div style={modalStyles.buttons}>
          <button className="modal-confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button style={modalStyles.cancelBtn} onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    background: "#fff",
    borderRadius: "32px",
    padding: "48px 32px",
    minWidth: "480px",
    maxWidth: "90vw",
    boxShadow: "0 2px 32px rgba(0,0,0,0.15)",
    textAlign: "center",
    border: "2px solid #E5E7EB",
  },
  title: {
    fontWeight: "bold",
    fontSize: "28px",
    marginBottom: "24px",
  },
  message: {
    marginBottom: "40px",
    fontSize: "18px",
    color: "#222",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
  },
  cancelBtn: {
    background: "#fff",
    color: "#A78BFA",
    border: "2px solid #A78BFA",
    borderRadius: "32px",
    padding: "16px 48px",
    fontWeight: "bold",
    fontSize: "20px",
    outline: "none",
    cursor: "pointer",
  },
};

export default function ReservationPage() {
  const router = useRouter();

  // ✅ 1. 매니저 목록 상태 추가
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempState, setTempState] = useState(null);

  // ✅ 2. 매니저 목록 fetch
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/user-service/users/me"
        ); // ← 실제 주소로 수정
        const data = await res.json();
        setManagers(data);
        setSelectedManager(data[0]); // 첫 번째 매니저 기본 선택
      } catch (err) {
        console.error("강사 목록 불러오기 실패:", err);
      }
    };
    fetchManagers();
  }, []);

  const handleManagerSelect = (manager) => setSelectedManager(manager);
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowTimeSelection(true);
  };
  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleApply = () => {
    setTempState({
      manager: selectedManager,
      date: selectedDate,
      time: selectedTime,
      showTimeSelection,
    });
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    const userId = localStorage.getItem("userId");
    const managerId = selectedManager.id;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const startTimeRaw = selectedTime.split("-")[0];
    const formattedTime = `${startTimeRaw.slice(0, 2)}:${startTimeRaw.slice(
      2
    )}:00`;
    const localDateTime = `${formattedDate}T${formattedTime}`;

    const consultationDetailsDto = {
      userId: String(userId),
      managerId: String(managerId),
      localDateTime: localDateTime,
    };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 토큰이 없습니다.");
      return;
    }

    try {
      const res = await consultingApi.createConsultingReservation(
        JSON.stringify(consultationDetailsDto),
        token
      );
      console.log("예약 성공:", res);
      router.push("/mypage");
    } catch (error) {
      console.error("예약 실패:", error);
    }
  };

  const handleModalCancel = () => {
    if (tempState) {
      setSelectedManager(tempState.manager);
      setSelectedDate(tempState.date);
      setSelectedTime(tempState.time);
      setShowTimeSelection(tempState.showTimeSelection);
    }
    setShowModal(false);
  };

  return (
    <div className="consulting-root">
      <main className="consulting-main">
        <section className="consulting-header">
          <h1 className="consulting-title">Reservation</h1>
          <p className="consulting-desc">
            학습, 진로, 개인적인 고민까지 매니저와의 1:1 상담을 예약할 수 있는
            공간입니다
          </p>
        </section>

        {/* ✅ 매니저 목록을 동적으로 넘김 */}
        <section className="consulting-manager-section">
          {managers.length > 0 && (
            <ManagerSelection
              managers={managers}
              selectedManager={selectedManager}
              onSelect={handleManagerSelect}
            />
          )}
        </section>

        <section className="consulting-calendar-section">
          <CalendarComponent
            onDateSelect={handleDateSelection}
            selectedDate={selectedDate}
          />
        </section>

        {showTimeSelection && (
          <section className="consulting-time-section">
            <TimeSelection
              selectedTime={selectedTime}
              onSelect={handleTimeSelect}
            />
          </section>
        )}

        <section className="consulting-apply-section">
          <button
            className="consulting-apply-btn"
            onClick={handleApply}
            disabled={!selectedManager || !selectedDate || !selectedTime}
          >
            신청하기
          </button>
        </section>
      </main>

      <Modal
        open={showModal}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
}
