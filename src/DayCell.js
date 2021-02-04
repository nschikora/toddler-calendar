import styled, { css } from 'styled-components'
import { useState } from 'react'
import DayCellButton from './DayCellButton'
import OverlayingEmojiBrowser from './EmojiBrowser'

const DayCellWrapper = styled.div`
min-width: 0;
min-height: 0;
border: .5px solid #333;
${
  props => !props.isSheetMonth && 
  css`
  background-color: #FFF;
  `
}
${
  props => props.isSheetMonth && props.isA &&
  css`
  background-color: #E57373;
  `
}
${
  props => props.isSheetMonth && props.isB &&
  css`
  background-color: #7986CB;
  `
}
${
  props => props.isSheetMonth && props.isAtoB &&
  css`
  background: linear-gradient(to bottom right, #E57373 0%, #E57373 50%, #7986CB 51%, #7986CB 100%);
  `
}
${
  props => props.isSheetMonth && props.isBtoA &&
  css`
  background: linear-gradient(to bottom right, #7986CB 0%, #7986CB 50%, #E57373 51%, #E57373 100%);
  `
}
`

const DayCellContent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
${
  props => props.emoji && !props.isMouseOver &&
  css`
  background-image: url(/openmoji-svg-color/${props.emoji.hexcode}.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: 5%;
  `
}
`

const DayCellDate = styled.div`
font-family: 'Roboto';
font-size: 1.5rem;
text-align: right;
padding: .5rem .5rem 0 0;
${
  props => props.isSheetMonth ?
  css`
  color: #333;
  ` : css`
  color: #C2C2C2;
  `
}
`

const DayCellButtonContainer = styled.div`
display: flex;
height: 2rem;
padding: 0 0 .2rem .2rem;
`

const DayCellWeekendBar = styled.div`
height: .5rem;
background-color: rgba(0, 0, 0, 0.19);
`

function DayCell(props) {
  const { day, sheetMonth, dispatch } = props
  const { date, allocation, emoji } = day

  const [isMouseOver, setIsMouseOver] = useState(false)
  const [presentingEmojiBrowser, setPresentingEmojiBrowser] = useState(false)

  const isSheetMonth = date.getMonth() === sheetMonth
  const isA = allocation === 'A'
  const isB = allocation === 'B'
  const isAtoB = allocation === 'AtoB'
  const isBtoA = allocation === 'BtoA'

  const isWeekend = date.getDay() === 0 || date.getDay() === 6

  const isFirstDayOfSheetMonth = date.getDate() === 1 && date.getMonth() === sheetMonth

  const handleSwitchClick = () => {
    if (!isSheetMonth) {
      return
    }

    if (isA) {
      dispatch({ type: 'switchToB', payload: day })
    } else if (isB) {
      dispatch({ type: 'switchToA', payload: day })
    } else if (isAtoB) {
      dispatch({ type: 'resetToA', payload: day })
    } else if (isBtoA) {
      dispatch({ type: 'resetToB', payload: day })
    }
  }

  const handleAddEmojiClick = () => setPresentingEmojiBrowser(!presentingEmojiBrowser)
  const handleEmojiClick = (clickedEmoji) => {
    setPresentingEmojiBrowser(false)
    setIsMouseOver(false)
    dispatch({ type: 'updateDay', payload: { ...day, emoji: clickedEmoji } })
  }


  const handleMouseOver = () => setIsMouseOver(isSheetMonth && true)
  const handleMouseLeave = () => setIsMouseOver(false)

  const handleInitialAllocationClick = () => {
    if (isA || isAtoB) {
      dispatch({ type: 'selectInitialAllocation', payload: 'B' })
    } else if (isB || isBtoA) {
      dispatch({ type: 'selectInitialAllocation', payload: 'A' })
    }
  }

  return (
    <DayCellWrapper
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      isA={isA}
      isB={isB}
      isAtoB={isAtoB}
      isBtoA={isBtoA}
      isSheetMonth={isSheetMonth}
    >
      <DayCellContent
        emoji={emoji}
        isMouseOver={isMouseOver}
      >
        <DayCellDate isSheetMonth={isSheetMonth}>
          {date.getDate()}
        </DayCellDate>
        <DayCellButtonContainer>
          {
            isSheetMonth && isMouseOver &&
            <>
              <DayCellButton onClick={handleAddEmojiClick} icon={'Emoji'} />
              <DayCellButton onClick={handleSwitchClick} icon={'Switch'} />
              {
                isFirstDayOfSheetMonth &&
                <DayCellButton 
                  onClick={handleInitialAllocationClick} 
                  text={isA || isAtoB ? 'B' : 'A'} 
                />
              }
            </>
          }
        </DayCellButtonContainer>
        {
          isWeekend && !isMouseOver &&
          <DayCellWeekendBar />
        }
        {
          presentingEmojiBrowser &&
          <OverlayingEmojiBrowser onEmojiClick={handleEmojiClick} />
        }
      </DayCellContent>
    </DayCellWrapper>
  )
}

export default DayCell