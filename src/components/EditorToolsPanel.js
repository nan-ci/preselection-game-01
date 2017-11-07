import React from 'react'
import './EditorToolsPanel.css'

import store from '../store'

const EditorToolsPanel = () => {

  return (
    <div className='EditorToolsPanel'>
      <div>
        <button onClick={() => store.dispatch({type: 'PAINT', color: 2})}>R</button>
        <button onClick={() => store.dispatch({type: 'PAINT', color: 1})}>G</button>
        <button onClick={() => store.dispatch({type: 'PAINT', color: 3})}>B</button>
        <button onClick={() => store.dispatch({type: 'PAINT', color: 0})}>x</button>
      </div>
      <div>
        <button onClick={() => store.dispatch({type: 'SET_PLAYER'})}>Player</button>
        <button onClick={() => store.dispatch({type: 'SET_STAR'})}>Star</button>
      </div>
      <div>
        <button onClick={() => store.dispatch({type: 'DESELECT_ALL'})}>Deselect</button>
        <button onClick={() => store.dispatch({type: 'CLEAR_BOARD'})}>Clear</button>
        <button onClick={() => store.dispatch({type: 'RESET'})}>Reset</button>
        <button onClick={() => store.dispatch({type: 'SAVE_LEVEL'})}>Save</button>
      </div>
    </div>
  )
}

export default EditorToolsPanel
