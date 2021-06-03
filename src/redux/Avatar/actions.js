import { SET_SELECTED_AVATAR } from './types'

export const setSelectedAvatar = payload => {
  return {
    type: SET_SELECTED_AVATAR,
    payload,
  }
}
