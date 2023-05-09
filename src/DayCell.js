import styled, { css } from "styled-components";
import { useState } from "react";
import DayCellButton from "./DayCellButton";
import OverlayingEmojiBrowser from "./EmojiBrowser";
import { Emoji } from "emoji-picker-react";

const DayCellWrapper = styled.div`
  min-width: 0;
  min-height: 0;
  border: 0.5px solid #333;
  ${(props) =>
    !props.isSheetMonth &&
    css`
      background-color: #fff;
    `}
  ${(props) =>
    props.isSheetMonth &&
    props.isA &&
    css`
      background-color: #db2777;
    `}
${(props) =>
    props.isSheetMonth &&
    props.isB &&
    css`
      background-color: #0f766e;
    `}
${(props) =>
    props.isSheetMonth &&
    props.isAtoB &&
    css`
      background: linear-gradient(
        to bottom right,
        #db2777 0%,
        #db2777 50%,
        #0f766e 51%,
        #0f766e 100%
      );
    `}
${(props) =>
    props.isSheetMonth &&
    props.isBtoA &&
    css`
      background: linear-gradient(
        to bottom right,
        #0f766e 0%,
        #0f766e 50%,
        #db2777 51%,
        #db2777 100%
      );
    `}
`;

const DayCellContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DayCellDate = styled.div`
  font-family: "Roboto";
  font-size: 1.5rem;
  text-align: right;
  padding: 0.5rem 0.5rem 0 0;
  ${(props) =>
    props.isSheetMonth
      ? css`
          color: #333;
        `
      : css`
          color: #c2c2c2;
        `}
`;

const DayCellButtonContainer = styled.div`
  display: flex;
  height: 2rem;
  padding: 0 0 0.2rem 0.2rem;
`;

const DayCellWeekendBar = styled.div`
  height: 0.5rem;
  background-color: rgba(0, 0, 0, 0.19);
`;

const EmojiContainer = styled.div`
  position: absolute;
  transform: translate(1rem, 0.5rem);
  width: 4rem;
  height: 4rem;
  z-index: 10;
`;

function DayCell(props) {
  const { day, sheetMonth, dispatch } = props;
  const { date, allocation, emoji } = day;

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [presentingEmojiBrowser, setPresentingEmojiBrowser] = useState(false);

  const isSheetMonth = date.getMonth() === sheetMonth;
  const isA = allocation === "A";
  const isB = allocation === "B";
  const isAtoB = allocation === "AtoB";
  const isBtoA = allocation === "BtoA";

  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const isFirstDayOfSheetMonth =
    date.getDate() === 1 && date.getMonth() === sheetMonth;

  const handleSwitchClick = () => {
    if (!isSheetMonth) {
      return;
    }

    if (isA) {
      dispatch({ type: "switchToB", payload: day });
    } else if (isB) {
      dispatch({ type: "switchToA", payload: day });
    } else if (isAtoB) {
      dispatch({ type: "resetToA", payload: day });
    } else if (isBtoA) {
      dispatch({ type: "resetToB", payload: day });
    }
  };

  const handleAddEmojiClick = () =>
    setPresentingEmojiBrowser(!presentingEmojiBrowser);
  const handleEmojiClick = (clickedEmoji) => {
    setPresentingEmojiBrowser(false);
    setIsMouseOver(false);
    dispatch({ type: "updateDay", payload: { ...day, emoji: clickedEmoji } });
  };

  const handleMouseOver = () => setIsMouseOver(isSheetMonth && true);
  const handleMouseLeave = () => setIsMouseOver(false);

  const handleInitialAllocationClick = () => {
    if (isA || isAtoB) {
      dispatch({ type: "selectInitialAllocation", payload: "B" });
    } else if (isB || isBtoA) {
      dispatch({ type: "selectInitialAllocation", payload: "A" });
    }
  };

  return (
    <DayCellWrapper
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      isA={isA}
      isB={isB}
      isAtoB={isAtoB}
      isBtoA={isBtoA}
      isSheetMonth={isSheetMonth}
    >
      <DayCellContent isMouseOver={isMouseOver}>
        {!isMouseOver && emoji && (
          <EmojiContainer>
            <Emoji
              unified={emoji.unified}
              size={64}
              lazyLoad={true}
              emojiStyle="native"
            />
          </EmojiContainer>
        )}
        <DayCellDate isSheetMonth={isSheetMonth}>{date.getDate()}</DayCellDate>
        <DayCellButtonContainer>
          {isSheetMonth && isMouseOver && (
            <>
              <DayCellButton onClick={handleAddEmojiClick} text={"E"} />
              <DayCellButton onClick={handleSwitchClick} text={"S"} />
              {isFirstDayOfSheetMonth && (
                <DayCellButton
                  onClick={handleInitialAllocationClick}
                  text={isA || isAtoB ? "B" : "A"}
                />
              )}
            </>
          )}
        </DayCellButtonContainer>
        {isWeekend && !isMouseOver && <DayCellWeekendBar />}
        {presentingEmojiBrowser && (
          <OverlayingEmojiBrowser
            onEmojiClick={handleEmojiClick}
            onClose={() => setPresentingEmojiBrowser(false)}
          />
        )}
      </DayCellContent>
    </DayCellWrapper>
  );
}

export default DayCell;
