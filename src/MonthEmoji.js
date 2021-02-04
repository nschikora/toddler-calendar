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
`

function MonthEmoji() {
  const [emoji, setEmoji] = useState('1F47C-1F3FF')
  const [presentingEmojiBrowser, setPresentingEmojiBrowser] = useState(false)

  const handleEmojiClick = () => {
    console.log('klick')
    setPresentingEmojiBrowser(!presentingEmojiBrowser)
  }
  const handleEmojiSelected = (selectedEmoji) => {
    console.log('click')
    setPresentingEmojiBrowser(false)
    setEmoji(selectedEmoji.hexcode)
  }

  return (
    <>
      <MonthEmojiImage
        emoji={emoji}
        onClick={handleEmojiClick}
      >
      </MonthEmojiImage>
      {
        presentingEmojiBrowser &&
        <OverlayingEmojiBrowser onEmojiClick={handleEmojiSelected} />
      }
    </>
  )
}

export default MonthEmoji