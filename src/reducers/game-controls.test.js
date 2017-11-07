import deepFreeze from 'deep-freeze'
import game, { init } from './game'

const level = {
  board: [
    [1, 5],
    [0, 0],
  ],
  player: { x: 0, y: 0, direction: 2 },
  stars: 1,
  functions: [ { instructions: [], length: 2 } ],
}

it('restart game should reset to initialState but { functions, speed }', () => {
  const initialState = init(level)

  const beforeState = {
    ...initialState,
    board: [
      [1, 1],
      [0, 0],
    ],
    player: { x: 1, y: 0, direction: 2 },
    stars: 0,
    ended: true,
    message: 'WIN',
    functions: [
      {
        instructions: [
          { type: 'MOVE_FORWARD' },
          { type: 'REPEAT_FUNCTION', id: 0 },
        ],
        length: 2
      }
    ],
    instructionsStack: [
      { type: 'MOVE_FORWARD' }
    ],
    speed: 4,
  }
  deepFreeze(beforeState)
  const action = { type: 'RESTART' }
  const afterState = game(beforeState, action)
  const expected = {
    ...initialState,
    functions: beforeState.functions,
    speed: beforeState.speed,
  }

  expect(afterState).toEqual(expected)
})
