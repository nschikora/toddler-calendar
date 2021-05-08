import { TODAY } from './Constants'

const INITIAL_STATE = {
  sheetDate: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
  initialAllocation: 'A',
  stateCompatibilityVersion: 0,
  monthEmoji: '1F47C-1F3FF'
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

function loadExistingStateOrInit({sheetDate}) {
  try {
    const storageKey = `sheet-${sheetDate.toISOString()}`;
    const stateStr = localStorage.getItem(storageKey);
    if (!stateStr || !stateStr.length) {
      return init({...INITIAL_STATE, sheetDate});
    }
    const state = JSON.parse(stateStr);
    if (!('stateCompatibilityVersion' in state) || state.stateCompatibilityVersion < INITIAL_STATE.stateCompatibilityVersion) {
      return init({...INITIAL_STATE, sheetDate});
    }

    state.days = state.days.map(day => ({...day, date: new Date(day.date)}));
    state.sheetDate = new Date(state.sheetDate);

    return state;
  } catch (err) {
    return init({...INITIAL_STATE, sheetDate});
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'selectDate':
      return loadExistingStateOrInit(
        {
          sheetDate: action.payload
        }
      )
    case 'selectInitialAllocation':
      return {
        ...state,
        initialAllocation: action.payload,
        days: state.days.map(
          day => ({...day, allocation: action.payload})
        )
      }
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
    case 'setMonthEmoji':
      return {
        ...state,
        monthEmoji: action.payload,
      }
    case 'reset':
      return init({...INITIAL_STATE, sheetDate: state.sheetDate})
    default:
      throw new Error()
  }
}

function wrappedReducer(state, action) {
  const newState = reducer(state, action);
  try {
    const stateStr = JSON.stringify(newState);
    const storageKey = `sheet-${newState.sheetDate.toISOString()}`;
    localStorage.setItem(storageKey, stateStr);
  } catch (err) {
    console.error(err)
  }
  return newState;
}

export {
  INITIAL_STATE,
  loadExistingStateOrInit,
  wrappedReducer as reducer,
  TODAY
}