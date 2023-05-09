import { useState } from "react";
import styled from "styled-components";
import OverlayingEmojiBrowser from "./EmojiBrowser";
import { Emoji } from "emoji-picker-react";

const MonthEmojiImage = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-bottom: 2px dotted #fff;
  :hover {
    border-bottom: 2px dotted #333;
  }
`;

function MonthEmoji(props) {
  const { monthEmoji, dispatch } = props;
  const [presentingEmojiBrowser, setPresentingEmojiBrowser] = useState(false);

  const handleEmojiClick = () => {
    setPresentingEmojiBrowser(!presentingEmojiBrowser);
  };
  const handleEmojiSelected = (selectedEmoji) => {
    setPresentingEmojiBrowser(false);
    dispatch({ type: "setMonthEmoji", payload: selectedEmoji.unified });
  };

  return (
    <>
      <MonthEmojiImage onClick={handleEmojiClick}>
        <Emoji
          unified={monthEmoji}
          size={64}
          lazyLoad={true}
          emojiStyle="native"
        />
      </MonthEmojiImage>
      {presentingEmojiBrowser && (
        <OverlayingEmojiBrowser
          onEmojiClick={handleEmojiSelected}
          onClose={() => setPresentingEmojiBrowser(false)}
        />
      )}
    </>
  );
}

export default MonthEmoji;
