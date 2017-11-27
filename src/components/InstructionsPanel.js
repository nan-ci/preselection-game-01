import React from 'react'
import './InstructionsPanel.css'

import Block from './Block'
import store from '../store'
import { setFunctionInstruction } from '../actions/game'
import { allInstructions } from '../constants'

const InstructionsPanel = ({ selectedCell, activeInstructions }) => {
  if (!selectedCell) return null
  const { functionId, instructionId } = selectedCell

  const instructionsButtons = activeInstructions.map(key => {
    const instruction = allInstructions[key]
    const onClick = () => store.dispatch(setFunctionInstruction({
      functionId,
      instructionId,
      instruction
    }))

    const { functions } = store.getState().game
    const selectedInstruction = functions[functionId].instructions[instructionId]
    const type = selectedInstruction % 100
    const condition = Math.floor(selectedInstruction / 100) * 100

    const selected = (instruction === type || instruction === condition) ? 'selected' : ''

    const color = Math.floor(instruction / 100)

    return <Block className={selected} key={key} onClick={onClick} color={color} type={key} />
  })

  return (
    <div className='InstructionsPanel'>
      {instructionsButtons}
    </div>
  )
}

export default InstructionsPanel
