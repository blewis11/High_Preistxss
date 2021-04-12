import { SET_LOADING, FADE_TO_BLACK, MOUSE_OVER_PORTAL, ENLARGE_PORTAL } from './types'

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload,
  }
}

export const setFadeToBlack = payload => {
  return {
    type: FADE_TO_BLACK,
  }
}

export const setMouseOverPortal = payload => {
  return {
    type: MOUSE_OVER_PORTAL,
    payload,
  }
}

export const setEnlargePortal = payload => {
  return {
    type: ENLARGE_PORTAL,
    payload
  }
}
