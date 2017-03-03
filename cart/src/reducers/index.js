import { combineReducers } from 'redux'
import todos from './todos'
import price from './price'

const rootReducer = combineReducers({
  todos,
  price
})

export default rootReducer
