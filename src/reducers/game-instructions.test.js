import game from './game'
import deepFreeze from 'deep-freeze'
import {
  NO, FW, TL, TR, P1, P2, P3, F0, F1, F2, C1, C2, C3,
  allInstructions
} from '../constants'

it('instruction: FW (forward)', () => {
  const beforeState = {
    board: [
      [1, 1]
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [FW]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)

  expect(afterState.player.x).toEqual(beforeState.player.x + 1)
})

it('instruction: TL (turn left)', () => {
  const beforeState = {
    board: [
      [1, 5]
    ],
    player: { x: 0, y: 0, direction: 0 },
    currentInstruction: undefined,
    instructionsStack: [TL]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(3)
})

it('instruction: TR (turn right)', () => {
  const beforeState = {
    board: [
      [1, 5]
    ],
    player: { x: 0, y: 0, direction: 3 },
    currentInstruction: undefined,
    instructionsStack: [TR]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)

  expect(afterState.player.direction).toBe(0)
})

it('instruction: P{1,2,3} (paint with color)', () => {
  const beforeState = {
    board: [
      [1, 5]
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [P2]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = [
    [2, 5]
  ]

  expect(afterState.board).toEqual(expected)
})

it('instruction: F{0,1,2} (repeat function)', () => {
  const functions = [
    { instructions: [FW, F0], length: 2 }
  ]
  const beforeState = {
    board: [
      [1, 5]
    ],
    player: { x: 0, y: 0, direction: 2 },
    functions,
    currentInstruction: undefined,
    instructionsStack: [F0]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = functions[0].instructions

  expect(afterState.instructionsStack).toEqual(expected)
})

it('conditions', () => {
  const beforeState = {
    board: [
      [1, 1]
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: undefined,
    instructionsStack: [TL + C2]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)

  expect(afterState.player).toEqual(beforeState.player)
})
