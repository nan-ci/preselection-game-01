import React from 'react'
import './Game.css'

import {
  BoardPanel,
  StackPanel,
  ControlsPanel,
  FunctionsPanel,
  InstructionsPanel,
  FullScreenAlertBox
} from '../components'

import store from '../store'

import { startGame, submitAnswer, restart } from '../actions/game'

const winButtons = [
  { text: 'RESTART', onClick: () => store.dispatch(restart()) },
  { text: 'NEXT', onClick: () => store.dispatch(submitAnswer()) }
]

const errorButtons = [
  { text: 'BACK TO SITE', onClick: () => { window.location = 'https://nan.ci' } }
]

const unauthButtons = [
  { text: 'LOGIN WITH GITHUB', onClick: () => { window.location = 'https://api.nan.ci/auth/github' } }
]

/* disable scrolling */
const win = typeof window !== 'undefined' && window
const doc = win && win.document
doc && (doc.ontouchmove = e => e.preventDefault())

class Game extends React.Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    store.dispatch(startGame())
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { game } = store.getState()
    const didWin = game.ended && !game.stars
    const showAlert = game.error || didWin
    const message = game.error.statusMessage || game.message
    const buttons = game.error
      ? game.error.statusCode === 401 ? unauthButtons : errorButtons
      : didWin ? winButtons : []

    return (
      <div id='Game'>
        <div id='PanelTop' className={showAlert ? 'blur' : ''}>
          <div id='Message' className={game.message ? '' : 'hidden'}>{game.message}</div>
          <StackPanel instructions={game.instructionsStack} />
          <BoardPanel board={game.board} player={game.player} />
          <ControlsPanel />
        </div>
        <div id='PanelBottom' className={showAlert ? 'blur' : ''}>
          <InstructionsPanel {...game} />
          <FunctionsPanel {...game} />
        </div>
        <FullScreenAlertBox show={showAlert} message={message} buttons={buttons} />
      </div>
    )
  }
}

export default Game
