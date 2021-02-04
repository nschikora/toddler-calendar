import styled from 'styled-components'
const DAYS = [-3, -2, -1, 0, 1, 2, 3].map(v => new Date(v * 1000 * 60 * 60 * 24).toLocaleDateString([], { weekday: 'long' }))

const DayLabelWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
justify-items: center;
align-items: center;
background-color: #B0BEC5;
border-width: 1px 1px 0 1px;
border-style: solid;
border-color: #333;
min-height: 0;
min-width: 0;
`

const DayLabel = styled.span`
font-family: 'Roboto';
font-variant: small-caps;
font-size: 1.25rem;
color: #333;
`

function DayLabels(props) {
  return (
    <DayLabelWrapper>
      {
        DAYS.map(
          (day, ix) => (
            <DayLabel key={`weekday${ix}`}>
              {day}
            </DayLabel>
          )
        )
      }
    </DayLabelWrapper>
  )
}

export default DayLabels