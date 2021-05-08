import { useState } from 'react'
import styled, { css } from 'styled-components'
import OverlayingEmojiBrowser from './EmojiBrowser'

const MonthEmojiImage = styled.div`
width: 4.5rem;
height: 4.5rem;
${
  props => props.emoji &&
  css`
  background-image: url(/openmoji-svg-color/${props.emoji}.svg);
  `
}
border-bottom: 2px dotted #FFF;
:hover {
  border-bottom: 2px dotted #333;
}
`

function MonthEmoji(props) {
  const { monthEmoji, dispatch } = props
  const [presentingEmojiBrowser, setPresentingEmojiBrowser] = useState(false)

  const handleEmojiClick = () => {
    setPresentingEmojiBrowser(!presentingEmojiBrowser)
  }
  const handleEmojiSelected = (selectedEmoji) => {
    setPresentingEmojiBrowser(false)
    dispatch({type: 'setMonthEmoji', payload: selectedEmoji.hexcode})
  }

  return (
    <>
      <MonthEmojiImage
        emoji={monthEmoji}
        onClick={handleEmojiClick}
      >
      </MonthEmojiImage>
      {
        presentingEmojiBrowser &&
        <OverlayingEmojiBrowser 
          onEmojiClick={handleEmojiSelected} 
          onClose={() => setPresentingEmojiBrowser(false)}
        />
      }
    </>
  )
}

export default MonthEmoji