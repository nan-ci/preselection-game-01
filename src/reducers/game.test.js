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

// TODO: duplicate for every direction
it('player can move forward', () => {
  const beforeState = {
    player: {
      x: 1,
      y: 1,
      direction: 2,
    }
  }
  Object.freeze(beforeState)
  const action = { type: 'MOVE_FORWARD' }
  const afterState = game(beforeState, action)

  expect(afterState.player.x).toBe(2)
})

it('player can rotate left', () => {
  const beforeState = {
    player: {
      x: 1,
      y: 1,
      direction: 0,
    }
  }
  Object.freeze(beforeState)
  const action = { type: 'ROTATE_LEFT' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(3)
})

it('player can rotate right', () => {
  const beforeState = {
    player: {
      x: 1,
      y: 1,
      direction: 3,
    }
  }
  Object.freeze(beforeState)
  const action = { type: 'ROTATE_RIGHT' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(0)
})

it('player can paint with color', () => {
  const board = [
    [0, 0, 0],
    [1, 1, 4],
    [0, 0, 0],
  ]
  const beforeState = {
    player: {
      x: 2,
      y: 1,
      direction: 2,
    },
    board
  }
  deepFreeze(beforeState)
  const action = {
    type: 'PAINT_WITH_COLOR',
    color: 2
  }
  const afterState = game(beforeState, action)

  const expected = [
    [0, 0, 0],
    [1, 1, 5],
    [0, 0, 0],
  ]

  expect(afterState.board).toEqual(expected)
})

it('player can pick up star', () => {
  const board = [
    [0, 0, 0],
    [1, 1, 4],
    [0, 0, 0],
  ]
  const beforeState = {
    player: {
      x: 2,
      y: 1,
      direction: 2,
    },
    stars: 1,
    board
  }
  deepFreeze(beforeState)
  const action = {
    type: 'LOOK_FOR_STAR'
  }
  const afterState = game(beforeState, action)

  const expected = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]

  expect(afterState.board).toEqual(expected)
})
