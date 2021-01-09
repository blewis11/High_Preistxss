import {
  SET_SUBSCRIPTION_TEXT,
  SET_INFO_TEXT,
  SET_SUBSCRIBE_SUCCESS_TEXT,
  SET_CREDIT_LINKS,
  SET_BUTTONS_TEXT,
} from './types'

const INITIAL_STATE = {
  informationText: '',
  subscriptionText: '',
  successfullySubscribed: '',
  credits: {
    chau: '',
    sven: '',
    bejal: '',
    sarah: '',
    claire: '',
    portia: '',
  },
  buttons: {
    subscribe: '',
    information: '',
    instagram: '',
  },
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
    case SET_SUBSCRIBE_SUCCESS_TEXT:
      return {
        ...state,
        successfullySubscribed: action.payload,
      }
    case SET_BUTTONS_TEXT:
      return {
        ...state,
        buttons: {
          ...state.buttons,
          ...action.payload,
        },
      }
    case SET_CREDIT_LINKS:
      return {
        ...state,
        credits: {
          ...state.credits,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer
