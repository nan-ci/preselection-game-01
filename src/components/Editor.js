import React from 'react'
import './Editor.css'

import {
  EditorBoardPanel,
  EditorToolsPanel,
  EditorInstructionsPanel,
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
        <EditorBoardPanel board={state.board} player={state.player} selectedCellsIndexes={state.selectedCellsIndexes} />
        <EditorToolsPanel />
        <EditorInstructionsPanel activeInstructions={state.activeInstructions} />
      </div>
    )
  }

}

export default Editor
