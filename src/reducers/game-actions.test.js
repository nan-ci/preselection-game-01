import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deepFreeze from 'deep-freeze'
import game from './game'
import { next } from '../actions/game'

it('next action', () => {
  const beforeState = {
    currentAction: null,
    actionsStack: [
      { type: 'MOVE_FORWARD' },
      { type: 'MOVE_FORWARD' },
    ]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_ACTION' }
  const afterState = game(beforeState, action)
  const expected = {
    currentAction: { type: 'MOVE_FORWARD' },
    actionsStack: [
      { type: 'MOVE_FORWARD' },
    ]
  }

  expect(afterState).toEqual(expected)
})


/*
it('next: execute next action', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentAction: null,
    actionsStack: [
      { type: 'MOVE_FORWARD' }
    ],
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
      [1, 5],
      [0, 0],
    ],
    player: { x: 1, y: 0, direction: 2 },
    currentAction: null,
    actionsStack: [],
    stars: 0,
    ended: true
  }

  expect(afterState).toEqual(expected)
})
*/
