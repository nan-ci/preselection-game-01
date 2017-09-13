import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
  // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store
