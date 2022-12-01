import React from "react";
import IndividualDay from "./IndividualDay";
import type { CalendarDay } from "../util/store";
import styled from "styled-components";

interface Props {
  currentDateData: {
    month: number;
    year: number;
  };
  selectedMonth: number;
  selectedYear: number;
}

const Calendar_Body = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Table_Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Table_Content = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;

const Weekday = styled.div`
  width: 100px;
  text-align: center;
`;

const CalendarDays: React.FC<Props> = ({
  currentDateData,
  selectedMonth,
  selectedYear,
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekdaysMap = weekdays.map((weekday) => {
    return (
      <Weekday key={weekdays.indexOf(weekday)}>
        <p>{weekday}</p>
      </Weekday>
    );
  });

  let firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let dateArray: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    if (i === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (i === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (i - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      isCurrentMonth: firstDayOfMonth.getMonth() === selectedMonth,
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      year: firstDayOfMonth.getFullYear(),
      date: firstDayOfMonth,
    };

    dateArray.push(calendarDay);
  }

  const calendar = dateArray.map((day) => {
    return (
      <IndividualDay key={dateArray.indexOf(day)} day={day}></IndividualDay>
    );
  });

  return (
    <Calendar_Body>
      <Table_Header>{weekdaysMap}</Table_Header>
      <Table_Content>{calendar}</Table_Content>
    </Calendar_Body>
  );
};

export default CalendarDays;
