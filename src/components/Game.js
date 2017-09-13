import React from 'react'
import './Game.css'
import _ from 'lodash'
import store from '../store'

const Stack = ({ actions }) => {
  const actionBlocks = actions.map((action, index) => {
    return (
      <ActionBlock key={index} action={action} />
    )
  })

  return (
    <div className='Stack'>
      {actionBlocks}
    </div>
  )
}

const Controls = () => {
  return (
    <div className='Controls'>
      <button>Play</button>
      <button>Pause</button>
      <button>Step</button>
      <button>Stop</button>
      <button>Clear</button>
    </div>
  )
}

const Actions = () => {
  return (
    <div className='Actions'>
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

const ActionBlock = ({ action }) => {
  return (
    <div className='ActionBlock'>
      {action}
    </div>
  )
}

const FunctionBlock = ({ id, actions }) => {
  const actionBlocks = actions.map((action, index) => {
    return (
      <ActionBlock key={index} action={action} />
    )
  })

  return (
    <div className='FunctionBlock'>
      <div className='FunctionIdBlock'>{`F${id}`}</div>
      {actionBlocks}
    </div>
  )
}

const Functions = ({ functions }) => {
  const functionsBlocks = functions.map((f, index) => {
    return (
      <FunctionBlock key={index} id={index} actions={f.actions} />
    )
  })

  return (
    <div className='Functions'>
      {functionsBlocks}
    </div>
  )
}

const Board = ({ board, player }) => {
  const colors = ['darkgrey', '#d66f6f', '#c8f771', '#8cc9f5']

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
    const state = store.getState()
    console.log('state', state)

    const board = state.game.board
    const player = state.game.player

    const stackActions = [1, 2, 4, 4, 2, 1]
    const functions = [
      { actions: [1, 2, 3, 4, 5, 6] },
      { actions: [1, 2, 3, 4] },
    ]

    return (
      <div className='Wrapper'>
        <Stack actions={stackActions} />
        <Board board={board} player={player} />
        <Controls />
        <Actions />
        <Functions functions={functions} />
      </div>
    )
  }

}

export default Game
