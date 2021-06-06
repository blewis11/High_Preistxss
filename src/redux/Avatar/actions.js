import { SET_SELECTED_AVATAR, AVATAR_SELECTED, SET_LOADING } from './types'

export const setSelectedAvatar = payload => {
  return {
    type: SET_SELECTED_AVATAR,
    payload,
  }
}

export const setAvatarSelected = payload => {
  return {
    type: AVATAR_SELECTED,
    payload,
  }
}

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload,
  }
}
