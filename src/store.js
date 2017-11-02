import { createStore, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import reducer from './reducers'

export const history = createHistory()

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      loggerMiddleware,
      routerMiddleware(history),
    )
  )
)

export default store
