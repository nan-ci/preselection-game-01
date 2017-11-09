import React from 'react'
import './InstructionsPanel.css'

import Block from './Block'
import store from '../store'
import { contains } from '../lib/utils'
import { setFunctionInstruction } from '../actions/game'

const INSTRUCTIONS = {
  forward: { type: 'MOVE_FORWARD' },
  left: { type: 'ROTATE_LEFT' },
  right: { type: 'ROTATE_RIGHT' },
  C1: { condition: 1 },
  C2: { condition: 2 },
  C3: { condition: 3 },
  P1: { type: 'PAINT_WITH_COLOR', color: 1 },
  P2: { type: 'PAINT_WITH_COLOR', color: 2 },
  P3: { type: 'PAINT_WITH_COLOR', color: 3 },
  F0: { type: 'REPEAT_FUNCTION', id: 0 },
  F1: { type: 'REPEAT_FUNCTION', id: 1 },
  F2: { type: 'REPEAT_FUNCTION', id: 2 },
}

const InstructionsPanel = ({ selectedCell, activeInstructions }) => {

  if (!selectedCell) {
    return null
  }

  const { game: { functions } } = store.getState()
  const { functionId, instructionId } = selectedCell
  const selectedInstruction = functions[functionId].instructions[instructionId]

  const instructionsButtons = activeInstructions.map(key => {
    const instruction = INSTRUCTIONS[key]
    const onClick = () => store.dispatch(setFunctionInstruction({
      functionId,
      instructionId,
      instruction,
    }))
    const selected = contains(instruction, selectedInstruction) ? 'selected' : ''

    return <Block className={selected} key={key} onClick={onClick} color={instruction.condition} type={key}/>
  })

  return (
    <div className='InstructionsPanel'>
      {instructionsButtons}
    </div>
  )
}

export default InstructionsPanel
