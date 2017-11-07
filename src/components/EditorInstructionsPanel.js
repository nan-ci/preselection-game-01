import React from 'react'
import './EditorInstructionsPanel.css'
import Block from './Block'
import store from '../store'
import { allInstructions } from '../constants'

const EditorInstructionsPanel = ({ activeInstructions, functions }) => {

  const instructionsButtons = Object.keys(allInstructions).map(key => {
    const instruction = allInstructions[key]
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
