import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import reducer from './reducers'

export const history = createHistory()

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    thunk,
    loggerMiddleware,
    routerMiddleware(history),
  ),
  // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store
