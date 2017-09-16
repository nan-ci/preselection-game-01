import game from './game'
import deepFreeze from 'deep-freeze'

it('function action can be set', () => {
  const beforeState = {
    functions: [
      {
        id: 0,
        actions: [0, 0, 0, 0, 0]
      }
    ]
  }
  deepFreeze(beforeState)
  const action = {
    type: 'SET_ACTION_TO_FUNCTION',
    functionId: 0,
    actionId: 2,
    action: { type: 'MOVE_FORWARD', condition: 1}
  }
  const afterState = game(beforeState, action)
  const expected = {
    functions: [
      {
        id: 0,
        actions: [0, 0, { type: 'MOVE_FORWARD', condition: 1}, 0, 0]
      }
    ]
  }

  expect(afterState).toEqual(expected)
})
