import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Game } from '../components'
import { Editor } from '../components'

import './App.css'

class App extends Component {
  render() {
    return (
      <div id="App">
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/" component={Game} />
      </div>
    )
  }
}

export default App
