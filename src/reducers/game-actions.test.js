import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deepFreeze from 'deep-freeze'
import game from './game'
import { next } from '../actions/game'

it('next instruction', () => {
  const beforeState = {
    currentInstruction: null,
    instructionsStack: [
      { type: 'MOVE_FORWARD' },
    ]
  }
  deepFreeze(beforeState)
  const action = { type: 'NEXT_INSTRUCTION' }
  const afterState = game(beforeState, action)
  const expected = {
    currentInstruction: { type: 'MOVE_FORWARD' },
    instructionsStack: []
  }

  expect(afterState).toEqual(expected)
})


/*
it('next: execute next instruction', () => {
  const beforeState = {
    board: [
      [1, 5],
      [0, 0],
    ],
    player: { x: 0, y: 0, direction: 2 },
    currentInstruction: null,
    instructionsStack: [
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
    currentInstruction: null,
    instructionsStack: [],
    stars: 0,
    ended: true
  }

  expect(afterState).toEqual(expected)
})
*/
