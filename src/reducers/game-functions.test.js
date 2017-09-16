import deepFreeze from 'deep-freeze'
import game from './game'
import { setFunctionInstruction } from '../actions/game'

it('function instruction can be set', () => {
  const beforeState = {
    functions: [
      {
        id: 0,
        instructions: [0, 0, 0, 0, 0]
      }
    ]
  }
  deepFreeze(beforeState)
  const action = {
    type: 'SET_FUNCTION_INSTRUCTION',
    functionId: 0,
    instructionId: 2,
    instruction: { type: 'MOVE_FORWARD', condition: 1}
  }
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      {
        id: 0,
        instructions: [0, 0, { type: 'MOVE_FORWARD', condition: 1}, 0, 0]
      }
    ]
  }

  expect(afterState).toEqual(expected)
})

it('function instruction can be set - through action creator', () => {
  const beforeState = {
    functions: [
      {
        id: 0,
        instructions: [0, 0, 0, 0, 0]
      }
    ]
  }
  deepFreeze(beforeState)
  const action = setFunctionInstruction({
    functionId: 0,
    instructionId: 2,
    instruction: { type: 'MOVE_FORWARD', condition: 1}
  })
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      {
        id: 0,
        instructions: [0, 0, { type: 'MOVE_FORWARD', condition: 1}, 0, 0]
      }
    ]
  }

  expect(afterState).toEqual(expected)
})

