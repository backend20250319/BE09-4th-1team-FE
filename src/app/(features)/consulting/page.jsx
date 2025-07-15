"use client";

import React, { useState } from "react";
import ManagerSelection from "./components/ManagerSelection";
import CalendarComponent from "./components/CalendarComponent";
import TimeSelection from "./components/TimeSelection";
import consultingApi from "./api";

import "./consulting.css";

const DUMMY_MANAGERS = [
  { id: 1, name: "Mr.빌 강사님", imageUrl: "/images/consulting/mr.bill.jpg" },
  { id: 2, name: "Mr.웨렌 강사님", imageUrl: "/images/consulting/warren.webp" },
  { id: 3, name: "Mr.마 강사님", imageUrl: "/images/consulting/ma.png" },
  { id: 4, name: "Mr.장 강사님", imageUrl: "/images/consulting/jang.jpeg" },
  { id: 5, name: "Mr.강 강사님", imageUrl: "/images/consulting/Kang.png" },
];

function Modal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "48px 32px",
          minWidth: "480px",
          maxWidth: "90vw",
          boxShadow: "0 2px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
          border: "2px solid #E5E7EB",
        }}
      >
        <h2
          style={{ fontWeight: "bold", fontSize: "28px", marginBottom: "24px" }}
        >
          알림
        </h2>
        <div style={{ marginBottom: "40px", fontSize: "18px", color: "#222" }}>
          선택하신 옵션으로 상담 예약이 진행됩니다
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
          <button className="modal-confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button
            onClick={onCancel}
            style={{
              background: "#fff",
              color: "#A78BFA",
              border: "2px solid #A78BFA",
              borderRadius: "32px",
              padding: "16px 48px",
              fontWeight: "bold",
              fontSize: "20px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReservationPage() {
  const [selectedManager, setSelectedManager] = useState(DUMMY_MANAGERS[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempState, setTempState] = useState(null);

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
    const userId = 1;
    const managerId = selectedManager.id;

    // 날짜를 로컬 기준으로 포맷
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // 시간 포맷
    const startTimeRaw = selectedTime.split("-")[0];
    const formattedTime = `${startTimeRaw.slice(0, 2)}:${startTimeRaw.slice(
      2
    )}:00`;

    // ISO 날짜시간 조합
    const localDateTime = `${formattedDate}T${formattedTime}`;
    const consultationDetailsDto = {
      userId: String(userId),
      managerId: String(managerId),
      localDateTime: localDateTime,
    };

    try {
      const res = await consultingApi.createConsultingReservation(
        consultationDetailsDto
      );
      console.log("예약 성공:", res);
    } catch (error) {
      console.error("예약 실패:", error);
    }
  };

  //
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
        <section className="consulting-manager-section">
          <ManagerSelection
            selectedManager={selectedManager}
            onSelect={handleManagerSelect}
          />
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
