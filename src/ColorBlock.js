import styled, { css } from "styled-components";

export const ColorBlock = styled.div`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border: 0.5px solid #333;
  ${(props) =>
    props.isA &&
    css`
      background-color: ${props.colors.colorA};
    `}
  ${(props) =>
    props.isB &&
    css`
      background-color: ${props.colors.colorB};
    `}
${(props) =>
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
