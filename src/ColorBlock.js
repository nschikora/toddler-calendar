import styled, { css } from "styled-components";

export const ColorBlock = styled.div`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border: 0.5px solid #333;
  ${(props) =>
    props.isA &&
    css`
      background-color: #db2777;
    `}
  ${(props) =>
    props.isB &&
    css`
      background-color: #0f766e;
    `}
${(props) =>
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
