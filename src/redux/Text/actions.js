import { SET_INFO_TEXT, SET_SUBSCRIPTION_TEXT } from './types'

export const setInformationText = payload => {
  return {
    type: SET_INFO_TEXT,
    payload,
  }
}

export const setSubscriptionText = payload => {
  return {
    type: SET_SUBSCRIPTION_TEXT,
    payload,
  }
}
