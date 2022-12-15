import React, { useEffect, useState } from "react";
import IndividualDay from "./IndividualDay";
import type { CalendarDay, CalendarItem } from "../util/store";
import styled from "styled-components";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

interface Props {
  currentDateData: {
    month: number;
    year: number;
  };
  selectedMonth: number;
  selectedYear: number;
  currentlyDragged: string;
  selectedMeal: string;
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
  currentlyDragged,
  selectedMeal,
}) => {
  const { user } = useAuth();
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekdaysMap = weekdays.map((weekday) => {
    return (
      <Weekday key={weekdays.indexOf(weekday)}>
        <p>{weekday}</p>
      </Weekday>
    );
  });

  useEffect(() => {
    const getCalendar = async () => {
      const calendar = await getDocs(
        collection(db, user?.email, "calendarCollection", "calendar")
      );
      const tempArray: any = calendar.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const calendarItemArray: CalendarItem[] = [];
      tempArray.forEach((calendarItem: CalendarItem) => {
        const temp: CalendarItem = {
          month: calendarItem.month,
          day: calendarItem.day,
          year: calendarItem.year,
          selectedMeal: calendarItem.selectedMeal,
          name: calendarItem.name,
        };
        calendarItemArray.push(temp);
      });
      setCalendarItems(calendarItemArray);
    };

    getCalendar();
  }, [user?.email]);

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
      id: i + 1,
    };

    dateArray.push(calendarDay);
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    day: CalendarDay
  ) => {
    const newCalendarItem = {
      month: day.month,
      day: day.number,
      year: day.year,
      selectedMeal: selectedMeal,
      name: currentlyDragged,
    };
    addDoc(
      collection(db, user.email, "calendarCollection", "calendar"),
      newCalendarItem
    );
  };

  const calendar = dateArray.map((day) => {
    return (
      <div
        key={day.id}
        onDragOver={dragOver}
        onDrop={(event) => handleDrop(event, day)}
      >
        <IndividualDay key={day.id} day={day} calendarItems={calendarItems}></IndividualDay>
      </div>
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
