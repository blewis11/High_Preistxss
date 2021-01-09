import {
  SET_INFO_TEXT,
  SET_SUBSCRIPTION_TEXT,
  SET_SUBSCRIBE_SUCCESS_TEXT,
  SET_CREDIT_LINKS,
} from './types'

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

export const setSuccessfullySubscribedText = payload => {
  return {
    type: SET_SUBSCRIBE_SUCCESS_TEXT,
    payload,
  }
}

export const setCreditLinks = payload => {
  return {
    type: SET_CREDIT_LINKS,
    payload,
  }
}
