import { combineReducers } from 'redux'

import textReducer from '../Text/reducer'
import generalStateReduxer from '../State/reducer'
import avatarReducer from '../Avatar/reducer'

const rootReducer = combineReducers({
  text: textReducer,
  state: generalStateReduxer,
  avatar: avatarReducer,
})

export default rootReducer
