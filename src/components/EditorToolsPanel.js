import React from 'react'
import './EditorToolsPanel.css'

import store from '../store'

const EditorToolsPanel = ({ selectedCell, activeInstructions }) => {

  return (
    <div className='EditorToolsPanel'>
      <button onClick={() => store.dispatch({type: 'SAVE_LEVEL'})}>save</button>
      <button onClick={() => store.dispatch({type: 'CLEAR_BOARD'})}>Clear board</button>
      <button onClick={() => store.dispatch({type: 'DESELECT_ALL'})}>Deselect All</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 0})}>Paint 0</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 1})}>Paint 1</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 2})}>Paint 2</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 3})}>Paint 3</button>
      <button onClick={() => store.dispatch({type: 'SET_PLAYER'})}>Player</button>
      <button onClick={() => store.dispatch({type: 'SET_STAR'})}>Star</button>
    </div>
  )
}

export default EditorToolsPanel
