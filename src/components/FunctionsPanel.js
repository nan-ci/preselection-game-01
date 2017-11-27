import React from 'react'
import './FunctionsPanel.css'
import store from '../store'
import Block from './Block'
import { selectFunctionInstruction } from '../actions/game'
import { allInstructions } from '../constants'

const FunctionBlock = ({ id, func, selectedCell: selected }) => {
  const instructionBlocks = func.instructions.map((instruction, index) => {
    const condition = Math.floor(instruction / 100)
    const type = allInstructions[instruction % 100]

    return (
      <Block
        key={index}
        color={condition}
        className={selected && index === selected.instructionId && selected.functionId === id ? 'selected' : ''}
        type={type}
        onClick={() => store.dispatch(selectFunctionInstruction({
          functionId: id,
          instructionId: index
        }))}
      />
    )
  })

  return (
    <div className='FunctionBlock'>
      <Block className='FunctionIdBlock' type={`F${id}label`} color='4' />
      {instructionBlocks}
    </div>
  )
}

const FunctionsPanel = ({ selectedCell, functions }) => {
  const functionsBlocks = functions.map((f, index) =>
    <FunctionBlock key={index} id={index} func={f} selectedCell={selectedCell} />)

  return (
    <div className='FunctionsPanel'>
      {functionsBlocks}
    </div>
  )
}

export default FunctionsPanel
