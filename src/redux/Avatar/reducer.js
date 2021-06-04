import { SET_SELECTED_AVATAR, AVATAR_SELECTED } from './types'

const INITIAL_STATE = {
  selectedAvatar: 'none',
  avatarSelected: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_AVATAR:
      return {
        ...state,
        selectedAvatar: action.payload,
      }

    case AVATAR_SELECTED:
      return {
        ...state,
        avatarSelected: action.payload
      }

    default:
      return state
  }
}

export default reducer
