import { ADD_SUM,CUT_SUM } from '../constants/ActionTypes'

export default function price(state = 0, action) {
  switch (action.type) {
    case ADD_SUM:
    return state + parseFloat(action.price)
    case CUT_SUM:
    return state - parseFloat(action.price)
    default:
      return state
  }
}
