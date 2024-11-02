import styled from "styled-components";
import DayCell from "./DayCell";

const DayGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  border-width: 0px 0.5px 0.5px 0.5px;
  border-style: solid;
  border-color: #333;
  min-height: 0;
  min-width: 0;
`;

function DayGrid(props) {
  const { days, dispatch, sheetDate, colors } = props;
  return (
    <DayGridContainer>
      {days.map((day, ix) => (
        <DayCell
          day={day}
          key={`daycell${ix}`}
          sheetMonth={sheetDate.getMonth()}
          dispatch={dispatch}
          colors={colors}
        />
      ))}
    </DayGridContainer>
  );
}

export default DayGrid;
