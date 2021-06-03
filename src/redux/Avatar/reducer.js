import { SET_SELECTED_AVATAR } from './types'

const INITIAL_STATE = {
  selectedAvatar: 'none',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_AVATAR:
      return {
        ...state,
        selectedAvatar: action.payload,
      }

    default:
      return state
  }
}

export default reducer
