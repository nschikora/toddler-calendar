import { useState, useRef, useEffect } from 'react'
import OpenMoji from 'openmoji/data/openmoji.json'
import styled from 'styled-components'

// [
//   {
//     "emoji": "😀",
//     "hexcode": "1F600",
//     "group": "smileys-emotion",
//     "subgroups": "face-smiling",
//     "annotation": "grinning face",
//     "tags": "face, grin",
//     "openmoji_tags": "smile, happy",
//     "openmoji_author": "Emily Jäger",
//     "openmoji_date": "2018-04-18",
//     "skintone": "",
//     "skintone_combination": "",
//     "skintone_base_emoji": "",
//     "skintone_base_hexcode": "",
//     "unicode": 1,
//     "order": 1
//   },
// ]

const EmojiImage = styled.img`
width: 4rem;
height: 4rem;
`

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
height: 100%;
`

const SearchInput = styled.input`
flex: 0 0 100%;
height: 2rem;
font-family: 'Roboto';
font-size: 1rem;
border: none;
color: #333;
outline: none;
`

const ScrollTrapRoot = styled.div`
height: calc(100% - 2.5rem);
flex: 0 0 100%;
overflow-y: scroll;
`

const ResultWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`

const ScrollTrapTarget = styled.div`
width: 1px;
height: 1px;
`

function Emoji({emoji, onEmojiClick}) {
  const handleEmojiClick = () => onEmojiClick(emoji)
  return (
    <EmojiImage 
      src={`/openmoji-svg-color/${emoji.hexcode}.svg`} 
      alt={emoji.annotation} 
      onClick={handleEmojiClick} 
    />
  )
}

function EmojiBrowser({emojiPerPage = 60, onEmojiClick = () => {}}) {
  const [searchString, setSearchString] = useState("")
  const [emojiToShow, setEmojiToShow] = useState(emojiPerPage)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const handleEmojiClick = emoji => {
    let emojiUsage
    try {
      const maybeEmojiUsageString = localStorage.getItem('emojiUsage')
      const maybeEmojiUsage = JSON.parse(maybeEmojiUsageString)
      emojiUsage = maybeEmojiUsage || {}
    } catch(err) {
      console.error(err)
    }
    emojiUsage[emoji.hexcode] = emojiUsage[emoji.hexcode] ? emojiUsage[emoji.hexcode] + 1 : 1
    try {
      localStorage.setItem('emojiUsage', JSON.stringify(emojiUsage))
    } catch (err) {
      console.error(err)
    }
    onEmojiClick(emoji)
  }

  const handleSearchInputChange = e => {
    setSearchString(e.target.value)
    setEmojiToShow(emojiPerPage)
  }

  let result
  if (searchString.trim().length > 1) {
    result = OpenMoji.filter( 
      emoji => searchString.split(" ").every(
        part => 
          emoji.group.toLowerCase().includes(part.toLowerCase()) || 
          emoji.subgroups.toLowerCase().includes(part.toLowerCase()) || 
          emoji.annotation.toLowerCase().includes(part.toLowerCase()) || 
          emoji.tags.toLowerCase().includes(part.toLowerCase())
      )
    )
  } else {
    try {
      const maybeEmojiUsageString = localStorage.getItem('emojiUsage')
      const maybeEmojiUsage = JSON.parse(maybeEmojiUsageString)
      const emojiUsage = maybeEmojiUsage || {}
      if (Object.keys(emojiUsage).length > 0) {
        const alreadyUsed = Object.entries(emojiUsage)
          .sort( 
            ([k1, v1], [k2, v2]) => v2 - v1
          )
          .map( 
            ([hexCode, usageCount]) => ({...OpenMoji.find( em => em.hexcode === hexCode ), fav: true})
          )
        result = [...alreadyUsed, ...OpenMoji]
      } else {
        result = OpenMoji
      }
    } catch(err) {
      console.error(err)
    }
  }
  const scrollTrapTarget = useRef()
  const scrollTrapRoot = useRef()
  const textField = useRef()

  useEffect( () => {
    const observer = new IntersectionObserver(
      entries => {
        if (Array.from(entries).some( entry => entry.isIntersecting )) {
          setIsIntersecting(true)
        }
      },
      {
        root: scrollTrapRoot.current,
        rootMargin: '0px',
        threshold: .1
      }
    )
    observer.observe(scrollTrapTarget.current)
    return () => observer.disconnect()
  }, [])

  useEffect( () => {
    if (isIntersecting) {
      setIsIntersecting(false)
      if (emojiToShow < result.length) {
        setEmojiToShow(emojiToShow + emojiPerPage)
      }
    }
  }, [isIntersecting, emojiToShow, result.length, emojiPerPage])

  useEffect( () => {
    textField.current.focus()
  })

  return (
     <Wrapper>
      <SearchInput 
        type={"text"} 
        value={searchString} 
        onChange={handleSearchInputChange}
        placeholder={"What are you looking for?"}
        ref={textField}
      />
       <ScrollTrapRoot 
        ref={scrollTrapRoot} 
      >
        <ResultWrapper>
          {
            result.slice(0, emojiToShow).map( 
              res => (
                <Emoji 
                  emoji={res} 
                  key={`emoji${res.hexcode}${res.fav ? 'fav' : ''}`} 
                  onEmojiClick={handleEmojiClick}
                />
              )
            )
          }
          <ScrollTrapTarget ref={scrollTrapTarget}></ScrollTrapTarget>
        </ResultWrapper>
       </ScrollTrapRoot>
     </Wrapper>
  )
}

const EmojiBrowserOverlay = styled.div`
top: 0;
left: 0;
position: absolute;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,.337);
`

const EmojiBrowserContainer = styled.div`
max-width: 100vw;
width: 30rem;
height: 100vh;
max-height: 50rem;
overflow: hidden;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
background-color: #FFF;
padding: 1rem;
`

function OverlayingEmojiBrowser({ onEmojiClick }) {
  return (
    <EmojiBrowserOverlay>
      <EmojiBrowserContainer>
        <EmojiBrowser 
          emojiPerPage={120} 
          onEmojiClick={onEmojiClick} 
        />
      </EmojiBrowserContainer>
    </EmojiBrowserOverlay>
  )
}

export default OverlayingEmojiBrowser