import { SET_LOADING, MOUSE_OVER_PORTAL, FADE_TO_BLACK, ENLARGE_PORTAL, SET_SCENE_NUMBER } from './types'

const INITIAL_STATE = {
  isLoading: true,
  mouseOverPortal: false,
  fadeToBlack: false,
  enlargePortal: false,
  sceneNumber: 2
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case MOUSE_OVER_PORTAL:
      return {
        ...state,
        mouseOverPortal: action.payload,
      }

    case FADE_TO_BLACK:
      return {
        ...state,
        fadeToBlack: true,
      }

    case ENLARGE_PORTAL:
      return {
        ...state,
        enlargePortal: action.payload,
      }

    case SET_SCENE_NUMBER:
      return {
        ...state,
        sceneNumber: action.payload
      }

    default:
      return state
  }
}

export default reducer
