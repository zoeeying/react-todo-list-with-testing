/* eslint-disable import/no-anonymous-default-export */
import { CHANGE_INUT_VALUE } from './constants'

const initialState = {
  inputValue: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INUT_VALUE:
      return { inputValue: action.value }
    default:
      return state
  }
}
