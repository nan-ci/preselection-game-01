import store from './store'
import { next } from './actions/game'
import { maxDelayBetweenInstructions } from './constants'

let lastInstructionTime = Date.now()

export const update = () => {
  const { game: { speed, ended, paused } } = store.getState()

  const now = Date.now()
  const deltaTime = now - lastInstructionTime

  const delayBetweenInstructions = maxDelayBetweenInstructions / speed
  if (!ended && !paused && deltaTime > delayBetweenInstructions) {
    store.dispatch(next())
    lastInstructionTime = now
  }

  if (!ended) {
    requestAnimationFrame(update)
  }
}

let lastRunningState = false
store.subscribe(() => {
  const tmpLastRunningState = lastRunningState
  const game = store.getState().game
  lastRunningState = game.running

  if (game.running !== tmpLastRunningState) {
    update()
  }
})
