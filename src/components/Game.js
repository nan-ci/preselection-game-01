import React from 'react'
import './Game.css'

import {
  BoardPanel,
  StackPanel,
  ControlsPanel,
  FunctionsPanel,
  InstructionsPanel,
  FullScreenAlertBox,
  ProgressBar
} from '../components'

import store from '../store'

import { startGame, loadLevel, submitAnswer, restart, setProgress } from '../actions/game'

import levels from '../levels'
const USE_MOCKS = process.env.REACT_APP_USE_MOCKS
let currentLevel = 0

const winButtons = [
  { text: 'RESTART', onClick: () => store.dispatch(restart()) },
  { text: 'NEXT', onClick: () => USE_MOCKS ? store.dispatch(loadLevel(levels[++currentLevel])) : store.dispatch(submitAnswer()) }
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

const progressTickEvery = 10 * 1000
const progressTick = () => {
  return setInterval(() => {
    const { game } = store.getState()
    const { startedAt, endsAt } = game

    if (!startedAt || !endsAt) return

    const progress = 1.0 - ((Date.now() - startedAt) / (endsAt - startedAt))

    store.dispatch(setProgress(progress))
  }, progressTickEvery)
}

class Game extends React.Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    USE_MOCKS ? store.dispatch(loadLevel(levels[currentLevel])) : store.dispatch(startGame())

    this.progressTick = progressTick()
  }

  componentWillUnmount () {
    this.unsubscribe()

    clearInterval(this.progressTick)
  }

  render () {
    const { game } = store.getState()
    const didWin = game.ended && !game.stars
    const showAlert = game.error || didWin
    const message = game.error
      ? (game.error.statusMessage || game.error.message)
      : game.message
    const buttons = game.error
      ? game.error.statusCode === 401 ? unauthButtons : errorButtons
      : didWin ? winButtons : []

    return (
      <div id='Game'>
        <ProgressBar progress={game.progress} />
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
