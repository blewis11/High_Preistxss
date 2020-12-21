import { TOGGLE_LIGHT } from './types'

const INITIAL_STATE = {
  show_light: true
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LIGHT:
      return {
        ...state, show_light: !state.show_light,
      }

      default: return state
  }
}

export default reducer
