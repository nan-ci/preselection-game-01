import store from './store'
import { next } from './actions/game'

let lastInstructionTime = Date.now()

export const loop = () => {
  const state = store.getState()
  const game = state.game

  const now = Date.now()
  const deltaTime = now - lastInstructionTime

  if (!game.ended && !game.paused && deltaTime > game.delayBetweenInstructions) {
    store.dispatch(next())
    lastInstructionTime = now
  }

  if (game.ended) {
    if (game.stars === 0) { console.log('WIN') }
    if (!game.board[game.player.y][game.player.x]) { console.log('DEAD') }
    if (game.currentInstruction === undefined) { console.log('EMPTY STACK') }
  } else {
    requestAnimationFrame(loop)
  }
}

let lastRunningState = false
store.subscribe(() => {
  const tmpLastRunningState = lastRunningState
  const game = store.getState().game
  lastRunningState = game.running

  if (game.running !== tmpLastRunningState) {
    loop()
  }
})
