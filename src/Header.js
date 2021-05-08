import styled from 'styled-components'
import MonthEmoji from './MonthEmoji'
import { MONTHS } from './Constants'
import SheetSettings from './SheetSettings'
import { useState } from 'react'

const HeaderWrap = styled.div`
display: grid;
grid-template-columns: 2fr 3fr 2fr;
justify-items: center;
align-items: center;
min-height: 0;
min-width: 0;
`

const MonthNameWrap = styled.div`
min-width: 25rem;
`

const MonthName = styled.h1`
text-align: center;
font-size: 5rem;
margin: 0;
font-family: 'Roboto';
font-weight: 200;
letter-spacing: 0.335rem;
font-variant: small-caps;
:hover {
  text-decoration: underline dotted;
}
`

const MonthNumber = styled.h1`
font-size: 5rem;
font-weight: 900;
font-family: 'Roboto';
margin: 0;
`

function Header(props) {
  const { date, dispatch, monthEmoji } = props
  const [presentingSheetSettings, setPresentingSheetSettings] = useState(false)

  const handleMonthNameClicked = () => setPresentingSheetSettings(!presentingSheetSettings)
  const handleSheetSettingsWantsClose = () => setPresentingSheetSettings(false)

  return (
    <HeaderWrap>
      <MonthEmoji 
        monthEmoji={monthEmoji} 
        dispatch={dispatch}
      />
      <MonthNameWrap>
        <MonthName
          onClick={handleMonthNameClicked}
        >
          {
            MONTHS[date.getMonth()].toUpperCase()
          }
        </MonthName>
      </MonthNameWrap>
      <div>
        <MonthNumber>
          {
            (date.getMonth() + 1).toString().padStart(2, '0')
          }
        </MonthNumber>
      </div>
      {
        presentingSheetSettings &&
        <SheetSettings 
          defaultDate={date}
          onClose={handleSheetSettingsWantsClose}
          dispatch={dispatch}
        />
      }
    </HeaderWrap>
  )
}

export default Header