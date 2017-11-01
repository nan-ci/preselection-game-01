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

class Game extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { game } = store.getState()

    return (
      <div id="Game">
        <div id="PanelTop">
          <StackPanel instructions={game.instructionsStack} />
          <BoardPanel board={game.board} player={game.player} />
          <ControlsPanel />
        </div>
        <div id="PanelBottom">
          <FunctionsPanel game={game} />
          <div className='Message'>{game.message}</div>
        </div>
      </div>
    )
  }

}

export default Game
