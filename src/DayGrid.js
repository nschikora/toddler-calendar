import styled from 'styled-components'
import DayCell from './DayCell'

const DayGridContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
border-width: 0px .5px .5px .5px;
border-style: solid;
border-color: #333;
min-height: 0;
min-width: 0;
`

function DayGrid(props) {
  const { days, dispatch, sheetDate } = props
  return (
    <DayGridContainer>
      {
        days.map(
          (day, ix) => (
            <DayCell
              day={day}
              key={`daycell${ix}`}
              sheetMonth={sheetDate.getMonth()}
              dispatch={dispatch}
            />
          )
        )
      }
    </DayGridContainer>
  )
}

export default DayGrid