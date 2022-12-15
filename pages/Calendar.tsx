import React, { useState } from "react";
import CalendarDays from "../components/calendarComponents/CalendarDays";
import CalendarHeader from "../components/calendarComponents/CalendarHeader";
import styled from "styled-components";
import CalendarSidebar from "../components/calendarComponents/CalendarSidebar";

const Calendar_Container = styled.div`
  width: 900px;
  height: 600px;
  margin-left: 250px;
  margin-top: 30px;
`;

const Calendar = () => {
  const currentDate = new Date();
  const currentDateData = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const [selectedMonth, setSelectedMonth] = useState(currentDateData.month);
  const [selectedYear, setSelectedYear] = useState(currentDateData.year);
  const [currentlyDragged, setCurrentlyDragged] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<string>("breakfast");

  return (
    <>
      <CalendarSidebar
        setCurrentlyDragged={setCurrentlyDragged}
        setSelectedMeal={setSelectedMeal}
        selectedMeal={selectedMeal}
      ></CalendarSidebar>
      <Calendar_Container>
        <CalendarHeader
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
        <CalendarDays
          currentDateData={currentDateData}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          currentlyDragged={currentlyDragged}
          selectedMeal={selectedMeal}
        />
      </Calendar_Container>
    </>
  );
};

export default Calendar;
