import { SET_LOADING } from './types'

const INITIAL_STATE = {
  isLoading: true,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}

export default reducer
