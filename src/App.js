import { useReducer } from 'react'
import styled from 'styled-components'
import Calendar from './Calendar'
import { reducer, init, initialState } from './State'
import { MONTHS, YEARS } from './Constants'
import './App.css'



function MonthSelector(props) {
  const { selectedMonth, onMonthSelected } = props
  const handleChange = e => onMonthSelected(e.target.value)
  return (
    <select value={selectedMonth} onChange={handleChange}>
      {MONTHS.map((month, ix) => <option value={ix} label={month} key={`month${ix}`} />)}
    </select>
  )
}

function YearSelector(props) {
  const { selectedYear, onYearSelected } = props
  const handleChange = e => onYearSelected(e.target.value)
  return (
    <select value={selectedYear} onChange={handleChange}>
      {YEARS.map(year => <option value={year} label={year} key={`year${year}`} />)}
    </select>
  )
}

const AppContainer = styled.div`
display: flex;
justify-content: center;
`

const ControlContainer = styled.div`
position: absolute;
top: 22cm;
`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  const setSheetMonth = month => dispatch({ type: 'selectMonth', payload: month })
  const setSheetYear = year => dispatch({ type: 'selectYear', payload: year })
  const resetSheet = () => dispatch({ type: 'reset', payload: initialState })

  return (
    <AppContainer>
      <ControlContainer>
        <MonthSelector selectedMonth={state.sheetDate.getMonth()} onMonthSelected={setSheetMonth} />
        <YearSelector selectedYear={state.sheetDate.getFullYear()} onYearSelected={setSheetYear} />
        <button onClick={resetSheet}>Reset</button>
      </ControlContainer>
      <Calendar days={state.days} sheetDate={state.sheetDate} dispatch={dispatch} />
    </AppContainer>
  )
}

export default App