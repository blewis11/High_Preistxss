import {
  SET_INFO_TEXT,
  SET_SUBSCRIPTION_TEXT,
  SET_SUBSCRIBE_SUCCESS_TEXT,
  SET_CREDIT_LINKS,
  SET_BUTTONS_TEXT,
  SET_LINKS_SECTION,
  SET_WISDOM_SECTION,
  SET_JOY_SECTION,
  SET_HEALTH_SECTION,
  SET_GROWTH_SECTION,
  SET_EXCHANGE_SECTION,
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

export const setButtonsText = payload => {
  return {
    type: SET_BUTTONS_TEXT,
    payload,
  }
}

export const setLinksSection = payload => {
  return {
    type: SET_LINKS_SECTION,
    payload,
  }
}

export const setWisdomSection = payload => {
  return {
    type: SET_WISDOM_SECTION,
    payload,
  }
}

export const setJoySection = payload => {
  return {
    type: SET_JOY_SECTION,
    payload,
  }
}

export const setHealthSection = payload => {
  return {
    type: SET_HEALTH_SECTION,
    payload,
  }
}

export const setGrowthSection = payload => {
  return {
    type: SET_GROWTH_SECTION,
    payload,
  }
}

export const setExchangeSection = payload => {
  return {
    type: SET_EXCHANGE_SECTION,
    payload,
  }
}
