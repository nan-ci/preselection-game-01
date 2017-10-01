import React from 'react'
import './ControlsPanel.css'

import store from '../store'
import { play, pause, restart, step, clear, changeSpeed } from '../actions/game'

const ControlsPanel = () => {
  const game = store.getState().game

  return (
    <div className='ControlsPanel'>
      <button onClick={() => store.dispatch(game.paused ? play() : pause())}>
        {game.paused ? 'Play' : 'Pause'}
      </button>
      <button onClick={() => !game.ended && store.dispatch(step())}>
        Step
      </button>
      <button onClick={() => store.dispatch(restart())}>
        Restart
      </button>
      <button onClick={() => store.dispatch(clear())}>
        Clear
      </button>
      <button onClick={() => store.dispatch(changeSpeed())}>
        {`Speed x${game.speed}`}
      </button>
    </div>
  )
}

export default ControlsPanel
