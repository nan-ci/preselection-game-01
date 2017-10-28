import React from 'react'
import { getType } from '../lib/utils'
import Block from './Block'
import './StackPanel.css'

const StackInstructionBlock = (instruction, key) => <Block
  key={key}
  color={instruction.condition}
  type={console.log(instruction) || getType(instruction)}
/>

const StackPanel = ({ instructions }) => (
  <div className='StackPanel'>
    <div className='ScrollWrapper'>
      {instructions.map(StackInstructionBlock)}
    </div>
  </div>
)

export default StackPanel
