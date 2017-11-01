import React from 'react'
import './FunctionsPanel.css'
import BoundingRect from '../containers/BoundingRect'

import store from '../store'
import { getType } from '../lib/utils'
import Block from './Block'
import InstructionsPanel from './InstructionsPanel'
import { selectFunctionInstruction } from '../actions/game'


const FunctionBlock = ({ func: f, selectedCell: selected }) => {
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
      className={selected && index === selected.instructionId && selected.functionId === f.id ? 'selected' : ''}
      type={getType(instruction)}
      onClick={() => store.dispatch(selectFunctionInstruction({
        functionId: f.id,
        instructionId: index,
      }))}
    />
  ))

  return (
    <div className='FunctionBlock'>
      <Block className='FunctionIdBlock' type={`F${f.id}`} color='4' />
      {instructionBlocks}
    </div>
  )
}

const FunctionsPanel = ({ game }) => {
  const { selectedCell, activeInstructions, functions } = game
  const functionsBlocks = functions.map((f, index) =>
    <FunctionBlock key={index} func={f} selectedCell={selectedCell} />)

  return (
    <BoundingRect className='FunctionsPanel'>
      <InstructionsPanel selectedCell={selectedCell} activeInstructions={activeInstructions} />
      {functionsBlocks}
    </BoundingRect>
  )
}

export default FunctionsPanel
