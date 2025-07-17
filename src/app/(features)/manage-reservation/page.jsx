"use client";

import React, { useEffect, useState } from "react";
import styles from "../reservation/page.module.css";
import ManagerCard from "./ManagerCard";
import ReservationCard from "../reservation/components/ReservationCard";
import {
  getConsultationsByManagerId,
  getConsultationsByUserId,
} from "./api";
import axios from "axios";

export default function ManageReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [reservations, setReservations] = useState([]);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const tabs = ["All", "Waiting", "Approved", "Rejected", "Cancelled", "Completed"];

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    try {
      // ✅ 사용자 정보 가져오기
      const res = await axios.get("http://localhost:8000/api/v1/user-service/users/me", {
        headers,
      });

      console.log("💬 /me 응답 구조:", res.data);

      const { role, id } = res.data;
      setRole(role);
      setUserId(id);

      // ✅ 예약 정보 가져오기
      const consultations =
        role === "MANAGER"
          ? await getConsultationsByManagerId(id)
          : await getConsultationsByUserId(id);

      setReservations(consultations);
    } catch (err) {
      console.error("예약 데이터 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = reservations.filter(
    (item) => selectedStatus === "All" || item.status === selectedStatus
  );

  if (role === null) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reservations</h1>
      <p className={styles.subtitle}>
        {role === "MANAGER" ? "상담 예약 내역을 확인하세요" : "나의 예약 내역을 확인하세요"}
      </p>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <span
            key={tab}
            className={selectedStatus === tab ? styles.activeTab : styles.tab}
            onClick={() => setSelectedStatus(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className={styles.cardList}>
        {filtered.map((item) =>
          role === "MANAGER" ? (
            <ManagerCard
              key={item.sessionId}
              data={item}
              onStatusUpdated={fetchData}
            />
          ) : (
            <ReservationCard
              key={item.sessionId}
              data={item}
            />
          )
        )}
      </div>
    </div>
  );
}
