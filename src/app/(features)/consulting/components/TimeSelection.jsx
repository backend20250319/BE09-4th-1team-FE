"use client";

import React, { useState } from "react";
import "./TimeSelection.css";

const DUMMY_TIME_SLOTS = {
  morning: [
    { label: "09:00 - 10:30", value: "0900-1030", available: true },
    { label: "10:30 - 11:30", value: "1030-1130", available: true },
    { label: "11:30 - 12:30", value: "1130-1230", available: false },
  ],
  afternoon: [
    { label: "12:30 - 13:00", value: "1230-1300", available: true },
    { label: "13:00 - 14:00", value: "1300-1400", available: true },
    { label: "14:00 - 15:00", value: "1500-1600", available: true },
    { label: "15:30 - 16:00", value: "1530-1600", available: false },
    { label: "16:30 - 17:00", value: "1630-1700", available: true },
    { label: "17:30 - 18:00", value: "1730-1800", available: true },
    { label: "18:00 - 18:30", value: "1800-1830", available: true },
    { label: "19:00 - 19:30", value: "1900-1930", available: true },
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
