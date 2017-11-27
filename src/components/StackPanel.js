import React from 'react'
import Block from './Block'
import './StackPanel.css'
import { allInstructions } from '../constants'

const StackPanel = ({ instructions }) => {
  const instructionBlocks = instructions.map((instruction, index) => {
    const type = allInstructions[instruction % 100]
    const color = Math.floor(instruction / 100)

    return <Block key={index} type={type} color={color} />
  })

  return (
    <div className='StackPanel'>
      <div className='ScrollWrapper'>
        {instructionBlocks}
      </div>
    </div>
  )
}

export default StackPanel
