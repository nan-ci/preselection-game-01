import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import store, { history } from './store'

import './game'
import './index.css'

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
