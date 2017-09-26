import React from 'react'
import './Game.css'
import _ from 'lodash'
import store from '../store'
import {
  selectFunctionInstruction, setFunctionInstruction,
  play, pause, restart, step, clear
} from '../actions/game'

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
    <div className='InstructionBlock' style={style}>
      <div className='InstructionBlockIcon'>
        {graphics(instruction)}
      </div>
    </div>
  )
}

const Stack = ({ instructions }) => {
  const instructionBlocks = instructions.map((instruction, index) => {
    return (
      <StackInstructionBlock key={index} instruction={instruction} />
    )
  })

  return (
    <div className='Stack'>
      {instructionBlocks}
    </div>
  )
}

const Controls = () => {
  const game = store.getState().game

  return (
    <div className='Controls'>
      <button onClick={() => store.dispatch(game.paused ? play() : pause())}>
        {game.paused ? 'Play' : 'Pause'}
      </button>
      <button onClick={() => !game.ended && store.dispatch(step())}>Step</button>
      <button onClick={() => store.dispatch(restart())}>Restart</button>
      <button onClick={() => store.dispatch(clear())}>Clear</button>
    </div>
  )
}

const INSTRUCTIONS = [
  { text: '↑', style: {}, instruction: { type: 'MOVE_FORWARD' } },
  { text: '←', style: {}, instruction: { type: 'ROTATE_LEFT' } },
  { text: '→', style: {}, instruction: { type: 'ROTATE_RIGHT' } },
  { text: '', style: { backgroundColor: colors[0] }, instruction: { condition: 0 } },
  { text: '', style: { backgroundColor: colors[1] }, instruction: { condition: 1 } },
  { text: '', style: { backgroundColor: colors[2] }, instruction: { condition: 2 } },
  { text: '', style: { backgroundColor: colors[3] }, instruction: { condition: 3 } },
  { text: 'P1', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 1 } },
  { text: 'P2', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 2 } },
  { text: 'P3', style: {}, instruction: { type: 'PAINT_WITH_COLOR', color: 3 } },
  { text: 'F0', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 0 } },
  { text: 'F1', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 1 } },
  { text: 'F2', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 2 } },
  { text: 'F3', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 3 } },
  { text: 'F4', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 4 } },
  { text: 'F5', style: {}, instruction: { type: 'REPEAT_FUNCTION', id: 5 } },
]

const InstructionsPanel = ({ selectedCell, activeInstructions }) => {
  const instructions = INSTRUCTIONS.filter((i, index) => activeInstructions[index] === 1)
  const instructionsButtons = instructions.map((i, index) => {
    const onClick = () => selectedCell && store.dispatch(setFunctionInstruction({
      functionId: selectedCell.functionId,
      instructionId: selectedCell.instructionId,
      instruction: i.instruction
    }))

    return (
      <div className='InstructionBlock' style={i.style} key={index} onClick={onClick}>
        <div className='InstructionBlockIcon'>
          {i.text}
        </div>
      </div>
    )
  })

  return (
    <div className='InstructionsPanel'>
      {instructionsButtons}
    </div>
  )
}


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

const Functions = ({ functions }) => {
  const functionsBlocks = functions.map((f, index) => {
    return (
      <FunctionBlock key={index} func={f} />
    )
  })

  return (
    <div className='Functions'>
      {functionsBlocks}
    </div>
  )
}

const Board = ({ board, player }) => {
  const boardBlocks = _.flatMap(board).map((b, index) => {
    const style = {
      backgroundColor: colors[b % 4]
    }

    const playerArrowGraphic = ['←', '↑', '→', '↓'][player.direction]
    const playerBlock = (player.y * 10 + player.x === index) ?
            <div className='PlayerBlock'>{playerArrowGraphic}</div> : ''

    const starGraphic = '☆'
    const starBlock = b > 3 ?
      <div className='StarBlock'>{starGraphic}</div> : ''

    return (
      <div className='BoardBlock' key={index} style={style}>
        {playerBlock}
        {starBlock}
      </div>
    )
  })

  return (
    <div className='Board'>
      {boardBlocks}
    </div>
  )
}

class Game extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const game = store.getState().game

    return (
      <div className='Wrapper'>
        <Stack instructions={game.instructionsStack} />
        <Board board={game.board} player={game.player} />
        <Controls />
        <InstructionsPanel selectedCell={game.selectedCell} activeInstructions={game.activeInstructions} />
        <Functions functions={game.functions} />
      </div>
    )
  }

}

export default Game
