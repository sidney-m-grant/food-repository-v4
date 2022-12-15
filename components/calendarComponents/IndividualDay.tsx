import React, { useEffect, useState } from "react";
import type { CalendarDay, CalendarItem } from "../util/store";
import styled from "styled-components";

interface StyledProps {
  isCurrentMonth: boolean;
}

interface Props {
  day: CalendarDay;
  calendarItems: CalendarItem[];
}

const Individual_Day = styled.div<StyledProps>`
  width: 125px;
  height: 100px;
  position: relative;
  border: 1px solid #a6a6a6;
  color: ${(prop) => (prop.isCurrentMonth ? "black" : "grey")};
`;

const Meal_Item = styled.h6`
  height: 1px;
  width: 100%;
  flex: auto;
`;

const IndividualDay: React.FC<Props> = ({ day, calendarItems }) => {
  const isCurrentMonth = day.isCurrentMonth;

  // this could maybe be useMemo

  const [scheduledMeals, setScheduledMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  useEffect(() => {
    if (calendarItems) {
      setScheduledMeals({ breakfast: "", lunch: "", dinner: "" });
      for (let i = 0; i < calendarItems.length; i++) {
        if (
          calendarItems[i].day === day.number &&
          calendarItems[i].month === day.month &&
          calendarItems[i].year === day.year
        ) {
          if (calendarItems[i].selectedMeal === "breakfast") {
            setScheduledMeals((prev) => ({
              ...prev,
              breakfast: calendarItems[i].name,
            }));
          }
          if (calendarItems[i].selectedMeal === "lunch") {
            setScheduledMeals((prev) => ({
              ...prev,
              lunch: calendarItems[i].name,
            }));
          }
          if (calendarItems[i].selectedMeal === "dinner") {
            setScheduledMeals((prev) => ({
              ...prev,
              dinner: calendarItems[i].name,
            }));
          }
        }
      }
    }
  }, [day, calendarItems]);

  return (
    <Individual_Day isCurrentMonth={isCurrentMonth}>
      <h5 style={{ height: "5px", margin: "0px" }}>{day.number}</h5>
      {scheduledMeals.breakfast ? (
        <Meal_Item style={{ backgroundColor: "red" }}>
          {scheduledMeals.breakfast}
        </Meal_Item>
      ) : null}
      {scheduledMeals.lunch ? (
        <Meal_Item style={{ backgroundColor: "green" }}>
          {scheduledMeals.lunch}
        </Meal_Item>
      ) : null}
      {scheduledMeals.dinner ? (
        <Meal_Item style={{ backgroundColor: "blue" }}>
          {scheduledMeals.dinner}
        </Meal_Item>
      ) : null}
    </Individual_Day>
  );
};

export default IndividualDay;
