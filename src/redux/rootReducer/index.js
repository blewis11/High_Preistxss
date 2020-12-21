import { combineReducers } from 'redux'

import lightReducer from '../Counter/reducer'

const rootReducer = combineReducers({
  light: lightReducer,
})

export default rootReducer  
