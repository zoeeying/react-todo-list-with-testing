import { createStore, combineReducers } from 'redux'
import { reducer as todoReducer } from '../containers/TodoList/store'

const reducer = combineReducers({
  todo: todoReducer,
})

const store = createStore(reducer)

export default store
