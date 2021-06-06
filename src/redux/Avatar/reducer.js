import { SET_SELECTED_AVATAR, AVATAR_SELECTED, SET_LOADING_SECOND_PAGE } from './types'

const INITIAL_STATE = {
  selectedAvatar: 'none',
  avatarSelected: false,
  loadingSecondPage: true,
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
        avatarSelected: action.payload,
      }

    case SET_LOADING_SECOND_PAGE:
      return {
        ...state,
        loadingSecondPage: action.payload,
      }

    default:
      return state
  }
}

export default reducer
