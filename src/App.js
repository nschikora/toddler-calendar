import { useReducer } from 'react'
import styled from 'styled-components'
import Calendar from './Calendar'
import { reducer, init, initialState } from './State'
import './App.css'

const AppContainer = styled.div`
display: flex;
justify-content: center;
`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  return (
    <AppContainer>
      <Calendar days={state.days} sheetDate={state.sheetDate} dispatch={dispatch} />
    </AppContainer>
  )
}

export default App