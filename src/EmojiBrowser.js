import { useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const EmojiBrowserOverlay = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

function OverlayingEmojiBrowser(props) {
  const { onEmojiClick, onClose } = props;
  const overlayRef = useRef();
  const handleOverlayClicked = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  return (
    <EmojiBrowserOverlay onClick={handleOverlayClicked} ref={overlayRef}>
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        lazyLoadEmojis={true}
        emojiStyle="native"
      />
    </EmojiBrowserOverlay>
  );
}

export default OverlayingEmojiBrowser;
