import { TODAY } from "./Constants";

export const ACTIONS = {
  SELECT_DATE: "selectDate",
  SELECT_INITIAL_ALLOCATION: "selectInitialAllocation",
  SWITCH_TO_A: "switchToA",
  SWITCH_TO_B: "switchToB",
  RESET_TO_A: "resetToA",
  RESET_TO_B: "resetToB",
  UPDATE_DAY: "updateDay",
  SET_MONTH_EMOJI: "setMonthEmoji",
  RESET: "reset",
  SET_COLORS: "setColors",
};

const INITIAL_STATE = {
  sheetDate: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
  initialAllocation: "A",
  stateCompatibilityVersion: 0,
  monthEmoji: "1f47c-1f3ff",
  colors: {
    colorA: "#db2777",
    colorB: "#0f766e",
  },
};

function init(initialState) {
  const { sheetDate, initialAllocation } = initialState;

  const dayOfWeek = sheetDate.getDay();
  let mondayOffset = dayOfWeek - 1;
  if (mondayOffset === -1) {
    mondayOffset = 6;
  }
  const sheetStartDate = new Date(
    sheetDate.getFullYear(),
    sheetDate.getMonth(),
    sheetDate.getDate() - mondayOffset
  );

  const days = new Array(42)
    .fill(0)
    .map(
      (_, ix) =>
        new Date(
          sheetStartDate.getFullYear(),
          sheetStartDate.getMonth(),
          sheetStartDate.getDate() + ix
        )
    )
    .map((date) => ({
      date,
      allocation: initialAllocation,
      emoji: null,
    }));

  return {
    ...initialState,
    days,
  };
}

function loadExistingStateOrInit({ sheetDate }) {
  try {
    const storageKey = `sheet-${sheetDate.toISOString()}`;
    const stateStr = localStorage.getItem(storageKey);
    if (!stateStr || !stateStr.length) {
      return init({ ...INITIAL_STATE, sheetDate });
    }
    const state = JSON.parse(stateStr);
    if (
      !("stateCompatibilityVersion" in state) ||
      state.stateCompatibilityVersion < INITIAL_STATE.stateCompatibilityVersion
    ) {
      return init({ ...INITIAL_STATE, sheetDate });
    }

    state.days = state.days.map((day) => ({
      ...day,
      date: new Date(day.date),
    }));
    state.sheetDate = new Date(state.sheetDate);

    return state;
  } catch (err) {
    return init({ ...INITIAL_STATE, sheetDate });
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_DATE:
      return loadExistingStateOrInit({
        sheetDate: action.payload,
      });
    case ACTIONS.SELECT_INITIAL_ALLOCATION:
      return {
        ...state,
        initialAllocation: action.payload,
        days: state.days.map((day) => ({ ...day, allocation: action.payload })),
      };
    case ACTIONS.SWITCH_TO_A:
      return {
        ...state,
        days: [
          ...state.days.filter((day) => day.date < action.payload.date),
          { ...action.payload, allocation: "BtoA" },
          ...state.days
            .filter((day) => day.date > action.payload.date)
            .map((day) => ({ ...day, allocation: "A" })),
        ],
      };
    case ACTIONS.SWITCH_TO_B:
      return {
        ...state,
        days: [
          ...state.days.filter((day) => day.date < action.payload.date),
          { ...action.payload, allocation: "AtoB" },
          ...state.days
            .filter((day) => day.date > action.payload.date)
            .map((day) => ({ ...day, allocation: "B" })),
        ],
      };
    case ACTIONS.RESET_TO_A:
      return {
        ...state,
        days: [
          ...state.days.filter((day) => day.date < action.payload.date),
          ...state.days
            .filter((day) => day.date >= action.payload.date)
            .map((day) => ({ ...day, allocation: "A" })),
        ],
      };
    case ACTIONS.RESET_TO_B:
      return {
        ...state,
        days: [
          ...state.days.filter((day) => day.date < action.payload.date),
          ...state.days
            .filter((day) => day.date >= action.payload.date)
            .map((day) => ({ ...day, allocation: "B" })),
        ],
      };
    case ACTIONS.UPDATE_DAY:
      return {
        ...state,
        days: [
          ...state.days.filter((day) => day.date < action.payload.date),
          action.payload,
          ...state.days.filter((day) => day.date > action.payload.date),
        ],
      };
    case ACTIONS.SET_MONTH_EMOJI:
      return {
        ...state,
        monthEmoji: action.payload,
      };
    case ACTIONS.RESET:
      return init({ ...INITIAL_STATE, sheetDate: state.sheetDate });
    case ACTIONS.SET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function wrappedReducer(state, action) {
  const newState = reducer(state, action);
  try {
    const stateStr = JSON.stringify(newState);
    const storageKey = `sheet-${newState.sheetDate.toISOString()}`;
    localStorage.setItem(storageKey, stateStr);
  } catch (err) {
    console.error(err);
  }
  return newState;
}

export {
  INITIAL_STATE,
  loadExistingStateOrInit,
  wrappedReducer as reducer,
  TODAY,
};
