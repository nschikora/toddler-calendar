import styled from "styled-components";
import { DetailsListItem } from "./DetailsListItem";

const DetailsListContainer = styled.ul`
  width: 4cm;
  max-height: 18cm;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 5.3125rem 0 0 0;
`;

export function DetailsList({ days, dispatch, sheetDate }) {
  const effectiveDays = (days ?? [])
    .filter((day) => day.date.getMonth() === sheetDate.getMonth())
    .filter((day) => Boolean(day.emoji));

  return (
    <DetailsListContainer>
      {effectiveDays.map((day) => (
        <DetailsListItem key={`day${day.date}`} day={day} dispatch={dispatch} />
      ))}
    </DetailsListContainer>
  );
}
