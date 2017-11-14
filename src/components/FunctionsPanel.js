import React from 'react'
import './FunctionsPanel.css'

import store from '../store'
import { getType } from '../lib/utils'
import Block from './Block'
import { selectFunctionInstruction } from '../actions/game'


const FunctionBlock = ({ id, func: f, selectedCell: selected }) => {
  f.instructions = [
    ...f.instructions,
    ...Array(f.length - f.instructions.length)
      .fill()
      .map(e => e = Object.create(null))
  ]

  const instructionBlocks = f.instructions.map((instruction, index) => (
    <Block
      key={index}
      color={instruction.condition}
      className={selected && index === selected.instructionId && selected.functionId === id ? 'selected' : ''}
      type={getType(instruction)}
      onClick={() => store.dispatch(selectFunctionInstruction({
        functionId: id,
        instructionId: index,
      }))}
    />
  ))

  return (
    <div className='FunctionBlock'>
      <Block className='FunctionIdBlock' type={`F${id}label`} color='4' />
      {instructionBlocks}
    </div>
  )
}

const FunctionsPanel = ({ selectedCell, activeInstructions, functions }) => {
  const functionsBlocks = functions.map((f, index) =>
    <FunctionBlock key={index} id={index} func={f} selectedCell={selectedCell} />)

  return (
    <div className='FunctionsPanel'>
      {functionsBlocks}
    </div>
  )
}

export default FunctionsPanel
