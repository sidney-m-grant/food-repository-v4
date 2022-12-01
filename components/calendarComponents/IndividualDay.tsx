import React from "react";
import type { CalendarDay } from "../util/store";
import styled from "styled-components";

interface StyledProps {
  isCurrentMonth: boolean;
}

interface Props {
  day: CalendarDay;
}

const Individual_Day = styled.div<StyledProps>`
  width: 125px;
  height: 75px;
  position: relative;
  border: 1px solid #a6a6a6;
  color: ${(prop) => (prop.isCurrentMonth ? "black" : "grey")};
`;

const IndividualDay: React.FC<Props> = ({ day }) => {
  const isCurrentMonth = day.isCurrentMonth;

  return (
    <Individual_Day isCurrentMonth={isCurrentMonth}>
      {day.number}
    </Individual_Day>
  );
};

export default IndividualDay;
