import { SET_SUBSCRIPTION_TEXT, SET_INFO_TEXT } from './types'

const INITIAL_STATE = {
  informationText: '',
  subscriptionText: '',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INFO_TEXT:
      return {
        ...state,
        informationText: action.payload,
      }
    case SET_SUBSCRIPTION_TEXT:
      return {
        ...state,
        subscriptionText: action.payload,
      }

    default:
      return state
  }
}

export default reducer
