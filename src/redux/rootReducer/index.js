import { combineReducers } from 'redux'

import textReducer from '../Text/reducer'
import generalStateReduxer from '../State/reducer'

const rootReducer = combineReducers({
  text: textReducer,
  state: generalStateReduxer,
})

export default rootReducer
