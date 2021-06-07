import {
  SET_SUBSCRIPTION_TEXT,
  SET_INFO_TEXT,
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
  links: {
    buttons: {
      instagram: '',
      youtube: '',
      patreon: '',
      onlineShop: '',
    },
    links: {
      instagram: '',
      youtube: '',
      patreon: '',
      onlineShop: '',
    },
  },
  secondScene: {
    wisdom: {
      text: '',
      buttons: {
        button1: '',
        button2: '',
        button3: '',
      },
      links: {
        button1: '',
        button2: '',
        button3: '',
      },
    },
    joy: {
      text: '',
      buttons: {
        button1: '',
      },
      links: {
        button1: '',
      },
    },
    health: {
      text: '',
      links: {
        soundcloud: '',
      },
    },
    growth: {
      text: '',
      links: {
        button1: '',
      },
      buttons: {
        button1: '',
      },
    },
    exchange: {
      text: '',
      links: {
        button1: '',
      },
      buttons: {
        button1: '',
      },
    },
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
    case SET_LINKS_SECTION:
      return {
        ...state,
        links: {
          ...action.payload,
        },
      }
    case SET_WISDOM_SECTION:
      return {
        ...state,
        secondScene: {
          ...state.secondScene,
          wisdom: action.payload,
        },
      }
    case SET_JOY_SECTION:
      return {
        ...state,
        secondScene: {
          ...state.secondScene,
          joy: action.payload,
        },
      }
    case SET_HEALTH_SECTION:
      return {
        ...state,
        secondScene: {
          ...state.secondScene,
          health: action.payload,
        },
      }
    case SET_GROWTH_SECTION:
      return {
        ...state,
        secondScene: {
          ...state.secondScene,
          growth: action.payload,
        },
      }
    case SET_EXCHANGE_SECTION:
      return {
        ...state,
        secondScene: {
          ...state.secondScene,
          exchange: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer
