import React from 'react'
import './Game.css'

import {
  BoardPanel,
  StackPanel,
  ControlsPanel,
  FunctionsPanel,
} from '../components'

import store from '../store'
import { isMobile } from '../lib/utils'

const getGameMessage = game => {
  if (game.stars) return 'WIN'
  if (game.board[game.player.y][game.player.x]) return 'DEAD'
  return game.currentInstruction ? '' : 'EMPTY STACK'
}

class Game extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { game } = store.getState()
    const message = game.ended && getGameMessage(game)

    return (
      <div id="Game">
        <div id="PanelTop">
          <StackPanel instructions={game.instructionsStack} />
          <BoardPanel board={game.board} player={game.player} />
          <ControlsPanel />
        </div>
        <div id="PanelBottom">
          <FunctionsPanel game={game} />
          <div className='Message'>{message}</div>
        </div>
      </div>
    )
  }

}

export default Game
