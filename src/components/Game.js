import React from 'react'
import './Game.css'

import {
  BoardPanel,
  StackPanel,
  ControlsPanel,
  FunctionsPanel,
  InstructionsPanel,
  FullScreenAlertBox,
} from '../components'

import store from '../store'

import { startGame, submitAnswer } from '../actions/game'

const alertBoxButtons = [
  { text: 'RESTART', onClick: () => store.dispatch({type: 'RESTART'}) },
  { text: 'NEXT', onClick: () => store.dispatch(submitAnswer()) },
]

/* disable scrolling */
const win = typeof window !== 'undefined' && window
const doc = win && win.document
doc && (doc.ontouchmove = e => e.preventDefault())

class Game extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    store.dispatch(startGame())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { game } = store.getState()
    const showAlert = game.ended && !game.stars

    return (
      <div id='Game'>
        <div id='PanelTop' className={showAlert?'blur':''}>
          <div id='Message' className={game.message ?'':'hidden'}>{game.message}</div>
          <StackPanel instructions={game.instructionsStack} />
          <BoardPanel board={game.board} player={game.player} />
          <ControlsPanel />
        </div>
        <div id='PanelBottom' className={showAlert?'blur':''}>
          <InstructionsPanel {...game} />
          <FunctionsPanel {...game} />
        </div>
        <FullScreenAlertBox show={showAlert} message={game.message} buttons={alertBoxButtons} />
      </div>
    )
  }

}

export default Game
