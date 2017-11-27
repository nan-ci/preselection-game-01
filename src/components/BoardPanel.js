import React from 'react'
import Block from './Block'
import store from '../store'
import './BoardPanel.css'

const getIcon = (player, x, y, b) => {
  if (player.y === y && player.x === x) return 'player' + player.direction
  return b > 3 ? 'star' : 'blank'
}

const BoardPanel = ({ board, player }) => {
  const boardBlocks = board.map((rowData, y) =>
    <div className='row' key={y}>{
      rowData.map((b, x) =>
        <Block key={`${x}-${y}`} color={b % 4} type={getIcon(player, x, y, b)} />)
    }</div>)

  return (
    <div className='BoardPanel' onClick={() => store.dispatch({ type: 'DESELECT_FUNCTION_INSTRUCTION' })}>
      {boardBlocks}
    </div>
  )
}

export default BoardPanel
