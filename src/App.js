import { useReducer } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import { reducer, loadExistingStateOrInit, INITIAL_STATE } from "./State";
import "./App.css";
import { DetailsList } from "./DetailsList";

const AppContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    loadExistingStateOrInit
  );

  return (
    <AppContainer>
      <DetailsList
        colors={state.colors}
        days={state.days}
        dispatch={dispatch}
        sheetDate={state.sheetDate}
      />
      <Calendar
        colors={state.colors}
        days={state.days}
        sheetDate={state.sheetDate}
        dispatch={dispatch}
        monthEmoji={state.monthEmoji}
      />
    </AppContainer>
  );
}

export default App;
