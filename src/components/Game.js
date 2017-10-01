import React from 'react'
import './Game.css'

import {
  BoardPanel,
  StackPanel,
  ControlsPanel,
  FunctionsPanel,
  InstructionsPanel,
} from '../components'

import store from '../store'

class Game extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const game = store.getState().game

    const message = game.ended && (
      !game.stars ? 'WIN' :
      !game.board[game.player.y][game.player.x] ? 'DEAD' :
      !game.currentInstruction ? 'EMPTY STACK' : ''
    )

    return (
      <div className='GameContainer'>
        <StackPanel instructions={game.instructionsStack} />
        <BoardPanel board={game.board} player={game.player} />
        <ControlsPanel />
        <InstructionsPanel selectedCell={game.selectedCell} activeInstructions={game.activeInstructions} />
        <FunctionsPanel functions={game.functions} />
        <div className='Message'>
          {message}
        </div>
      </div>
    )
  }

}

export default Game
