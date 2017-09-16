import game from './game'
import deepFreeze from 'deep-freeze'

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
    type: 'SET_INSTRUCTION_TO_FUNCTION',
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
