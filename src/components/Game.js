import React from 'react'
import './Game.css'
import _ from 'lodash'
import store from '../store'

const colors = ['darkgrey', '#d66f6f', '#c8f771', '#8cc9f5']

const InstructionBlock = ({ instruction }) => {
  const graphics = instruction => {
    if (instruction.type === 'MOVE_FORWARD') { return '↑' }
    if (instruction.type === 'ROTATE_LEFT') { return '←' }
    if (instruction.type === 'ROTATE_RIGHT') { return '→' }
    if (instruction.type === 'PAINT_WITH_COLOR') { return `P${instruction.color}` }
    if (instruction.type === 'REPEAT_FUNCTION') { return `F${instruction.id}`}
  }

  const style = {
    backgroundColor: colors[instruction.condition]
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
      <InstructionBlock key={index} instruction={instruction} />
    )
  })

  return (
    <div className='Stack'>
      {instructionBlocks}
    </div>
  )
}

const Controls = () => {
  return (
    <div className='Controls'>
      <button onClick={
        () => store.dispatch({ type: 'TOGGLE_PAUSE' })
      }>
        {store.getState().game.paused ? 'Play' : 'Pause'}
      </button>
      <button>Step</button>
      <button>Stop</button>
      <button>Clear</button>
    </div>
  )
}

const Instructions = () => {
  return (
    <div className='Instructions'>
      <button>Forward</button>
      <button>Left</button>
      <button>Right</button>
      <button>Color 1</button>
      <button>Color 2</button>
      <button>Color 3</button>
      <button>Paint 1</button>
      <button>Paint 2</button>
      <button>Paint 3</button>
      <button>F1</button>
      <button>F2</button>
      <button>F3</button>
      <button>F4</button>
      <button>F5</button>
      <button>F6</button>
    </div>
  )
}

const FunctionBlock = ({ id, instructions }) => {
  const instructionBlocks = instructions.map((instruction, index) => {
    return (
      <InstructionBlock key={index} instruction={instruction} />
    )
  })

  return (
    <div className='FunctionBlock'>
      <div className='FunctionIdBlock'>{`F${id}`}</div>
      {instructionBlocks}
    </div>
  )
}

const Functions = ({ functions }) => {
  const functionsBlocks = functions.map((f, index) => {
    return (
      <FunctionBlock key={index} id={index} instructions={f.instructions} />
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

    const functions = [
      { instructions: [1, 2, 3, 4, 5, 6] },
      { instructions: [1, 2, 3, 4] },
    ]

    return (
      <div className='Wrapper'>
        <Stack instructions={game.instructionsStack} />
        <Board board={game.board} player={game.player} />
        <Controls />
        <Instructions />
        <Functions functions={functions} />
      </div>
    )
  }

}

export default Game
