import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { Game } from './components'

import registerServiceWorker from './registerServiceWorker'
import store from './store'
import './game'

ReactDOM.render((
  <Provider store={store}>
    <Game />
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
