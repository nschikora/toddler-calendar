import styled from "styled-components";
import { Emoji } from "emoji-picker-react";
import { ColorBlock } from "./ColorBlock";
import { ListItemCustomTextRow } from "./ListItemCustomTextRow";

const ListItemContainer = styled.li`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ListItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItemAllocationAndDateRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-weight: 900;
`;

export function DetailsListItem({ day, dispatch }) {
  const { allocation, emoji, date } = day;

  const isA = allocation === "A";
  const isB = allocation === "B";
  const isAtoB = allocation === "AtoB";
  const isBtoA = allocation === "BtoA";

  return (
    <ListItemContainer>
      <Emoji
        unified={emoji.unified}
        size={32}
        lazyLoad={true}
        emojiStyle="native"
      />
      <ListItemTextContainer>
        <ListItemAllocationAndDateRow>
          {date.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
          })}
          <ColorBlock isA={isA} isB={isB} isAtoB={isAtoB} isBtoA={isBtoA} />
        </ListItemAllocationAndDateRow>
        <ListItemCustomTextRow day={day} dispatch={dispatch} />
      </ListItemTextContainer>
    </ListItemContainer>
  );
}
