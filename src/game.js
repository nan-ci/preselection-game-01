import store from './store'
import { nextAction } from './actions/game'

let lastActionTime = Date.now()

export const loop = () => {
  const state = store.getState()
  const game = state.game

  const now = Date.now()
  const deltaTime = now - lastActionTime

  if (!game.paused && deltaTime > game.delayBetweenActions) {

    store.dispatch(nextAction())

    lastActionTime = now
  }

  if (!game.ended) {
    requestAnimationFrame(loop)
  }
}
