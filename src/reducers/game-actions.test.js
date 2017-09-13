import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deepFreeze from 'deep-freeze'
import game from './game'
import { moveForward, next } from '../actions/game'

it('player move forward & pick up a star', () => {
  const beforeState = {
    player: {
      x: 1,
      y: 1,
      direction: 2,
    },
    stars: 1,
    board: [
      [0, 0, 0],
      [1, 1, 4],
      [0, 0, 0],
    ]
  }

  deepFreeze(beforeState)

  const store = createStore(
    game,
    beforeState,
    applyMiddleware(thunk),
  )

  store.dispatch(moveForward())

  const afterState = store.getState()

  const expected = {
    player: {
      x: 2,
      y: 1,
      direction: 2,
    },
    stars: 0,
    board: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]
  }

  expect(afterState).toEqual(expected)
})

it('next action', () => {
  const beforeState = {
    currentAction: null,
    actionsStack: [
      { type: 'MOVE_FORWARD', color: 0 },
      { type: 'MOVE_FORWARD', color: 0 },
    ]
  }

  deepFreeze(beforeState)

  const store = createStore(
    game,
    beforeState,
    applyMiddleware(thunk),
  )

  store.dispatch({ type: 'NEXT_ACTION' })

  const afterState = store.getState()

  const expected = {
    currentAction: { type: 'MOVE_FORWARD', color: 0 },
    actionsStack: [
      { type: 'MOVE_FORWARD', color: 0 },
    ]
  }

  expect(afterState).toEqual(expected)
})


it('next: execute next action', () => {
  const action = moveForward

  const beforeState = {
    player: {
      x: 1,
      y: 1,
      direction: 2,
    },
    currentAction: null,
    actionsStack: [ action ],
    stars: 1,
    board: [
      [0, 0, 0],
      [1, 1, 4],
      [0, 0, 0],
    ]
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
    player: {
      x: 2,
      y: 1,
      direction: 2,
    },
    currentAction: action,
    actionsStack: [],
    stars: 0,
    board: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]
  }

  expect(afterState).toEqual(expected)
})

