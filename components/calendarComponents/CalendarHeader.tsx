import React from "react";
import styled from "styled-components";

interface Props {
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const Calendar_Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CalendarHeader: React.FC<Props> = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePreviousMonthClick = () => {
    if (selectedMonth > 0) {
      setSelectedMonth((prev) => prev - 1);
    } else {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    }
  };

  const handleNextMonthClick = () => {
    if (selectedMonth < 11) {
      setSelectedMonth((prev) => prev + 1);
    } else {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    }
  };

  return (
    <Calendar_Header>
      <button onClick={handlePreviousMonthClick}>Previous Month</button>
      <h2>{months[selectedMonth]}</h2>
      <button onClick={handleNextMonthClick}>Next Month</button>
    </Calendar_Header>
  );
};

export default CalendarHeader;
