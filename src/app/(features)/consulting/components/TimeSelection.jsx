"use client";

import React, { useState } from "react";
import "./TimeSelection.css";

const DUMMY_TIME_SLOTS = {
  morning: [
    { label: "09:00 - 10:00", value: "0900-1000", available: true },
    { label: "10:00 - 11:00", value: "1000-1100", available: true },
    { label: "11:00 - 12:00", value: "1100-1200", available: false },
  ],
  afternoon: [
    { label: "12:00 - 13:00", value: "1200-1300", available: true },
    { label: "13:00 - 14:00", value: "1300-1400", available: true },
    { label: "14:00 - 15:00", value: "1500-1600", available: true },
    { label: "16:00 - 17:00", value: "1600-1700", available: false },
    { label: "17:00 - 18:00", value: "1700-1800", available: true },
    { label: "18:00 - 19:00", value: "1800-1900", available: true },
    { label: "19:00 - 20:00", value: "1900-2000", available: true },
    { label: "20:00 - 21:00", value: "2000-2100", available: true },
  ],
};

export default function TimeSelection({ selectedTime, onSelect }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedTime);

  const handleTimeSlotClick = (slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot.value);
      if (onSelect) {
        onSelect(slot.value);
      }
    }
  };

  // selectedTime prop이 변경되면 내부 상태도 업데이트
  React.useEffect(() => {
    setSelectedTimeSlot(selectedTime);
  }, [selectedTime]);

  return (
    <div className="time-selection-container">
      <div className="time-selection-box">
        <h3 className="time-title">오전</h3>
        <div className="time-btn-group">
          {DUMMY_TIME_SLOTS.morning.map((slot) => (
            <button
              key={slot.value}
              className={`time-btn${
                selectedTimeSlot === slot.value ? " selected" : ""
              }${!slot.available ? " disabled" : ""}`}
              onClick={() => handleTimeSlotClick(slot)}
              disabled={!slot.available}
            >
              {slot.label}
            </button>
          ))}
        </div>
        <h3 className="time-title">오후</h3>
        <div className="time-btn-group">
          {DUMMY_TIME_SLOTS.afternoon.map((slot) => (
            <button
              key={slot.value}
              className={`time-btn${
                selectedTimeSlot === slot.value ? " selected" : ""
              }${!slot.available ? " disabled" : ""}`}
              onClick={() => handleTimeSlotClick(slot)}
              disabled={!slot.available}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
