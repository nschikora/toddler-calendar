import styled from "styled-components";
import { ACTIONS } from "./State";

const ListItemCustomTextRowContainer = styled.div`
  cursor: pointer;
`;

const EmptyCustomText = styled.span`
  color: #999;
`;

export const ListItemCustomTextRow = ({ day, dispatch }) => {
  const { customText } = day;

  const handleSaveCustomText = (customText) =>
    dispatch({ type: ACTIONS.UPDATE_DAY, payload: { ...day, customText } });

  const handleCustomTextClick = () => {
    const text = prompt("Enter your comment", customText ?? "");
    handleSaveCustomText(text);
  };

  return (
    <ListItemCustomTextRowContainer onClick={handleCustomTextClick}>
      {customText ? customText : <EmptyCustomText>no comment</EmptyCustomText>}
    </ListItemCustomTextRowContainer>
  );
};
