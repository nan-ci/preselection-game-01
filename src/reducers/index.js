import { combineReducers } from 'redux'

/* Reducers */
import { routerReducer } from 'react-router-redux'
import game from './game'
import editor from './editor'

export default combineReducers({
  routing: routerReducer,
  game,
  editor,
})
