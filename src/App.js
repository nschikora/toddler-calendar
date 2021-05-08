import { useReducer } from 'react'
import styled from 'styled-components'
import Calendar from './Calendar'
import { reducer, init, INITIAL_STATE } from './State'
import './App.css'

const AppContainer = styled.div`
display: flex;
justify-content: center;
`

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, init)

  return (
    <AppContainer>
      <Calendar days={state.days} sheetDate={state.sheetDate} dispatch={dispatch} monthEmoji={state.monthEmoji}/>
    </AppContainer>
  )
}

export default App