import React from 'react'
import './Editor.css'

// import { ... } from '../components'

import store from '../store'

class Editor extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {

    return (
      <div className='EditorContainer'>
        Welcome to the Editor!
      </div>
    )
  }

}

export default Editor
