import game from './game'
import deepFreeze from 'deep-freeze'

it('game can be paused', () => {
  const beforeState = { paused: false }
  Object.freeze(beforeState)
  const action = { type: 'TOGGLE_PAUSE' }
  const afterState = game(beforeState, action)

  expect(afterState.paused).toBe(true)
})

it('game can be unpaused', () => {
  const beforeState = { paused: true }
  Object.freeze(beforeState)
  const action = { type: 'TOGGLE_PAUSE' }
  const afterState = game(beforeState, action)

  expect(afterState.paused).toBe(false)
})
