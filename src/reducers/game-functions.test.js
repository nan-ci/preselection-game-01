import deepFreeze from 'deep-freeze'
import game from './game'
import { setFunctionInstruction } from '../actions/game'
import {
  NO, FW, TL, TR, P1, P2, P3, F0, F1, F2, C1, C2, C3,
  allInstructions
} from '../constants'

// TODO: tests
// NO    | FW -> FW     // replace
// FW    | TR -> TR     // replace
// TR    | C2 -> TR+C2  // add condition keep type
// TR+C2 | FW -> FW+C2  // replace type only
// FW+C2 | C2 -> FW     // remove condition only
// FW    | FW -> NO     // replace
it('function instruction can be set', () => {
  const beforeState = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL ], length: 2 }
    ]
  }
  deepFreeze(beforeState)
  const action = {
    type: 'SET_FUNCTION_INSTRUCTION',
    functionId: 1,
    instructionId: 1,
    instruction: C2
  }
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL + C2 ], length: 2 }
    ]
  }

  expect(afterState).toEqual(expected)
})

it('function instruction can be set - through action creator', () => {
  const beforeState = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL + C1 ], length: 2 }
    ]
  }
  deepFreeze(beforeState)
  const action = setFunctionInstruction({
    functionId: 1,
    instructionId: 1,
    instruction: [ C2 ]
  })
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL + C2 ], length: 2 }
    ]
  }

  expect(afterState).toEqual(expected)
})

it('function instruction can be toggled', () => {
  const beforeState = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL + C2 ], length: 2 }
    ]
  }
  deepFreeze(beforeState)
  const action = {
    type: 'SET_FUNCTION_INSTRUCTION',
    functionId: 1,
    instructionId: 1,
    instruction: [ C2 ]
  }
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      { instructions: [ NO, NO ], length: 2 },
      { instructions: [ NO, TL ], length: 2 }
    ]
  }

  expect(afterState).toEqual(expected)
})
