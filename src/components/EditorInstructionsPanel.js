import React from 'react'
import './EditorInstructionsPanel.css'

import Block from './Block'
import store from '../store'

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

const EditorInstructionsPanel = ({ activeInstructions }) => {

  const instructionsButtons = Object.keys(INSTRUCTIONS).map(key => {
    const instruction = INSTRUCTIONS[key]
    const onClick = () => store.dispatch({type: 'TOGGLE_INSTRUCTION', instructionId: key})
    const inactive = !activeInstructions.includes(key) ? 'inactive' : ''

    return <Block className={inactive} key={key} onClick={onClick} color={instruction.condition} type={key}/>
  })

  return (
    <div className='EditorInstructionsPanel' >
      <div className='InstructionWrapper'>{instructionsButtons}</div>
    </div>
  )
}

export default EditorInstructionsPanel
