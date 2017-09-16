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

it('player can move forward', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 2 },
    stars: 1,
    ended: false
  }
  deepFreeze(beforeState)
  const action = { type: 'MOVE_FORWARD', condition: 1 }
  const afterState = game(beforeState, action)
  const expected = {
    board: [
      [1, 1],
      [0, 0],
    ],
    player: { x: 1, y: 0, direction: 2 },
    stars: 0,
    ended: true
  }

  expect(afterState).toEqual(expected)
})

it('player can rotate left', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 0 }
  }
  deepFreeze(beforeState)
  const action = { type: 'ROTATE_LEFT' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(3)
})

it('player can rotate right', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 3 }
  }
  deepFreeze(beforeState)
  const action = { type: 'ROTATE_RIGHT' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(0)
})

it('player can paint with color', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 3 }
  }
  deepFreeze(beforeState)
  const action = { type: 'PAINT_WITH_COLOR', color: 2 }
  const afterState = game(beforeState, action)
  const expected = [
    [2, 5],
    [0, 0],
  ]

  expect(afterState.board).toEqual(expected)
})

it('player can repeat function', () => {
  const functions = [
    {
      id: 0,
      instructions: [
        { type: 'MOVE_FORWARD' },
        { type: 'REPEAT_FUNCTION', id: 0 },
      ]
    }
  ]
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 1, direction: 2 },
    functions,
    instructionsStack: [],
  }
  deepFreeze(beforeState)
  const action = { type: 'REPEAT_FUNCTION', id: 0 }
  const afterState = game(beforeState, action)
  const expected = functions[0].instructions

  expect(afterState.instructionsStack).toEqual(expected)
})
