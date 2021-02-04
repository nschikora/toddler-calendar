import styled, { css } from 'styled-components'

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

const DayCellButtonImage = styled.div`
width: 1rem;
height: 1rem;
background-size: 150%;
background-position-x: 50%;
background-position-y: 50%;
background-repeat: no-repeat;
${
    props => props.icon === 'Emoji' &&
    css`
    background-image: url(/openmoji-svg-color/1F60A.svg);
    `
}
${
    props => props.icon === 'Switch' &&
    css`
    background-image: url(/openmoji-svg-color/1F504.svg);
    `
}
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
          icon={icon}
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