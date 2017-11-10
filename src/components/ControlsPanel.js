import React from 'react'
import './ControlsPanel.css'

import store from '../store'
import Block from './Block'
import { play, pause, restart, step, clear, changeSpeed } from '../actions/game'

const ControlsPanel = () => {
  const game = store.getState().game

  return (
    <div className='ControlsPanel'>
      <Block type={game.paused ? 'play' : 'pause'} onClick={() => store.dispatch(game.paused ? play() : pause())} />
      <Block type='step' onClick={() => !game.ended && store.dispatch(step())} />
      <Block type='restart' onClick={() => store.dispatch(restart())} />
      <Block type='clear' onClick={() => store.dispatch(clear())} />
      <Block type={`X${game.speed}`} onClick={() => store.dispatch(changeSpeed())} />
    </div>
  )
}

export default ControlsPanel
