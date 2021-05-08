import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { MONTHS, YEARS } from './Constants'
import { INITIAL_STATE } from './State'

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

const DatePickerOverlay = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,.337);
`

const DatePickerContainer = styled.div`
width: 20rem;
height: 10rem;
max-width: 100vw;
max-height: 100vh;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
background-color: #FFF;
padding: 1rem;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: stretch;
flex-direction: column;
`

const DatePickerHeadline = styled.h1`
text-align: center;
font-size: 2rem;
margin: 0;
font-family: 'Roboto';
font-weight: 200;
`

const DatePickerPickerContainer = styled.div`
display: flex;
justify-content: center;
`

const DatePickerButtonContainer = styled.div`
display: flex;
justify-content: space-between;
`

function DatePicker(props) {
  const { defaultDate, dispatch } = props
  const [currentDate, setCurrentDate] = useState(defaultDate)

  const handleMonthSelected = month => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1))
  }

  const handleYearSelected = year => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
  }

  const overlayRef = useRef()
  const handleOverlayClicked = e => {
    if (e.target === overlayRef.current) {
      props.onClose()
    }
  }

  const handleResetClicked = () => dispatch({ type: 'reset', payload: INITIAL_STATE })
  const handleCloseClicked = () => props.onClose()

  useEffect(() => {
    dispatch({ type: 'selectDate', payload: currentDate })
  }, [currentDate, dispatch])

  return (
    <DatePickerOverlay
      onClick={handleOverlayClicked}
      ref={overlayRef}
    >
      <DatePickerContainer>
        <DatePickerHeadline>
          Select a date
        </DatePickerHeadline>
        <DatePickerPickerContainer>
          <MonthSelector selectedMonth={currentDate.getMonth()} onMonthSelected={handleMonthSelected} />
          <YearSelector selectedYear={currentDate.getFullYear()} onYearSelected={handleYearSelected} />
        </DatePickerPickerContainer>
        <DatePickerButtonContainer>
          <button onClick={handleResetClicked}>Reset calendar</button>
          <button onClick={handleCloseClicked}>Close</button>
        </DatePickerButtonContainer>
      </DatePickerContainer>
    </DatePickerOverlay>
  )
}

export default DatePicker