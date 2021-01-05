import { SET_LOADING } from './types'

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload,
  }
}
