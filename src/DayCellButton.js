import styled from "styled-components";

const DayCellButtonWrapper = styled.button`
  width: 2rem;
  height: 2rem;
  border-width: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  color: #333;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #333;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.4);
    color: #333;
  }
`;

const DayCellButtonText = styled.div`
  font-family: "Roboto";
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 900;
`;

function DayCellButton(props) {
  const { text, onClick, hint } = props;
  return (
    <DayCellButtonWrapper onClick={onClick} aria-label={hint} title={hint}>
      {text && <DayCellButtonText>{text}</DayCellButtonText>}
    </DayCellButtonWrapper>
  );
}

export default DayCellButton;
