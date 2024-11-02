import styled from "styled-components";
import { useState } from "react";
import { SwatchesPicker } from "react-color";
import { ColorBlock } from "./ColorBlock";
import { ACTIONS } from "./State";

const BlocksWarapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const SwatchesPickerWrapper = styled.div`
  position: absolute;
  z-index: 100;
`;

export function ColorPicker(props) {
  const { colors, dispatch } = props;
  const [presentingColorPicker, setPresentingColorPicker] = useState(null);

  const handleColorChange = (color) => {
    dispatch({
      type: ACTIONS.SET_COLORS,
      payload: { ...colors, [presentingColorPicker]: color },
    });
    setPresentingColorPicker(null);
  };

  const handleColorClick = (color) => {
    setPresentingColorPicker(color);
  };

  return (
    <>
      <BlocksWarapper>
        <BlockWrapper>
          <span>Color A</span>
          <ColorBlock
            isA
            colors={colors}
            onClick={() => handleColorClick("colorA")}
          />
        </BlockWrapper>
        <BlockWrapper>
          <span>Color B</span>
          <ColorBlock
            isB
            colors={colors}
            onClick={() => handleColorClick("colorB")}
          />
        </BlockWrapper>
      </BlocksWarapper>

      {presentingColorPicker && (
        <SwatchesPickerWrapper>
          <SwatchesPicker
            color={colors[presentingColorPicker]}
            onChangeComplete={(color) => handleColorChange(color.hex)}
          />
        </SwatchesPickerWrapper>
      )}
    </>
  );
}
