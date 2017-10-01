import React from 'react'
import './BoardPanel.css'
import _ from 'lodash'

import { colors } from '../constants'

const BoardPanel = ({ board, player }) => {
  const boardBlocks = _.flatMap(board).map((b, index) => {
    const style = {
      backgroundColor: colors[b % 4]
    }

    const playerArrowGraphic = ['←', '↑', '→', '↓'][player.direction]
    const playerBlock = (player.y * 10 + player.x === index) ?
      <div className='PlayerBlock'>{playerArrowGraphic}</div> : ''

    const starGraphic = '☆'
    const starBlock = b > 3 ?
      <div className='StarBlock'>{starGraphic}</div> : ''

    return (
      <div className='BoardBlock' key={index} style={style}>
        {playerBlock}
        {starBlock}
      </div>
    )
  })

  return (
    <div className='BoardPanel'>
      {boardBlocks}
    </div>
  )
}

export default BoardPanel
