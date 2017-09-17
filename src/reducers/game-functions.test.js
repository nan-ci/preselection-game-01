import deepFreeze from 'deep-freeze'
import game from './game'
import { setFunctionInstruction } from '../actions/game'

it('function instruction can be set', () => {
  const beforeState = {
    functions: [
      {
        id: 0,
        instructions: [
          { type: 'ROTATE_LEFT', condition: 2 }
        ]
      }
    ]
  }
  deepFreeze(beforeState)
  const action = {
    type: 'SET_FUNCTION_INSTRUCTION',
    functionId: 0,
    instructionId: 0,
    instruction: { type: 'MOVE_FORWARD' }
  }
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      {
        id: 0,
        instructions: [
          { type: 'MOVE_FORWARD', condition: 2}
        ]
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
        instructions: [
          { type: 'ROTATE_LEFT', condition: 2 }
        ]
      }
    ]
  }
  deepFreeze(beforeState)
  const action = setFunctionInstruction({
    functionId: 0,
    instructionId: 0,
    instruction: { condition: 3 }
  })
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      {
        id: 0,
        instructions: [
          { type: 'ROTATE_LEFT', condition: 3 }
        ]
      }
    ]
  }

  expect(afterState).toEqual(expected)
})

