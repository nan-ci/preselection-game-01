import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deepFreeze from 'deep-freeze'
import game from './game'
import { next } from '../actions/game'
import {
  NO, FW, TL, TR, P1, P2, P3, F0, F1, F2, C1, C2, C3,
  allInstructions,
} from '../constants'

it('next instruction', () => {
  const beforeState = {
    board: [
      [1, 1],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [FW],
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)

  expect(afterState.currentInstruction).toBe(FW)
  expect(afterState.instructionsStack).toEqual([])
})

it('empty stack: no current instruction should end game', () => {
  const beforeState = {
    currentInstruction: undefined,
    instructionsStack: [],
    ended: false,
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = {
    currentInstruction: undefined,
    instructionsStack: [],
    message: 'EMPTY STACK',
    ended: true,
  }

  expect(afterState).toEqual(expected)
})

it('player out of bounds should die & end game', () => {
  const beforeState = {
    board: [
      [1, 5],
    ],
    player: { x: 0, y: 0, direction: 0 },
    currentInstruction: undefined,
    instructionsStack: [FW],
    ended: false,
    stars: 1,
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = {
    ...beforeState,
    player: { x: -1, y: 0, direction: 0 },
    currentInstruction: FW,
    instructionsStack: [],
    message: 'YOU DIED!',
    ended: true,
  }

  expect(afterState).toEqual(expected)
})

it('player on null cell should die & end game', () => {
  const beforeState = {
    board: [
      [1, 0],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [FW],
    ended: false,
    stars: 1,
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = {
    ...beforeState,
    player: { x: 1, y: 0, direction: 2 },
    currentInstruction: FW,
    instructionsStack: [],
    message: 'YOU DIED!',
    ended: true,
  }

  expect(afterState).toEqual(expected)
})

it('player picking all stars should win & end game', () => {
  const beforeState = {
    board: [
      [1, 5],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [FW],
    ended: false,
    stars: 1,
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = {
    ...beforeState,
    board: [
      [1, 1],
    ],
    player: { x: 1, y: 0, direction: 2 },
    currentInstruction: FW,
    instructionsStack: [],
    message: 'YOU WON!',
    ended: true,
    stars: 0,
  }

  expect(afterState).toEqual(expected)
})

it('action: next', () => {
  const beforeState = {
    board: [
      [1, 5],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [FW],
    stars: 1,
    ended: false
  }
  deepFreeze(beforeState)
  const store = createStore(
    game,
    beforeState,
    applyMiddleware(thunk),
  )
  store.dispatch(next())
  const afterState = store.getState()
  const expected = {
    board: [
      [1, 1],
    ],
    player: { x: 1, y: 0, direction: 2 },
    currentInstruction: FW,
    instructionsStack: [],
    stars: 0,
    ended: true,
    message: 'YOU WON!',
  }

  expect(afterState).toEqual(expected)
})

