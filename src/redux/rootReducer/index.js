import { combineReducers } from 'redux'

import textReducer from '../Text/reducer'

const rootReducer = combineReducers({
  text: textReducer,
})

export default rootReducer
