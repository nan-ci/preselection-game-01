import React from 'react'
import './InstructionsPanel.css'

import store from '../store'
import { setFunctionInstruction } from '../actions/game'
import { colors } from '../constants'

const INSTRUCTIONS = [
  { text: '↑', style: {}, instruction: { type: 'MOVE_FORWARD' } },
  { text: '←', style: {}, instruction: { type: 'ROTATE_LEFT' } },
  { text: '→', style: {}, instruction: { type: 'ROTATE_RIGHT' } },
  { text: '', style: { backgroundColor: colors[0] }, instruction: { condition: 0 } },
  { text: '', style: { backgroundColor: colors[1] }, instruction: { condition: 1 } },
  { text: '', style: { backgroundColor: colors[2] }, instruction: { condition: 2 } },
  { text: '', style: { backgroundColor: colors[3] }, instruction: { condition: 3 } },
  { text: 'P1', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 1 } },
  { text: 'P2', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 2 } },
  { text: 'P3', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 3 } },
  { text: 'F0', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 0 } },
  { text: 'F1', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 1 } },
  { text: 'F2', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 2 } },
  { text: 'F3', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 3 } },
  { text: 'F4', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 4 } },
  { text: 'F5', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 5 } },
]

const InstructionsPanel = ({ selectedCell, activeInstructions }) => {
  const instructions = INSTRUCTIONS.filter((i, index) => activeInstructions[index] === 1)
  const instructionsButtons = instructions.map((i, index) => {
    const onClick = () => selectedCell && store.dispatch(setFunctionInstruction({
      functionId: selectedCell.functionId,
      instructionId: selectedCell.instructionId,
      instruction: i.instruction
    }))

    return (
      <div className='InstructionBlock' style={i.style} key={index} onClick={onClick}>
        <div className='InstructionBlockIcon'>
          {i.text}
        </div>
      </div>
    )
  })

  return (
    <div className='InstructionsPanel'>
      {instructionsButtons}
    </div>
  )
}

export default InstructionsPanel
