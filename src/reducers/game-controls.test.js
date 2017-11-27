import flatMap from 'lodash/flatMap'
import deepFreeze from 'deep-freeze'
import game, { init } from './game'
import { clear } from '../actions/game'
import {
  NO, FW, TL, TR, P1, P2, P3, F0, F1, F2
} from '../constants'

const level = {
  board: [
    [1, 5],
    [0, 0]
  ],
  player: { x: 0, y: 0, direction: 2 },
  stars: 1,
  functions: [
    { instructions: [], length: 2 },
    { instructions: [], length: 3 }
  ]
}

it('method: init should set basic state & functions instructions to NO', () => {
  deepFreeze(level)
  const afterState = init(level)

  const flatInstructions = flatMap(afterState.functions.map(f => f.instructions))
  expect(flatInstructions.every(i => i === NO)).toBe(true)
})

it('[controls: restart] game should reset to initialState but { functions, speed }', () => {
  const initialState = init(level)

  const beforeState = {
    ...initialState,
    board: [
      [1, 1],
      [0, 0]
    ],
    player: { x: 1, y: 0, direction: 2 },
    stars: 0,
    ended: true,
    message: 'WIN',
    functions: [
      { instructions: [ FW, F0 ], length: 2 }
    ],
    instructionsStack: [ FW ],
    speed: 4
  }
  deepFreeze(initialState)
  deepFreeze(beforeState)
  const action = { type: 'RESTART' }
  const afterState = game(beforeState, action)
  const expected = {
    ...initialState,
    functions: beforeState.functions,
    speed: beforeState.speed
  }

  expect(afterState).toEqual(expected)
})

it('[controls: clear] game should reset functions', () => {
  const initialState = init(level)
  const beforeState = {
    ...initialState,
    board: [
      [1, 1],
      [0, 0]
    ],
    player: { x: 1, y: 0, direction: 2 },
    stars: 0,
    ended: true,
    message: 'WIN',
    functions: [
      { instructions: [ FW, F0 ], length: 2 }
    ],
    instructionsStack: [ FW ],
    speed: 4
  }
  deepFreeze(initialState)
  deepFreeze(beforeState)
  const action = { type: 'CLEAR' }
  const afterState = game(beforeState, action)
  const expected = {
    ...beforeState,
    functions: [
      { instructions: [ NO, NO ], length: 2 }
    ]
  }

  expect(afterState).toEqual(expected)
})
