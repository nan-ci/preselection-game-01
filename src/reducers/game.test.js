import game from './game'

it('pause state should be toggled', () => {
  const beforeState = { paused: true }
  Object.freeze(beforeState)
  const action = { type: 'TOGGLE_PAUSE' }
  const afterState = game(beforeState, action)

  expect(afterState.paused).toBe(!beforeState.paused)
})
