import styled from "styled-components";
import Header from "./Header";
import DayLabels from "./DayLabels";
import DayGrid from "./DayGrid";

const CalendarContainer = styled.div`
  max-width: 22cm;
  max-height: 18cm;
  display: grid;
  grid-template-rows: 0.9fr 0.4fr 5.5fr;
  min-height: 0;
  min-width: 0;
  flex-grow: 1;
`;

function Calendar(props) {
  const { days, sheetDate, dispatch, monthEmoji } = props;
  return (
    <CalendarContainer>
      <Header date={sheetDate} dispatch={dispatch} monthEmoji={monthEmoji} />
      <DayLabels />
      <DayGrid sheetDate={sheetDate} days={days} dispatch={dispatch} />
    </CalendarContainer>
  );
}

export default Calendar;
