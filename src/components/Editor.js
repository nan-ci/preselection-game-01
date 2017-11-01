import React from 'react'
import './Editor.css'

import {
  EditorBoardPanel,
  EditorToolsPanel,
  InstructionsPanel,
} from '../components'

import store from '../store'

class Editor extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {

    const state = store.getState().editor

    return (
      <div className='EditorContainer'>
        Welcome to the Editor!
        <EditorBoardPanel board={state.board} player={state.player} selectedCells={state.selectedCells} />
        <EditorToolsPanel />
        <InstructionsPanel selectedCell={state.selectedCell} activeInstructions={state.activeInstructions} />
      </div>
    )
  }

}

export default Editor
