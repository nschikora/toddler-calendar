import { TODAY } from './Constants'

const initialState = {
  sheetDate: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
  initialAllocation: 'A'
}

function init(initialState) {
  const { sheetDate, initialAllocation } = initialState
  const dayOfWeek = sheetDate.getDay()
  let mondayOffset = dayOfWeek - 1
  if (mondayOffset === -1) {
    mondayOffset = 6
  }
  const sheetStartDate = new Date(sheetDate.getFullYear(), sheetDate.getMonth(), sheetDate.getDate() - mondayOffset)

  const days = new Array(42).fill(0).map(
    (_, ix) => (
      new Date(sheetStartDate.getFullYear(), sheetStartDate.getMonth(), sheetStartDate.getDate() + ix)
    )
  ).map(date => (
    {
      date,
      allocation: initialAllocation,
      emoji: null
    }
  ))

  return {
    ...initialState,
    days
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'selectDate':
      return init(
        {
          initialAllocation: state.initialAllocation,
          sheetDate: action.payload
        }
      )
    case 'selectInitialAllocation':
      return init(
        {
          initialAllocation: action.payload,
          sheetDate: state.sheetDate
        }
      )
    case 'switchToA':
      return {
        ...state,
        days: [
          ...state.days.filter(day => day.date < action.payload.date),
          { ...action.payload, allocation: 'BtoA' },
          ...state.days.filter(day => day.date > action.payload.date).map(day => ({ ...day, allocation: 'A' }))
        ]
      }
    case 'switchToB':
      return {
        ...state,
        days: [
          ...state.days.filter(day => day.date < action.payload.date),
          { ...action.payload, allocation: 'AtoB' },
          ...state.days.filter(day => day.date > action.payload.date).map(day => ({ ...day, allocation: 'B' }))
        ]
      }
    case 'resetToA':
      return {
        ...state,
        days: [
          ...state.days.filter(day => day.date < action.payload.date),
          ...state.days.filter(day => day.date >= action.payload.date).map(day => ({ ...day, allocation: 'A' }))
        ]
      }
    case 'resetToB':
      return {
        ...state,
        days: [
          ...state.days.filter(day => day.date < action.payload.date),
          ...state.days.filter(day => day.date >= action.payload.date).map(day => ({ ...day, allocation: 'B' }))
        ]
      }
    case 'updateDay':
      return {
        ...state,
        days: [
          ...state.days.filter(day => day.date < action.payload.date),
          action.payload,
          ...state.days.filter(day => day.date > action.payload.date)
        ]
      }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}

export {
  initialState,
  init,
  reducer,
  TODAY
}