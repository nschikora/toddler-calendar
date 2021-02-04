import styled from 'styled-components'
import SwitchIcon from './Switch.png'
import EmojiIcon from './Emoji.png'

const DayCellButtonWrapper = styled.button`
width: 2rem;
height: 2rem;
border-width: 0;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0);
color: #333;
&:hover {
  background-color: rgba(255, 255, 255, .2);
  color: #333;
}
&:active {
  background-color: rgba(255, 255, 255, .4);
  color: #333;
}
`

const DayCellButtonImage = styled.img`
width: 1rem;
height: 1rem;
`

const DayCellButtonText = styled.div`
font-family: 'Roboto';
font-size: 1rem;
line-height: 1rem;
font-weight: 900;
`

function DayCellButton(props) {
  const { icon, text, onClick } = props
  return (
    <DayCellButtonWrapper onClick={onClick}>
      {
        icon &&
        <DayCellButtonImage
          alt={`Icon of an ${icon}`}
          src={icon === 'Emoji' ? EmojiIcon : SwitchIcon}
        />
      }
      {
        text &&
        <DayCellButtonText>
          { text }
        </DayCellButtonText>
      }
    </DayCellButtonWrapper>
  )
}

export default DayCellButton