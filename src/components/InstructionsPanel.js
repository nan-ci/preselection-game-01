import React from 'react'
import './InstructionsPanel.css'

import Block from './Block'
import store from '../store'
import { contains } from '../lib/utils'
import { setFunctionInstruction } from '../actions/game'
import { allInstructions } from '../constants'

const InstructionsPanel = ({ selectedCell, activeInstructions }) => {

  if (!selectedCell) {
    return null
  }

  const { game: { functions } } = store.getState()
  const { functionId, instructionId } = selectedCell
  const selectedInstruction = functions[functionId].instructions[instructionId]

  const instructionsButtons = activeInstructions.map(key => {
    const instruction = allInstructions[key]
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
