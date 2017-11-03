import React from 'react'
import './EditorToolsPanel.css'

import store from '../store'

const EditorToolsPanel = ({ selectedCell, activeInstructions }) => {

  return (
    <div className='EditorToolsPanel'>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 0})}>Grey</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 1})}>Green</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 2})}>Red</button>
      <button onClick={() => store.dispatch({type: 'PAINT', color: 3})}>Blue</button>
      <button onClick={() => store.dispatch({type: 'SET_PLAYER'})}>Player</button>
      <button onClick={() => store.dispatch({type: 'SET_STAR'})}>Star</button>
      <button onClick={() => store.dispatch({type: 'DESELECT_ALL'})}>Deselect</button>
      <button onClick={() => store.dispatch({type: 'CLEAR_BOARD'})}>Clear</button>
      <button onClick={() => store.dispatch({type: 'SAVE_LEVEL'})}>save</button>
    </div>
  )
}

export default EditorToolsPanel
