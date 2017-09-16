import store from './store'
import { next } from './actions/game'

let lastActionTime = Date.now()

export const loop = () => {
  const state = store.getState()
  const game = state.game

  const now = Date.now()
  const deltaTime = now - lastActionTime

  if (!game.paused && deltaTime > game.delayBetweenActions) {
    store.dispatch(next())
    lastActionTime = now
  }

  if (!game.ended) {
    requestAnimationFrame(loop)
  } else {
    if (game.stars === 0) {
      console.log('WIN')
    }
    else if (!game.board[game.player.y][game.player.x]) {
      console.log('DEAD')
    }
  }
}
