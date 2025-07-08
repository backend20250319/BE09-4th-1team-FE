"use client";

import React, { useState, useEffect, useRef } from "react";
import "./CalendarComponent.css";

export default function CalendarComponent({
  onDateSelect,
  selectedDate: propSelectedDate,
}) {
  const [activeMonthIndex, setActiveMonthIndex] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleMonths, setVisibleMonths] = useState([]);
  const [selectedDate, setSelectedDate] = useState(propSelectedDate);

  useEffect(() => {
    const newVisibleMonths = [];
    for (let i = -1; i <= 1; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1
      );
      newVisibleMonths.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        monthLabel: date.toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
        }),
      });
    }
    setVisibleMonths(newVisibleMonths);
  }, [currentDate]);

  const generateCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const calendarDays = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      const isSelectable =
        date >=
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isToday: isToday,
        isSelectable: isSelectable,
      });
    }

    const totalCells = 6 * 7;
    const remainingCells = totalCells - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false,
      });
    }
    return calendarDays;
  };

  const handleDateClick = (year, month, day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  // propSelectedDate가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setSelectedDate(propSelectedDate);
  }, [propSelectedDate]);

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <button
        className="calendar-arrow left"
        aria-label="이전 달"
        onClick={() => navigateMonth(-1)}
      >
        <img
          src="/images/consulting/next.png"
          alt="이전"
          width={40}
          height={40}
          className="calendar-arrow-img"
        />
      </button>
      <div className="calendar-months">
        {visibleMonths.map((monthData, index) => {
          const isCenter = index === activeMonthIndex;
          const offset = index - activeMonthIndex;
          const calendarDays = generateCalendarDays(
            monthData.year,
            monthData.month
          );
          return (
            <div
              key={`${monthData.year}-${monthData.month}`}
              className={`calendar-month${isCenter ? " center" : ""}`}
              onClick={() => {
                if (!isCenter)
                  setCurrentDate(new Date(monthData.year, monthData.month, 1));
              }}
            >
              <div className="calendar-header">
                <h3 className="calendar-title">{monthData.monthLabel}</h3>
              </div>
              <div className="calendar-weekdays">
                <div className="weekday sun">일</div>
                <div className="weekday">월</div>
                <div className="weekday">화</div>
                <div className="weekday">수</div>
                <div className="weekday">목</div>
                <div className="weekday">금</div>
                <div className="weekday sat">토</div>
              </div>
              <div className="calendar-days">
                {calendarDays.map((day, dayIndex) => {
                  const isCurrentDaySelected =
                    selectedDate &&
                    selectedDate.getDate() === day.date &&
                    selectedDate.getMonth() === monthData.month &&
                    selectedDate.getFullYear() === monthData.year &&
                    day.isCurrentMonth;
                  return (
                    <div
                      key={dayIndex}
                      className={`calendar-day${
                        day.isCurrentMonth ? "" : " other-month"
                      }${isCurrentDaySelected ? " selected" : ""}${
                        day.isToday ? " today" : ""
                      }${day.isSelectable ? " selectable" : ""}`}
                      onClick={() =>
                        day.isSelectable &&
                        handleDateClick(
                          monthData.year,
                          monthData.month,
                          day.date
                        )
                      }
                    >
                      {day.date}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="calendar-arrow right"
        aria-label="다음 달"
        onClick={() => navigateMonth(1)}
      >
        <img
          src="/images/consulting/next.png"
          alt="다음"
          width={40}
          height={40}
          className="calendar-arrow-img right"
        />
      </button>
    </div>
  );
}
