import React from 'react'
import Block from './Block'
import './BoardPanel.css'

import store from '../store'

const getIcon = (player, x, y, b) => {
  if (player.y === y && player.x === x) return 'player'+ player.direction
  return b > 3 ? 'star' : 'blank'
}

const selectCellOnMouseDown = index => {
  return event => {
    store.dispatch({type: 'START_SELECTION', index})
    store.dispatch({type: 'TOGGLE_CELL', index})
  }
}

const selectCellOnMouseOver = index => {
  return event => {
    const state = store.getState().editor
    if (state.isSelecting) {
      store.dispatch({type: 'TOGGLE_CELL', index})
    }
  }
}

const EditorBoardPanel = ({ isEditorMode, board, player, selectedCellsIndexes }) => {

  const boardBlocks = board.map((rowData, y) =>
    <div className='row' key={y}>{
      rowData.map((b, x) => {
        const index = y * 10 + x

        return <Block
          key={`${x}-${y}`}
          color={b % 4}
          type={getIcon(player, x, y, b)}
          onMouseDown={selectCellOnMouseDown(index)}
          onMouseOver={selectCellOnMouseOver(index)}
          className={selectedCellsIndexes.indexOf(index) !== -1 ? 'selected' : ''}
          />
      })
    }</div>)

  return (
    <div className='BoardPanel' onClick={() => store.dispatch({ type: 'DESELECT_FUNCTION_INSTRUCTION' })}>
      {boardBlocks}
    </div>
  )
}

// move to componentDidMount
document.documentElement.addEventListener('mouseup', () => {
  store.dispatch({type: 'STOP_SELECTION'})
})

export default EditorBoardPanel
