import { createStore } from 'redux'

import reducer from './reducers'

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  // applyMiddleware(asyncDispatchMiddleware)
  // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store
