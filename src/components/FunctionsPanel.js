import React from 'react'
import './FunctionsPanel.css'

import store from '../store'
import { colors } from '../constants'
import { selectFunctionInstruction } from '../actions/game'

const FunctionInstructionBlock = ({ instruction, onClick }) => {
  const graphics = instruction => {
    if (instruction.type === 'MOVE_FORWARD') { return '↑' }
    if (instruction.type === 'ROTATE_LEFT') { return '←' }
    if (instruction.type === 'ROTATE_RIGHT') { return '→' }
    if (instruction.type === 'PAINT_WITH_COLOR') { return `P${instruction.color}` }
    if (instruction.type === 'REPEAT_FUNCTION') { return `F${instruction.id}`}
  }

  const style = {
    backgroundColor: colors[instruction.condition || 0],
    boxShadow: instruction.selected ? '0px 0px 0px 1px black inset' : 'none'
  }

  return (
    <div className='InstructionBlock' onClick={onClick} style={style}>
      <div className='InstructionBlockIcon'>
        {graphics(instruction)}
      </div>
    </div>
  )
}

const FunctionBlock = ({ func: f }) => {
  f.instructions = [
    ...f.instructions,
    ...new Array(f.length - f.instructions.length).fill().map(e => e = Object.create(null))
  ]

  const instructionBlocks = f.instructions.map((instruction, index) => {
    return (
      <FunctionInstructionBlock
        key={index}
        instruction={instruction}
        onClick={() => store.dispatch(selectFunctionInstruction({
          functionId: f.id,
          instructionId: index
        }))}
      />
    )
  })

  return (
    <div className='FunctionBlock'>
      <div className='FunctionIdBlock'>{`F${f.id}`}</div>
      {instructionBlocks}
    </div>
  )
}

const FunctionsPanel = ({ functions }) => {
  const functionsBlocks = functions.map((f, index) => {
    return (
      <FunctionBlock key={index} func={f} />
    )
  })

  return (
    <div className='FunctionsPanel'>
      {functionsBlocks}
    </div>
  )
}

export default FunctionsPanel
