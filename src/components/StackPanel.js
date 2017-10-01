import React from 'react'
import './StackPanel.css'

import { colors } from '../constants'

const StackInstructionBlock = ({ instruction }) => {
  const graphics = instruction => {
    if (instruction.type === 'MOVE_FORWARD') { return '↑' }
    if (instruction.type === 'ROTATE_LEFT') { return '←' }
    if (instruction.type === 'ROTATE_RIGHT') { return '→' }
    if (instruction.type === 'PAINT_WITH_COLOR') { return `P${instruction.color}` }
    if (instruction.type === 'REPEAT_FUNCTION') { return `F${instruction.id}`}
  }

  const style = {
    backgroundColor: colors[instruction.condition],
  }

  return (
    <div className='StackInstructionBlock' style={style}>
      <div className='StackInstructionBlockIcon'>
        {graphics(instruction)}
      </div>
    </div>
  )
}

const StackPanel = ({ instructions }) => {
  const instructionBlocks = instructions.map((instruction, index) => (
    <StackInstructionBlock key={index} instruction={instruction} />
  ))

  return (
    <div className='StackPanel'>
      {instructionBlocks}
    </div>
  )
}

export default StackPanel
