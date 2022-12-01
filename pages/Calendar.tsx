import React, { useState } from "react";
import CalendarDays from "../components/calendarComponents/CalendarDays";
import CalendarHeader from "../components/calendarComponents/CalendarHeader";
import styled from "styled-components";

const Calendar_Container = styled.div`
  width: 900px;
  height: 600px;
`;

const Calendar = () => {
  const currentDate = new Date();
  const currentDateData = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const [selectedMonth, setSelectedMonth] = useState(currentDateData.month);
  const [selectedYear, setSelectedYear] = useState(currentDateData.year);

  return (
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
      />
    </Calendar_Container>
  );
};

export default Calendar;
