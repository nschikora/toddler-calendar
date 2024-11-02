import styled, { css } from "styled-components";
import { useState } from "react";
import DayCellButton from "./DayCellButton";
import OverlayingEmojiBrowser from "./EmojiBrowser";
import { Emoji } from "emoji-picker-react";
import { ACTIONS } from "./State";

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
      background-color: ${props.colors.colorA};
    `}
${(props) =>
    props.isSheetMonth &&
    props.isB &&
    css`
      background-color: ${props.colors.colorB};
    `}
${(props) =>
    props.isSheetMonth &&
    props.isAtoB &&
    css`
      background: linear-gradient(
        to bottom right,
        ${props.colors.colorA} 0%,
        ${props.colors.colorA} 50%,
        ${props.colors.colorB} 51%,
        ${props.colors.colorB} 100%
      );
    `}
${(props) =>
    props.isSheetMonth &&
    props.isBtoA &&
    css`
      background: linear-gradient(
        to bottom right,
        ${props.colors.colorB} 0%,
        ${props.colors.colorB} 50%,
        ${props.colors.colorA} 51%,
        ${props.colors.colorA} 100%
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
  const { day, sheetMonth, dispatch, colors } = props;
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
      dispatch({ type: ACTIONS.SWITCH_TO_B, payload: day });
    } else if (isB) {
      dispatch({ type: ACTIONS.SWITCH_TO_A, payload: day });
    } else if (isAtoB) {
      dispatch({ type: ACTIONS.RESET_TO_A, payload: day });
    } else if (isBtoA) {
      dispatch({ type: ACTIONS.RESET_TO_B, payload: day });
    }
  };

  const handleAddEmojiClick = () =>
    setPresentingEmojiBrowser(!presentingEmojiBrowser);

  const handleClearEmojiClick = () =>
    dispatch({ type: ACTIONS.UPDATE_DAY, payload: { ...day, emoji: null } });

  const handleEmojiClick = (clickedEmoji) => {
    setPresentingEmojiBrowser(false);
    setIsMouseOver(false);
    dispatch({
      type: ACTIONS.UPDATE_DAY,
      payload: { ...day, emoji: clickedEmoji },
    });
  };

  const handleMouseOver = () => setIsMouseOver(isSheetMonth && true);
  const handleMouseLeave = () => setIsMouseOver(false);

  const handleInitialAllocationClick = () => {
    if (isA || isAtoB) {
      dispatch({ type: ACTIONS.SELECT_INITIAL_ALLOCATION, payload: "B" });
    } else if (isB || isBtoA) {
      dispatch({ type: ACTIONS.SELECT_INITIAL_ALLOCATION, payload: "A" });
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
      colors={colors}
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
              <DayCellButton
                onClick={handleAddEmojiClick}
                text={"E"}
                hint="Add emoji"
              />
              <DayCellButton
                onClick={handleClearEmojiClick}
                text={"C"}
                hint="Clear emoji"
              />
              <DayCellButton
                onClick={handleSwitchClick}
                text={"S"}
                hint="Switch color"
              />
              {isFirstDayOfSheetMonth && (
                <DayCellButton
                  onClick={handleInitialAllocationClick}
                  text={isA || isAtoB ? "B" : "A"}
                  hint="Set initial color"
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
