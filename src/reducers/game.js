import _ from 'lodash'

const functions = [
  {
    id: 1,
    actions: [
      { type: 'MOVE_FORWARD', condition: 2 },
      { type: 'REPEAT_FUNCTION', id: 1, condition: 2 },
    ]
  }
]

// colors:     g, r, g, b
// colors:     0, 1, 2, 3
// with stars:    5, 6, 7
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 7, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// directions:
//   1
// 0   2
//   3

const initialState = {
  board,

  player: { x: 3, y: 4, direction: 2 },

  stars: 1,

  delayBetweenActions: 1000, // ms

  functions,

  currentAction: null,
  actionsStack: functions[0].actions,

  paused: true,

  ended: false,
}

const hasStar = cell => cell > 3
const pickupStar = cell => cell -= 4

const reducer = (state = initialState, action) => {

  switch (action.type) {

  // case 'START': {}

  case 'TOGGLE_PAUSE': {
    return {
      ...state,
      paused: !state.paused
    }
  }

  case 'NEXT_ACTION': {
    return {
      ...state,
      currentAction: state.actionsStack.slice(0, 1)[0],
      actionsStack: [
        ...state.actionsStack.slice(1)
      ]
    }
  }

  case 'MOVE_FORWARD': {
    let p = state.player

    // check color condition
    if (action.condition && state.board[p.y][p.x] % 4 !== action.condition) {
      return state
    }

    // move
    p = { ...state.player }
    if (p.direction === 0) { p.x -= 1 }
    if (p.direction === 1) { p.y -= 1 }
    if (p.direction === 2) { p.x += 1 }
    if (p.direction === 3) { p.y += 1 }

    // check for star
    let board = state.board
    let stars = state.stars
    if (hasStar(state.board[p.y][p.x])) {
      board = _.cloneDeep(state.board)
      board[p.y][p.x] = pickupStar(board[p.y][p.x])

      stars -= 1
    }

    return {
      ...state,
      board,
      player: p,
      stars,
      ended: stars === 0 || !board[p.y][p.x]
    }
  }

  case 'ROTATE_LEFT': {
    // check color condition
    let p = state.player
    if (action.condition && state.board[p.y][p.x] % 4 !== action.condition) {
      return state
    }

    p = {
      ...state.player,
      direction: (p.direction + 3) % 4
    }

    return {
      ...state,
      player: p
    }
  }

  case 'ROTATE_RIGHT': {
    // check color condition
    let p = state.player
    if (action.condition && state.board[p.y][p.x] % 4 !== action.condition) {
      return state
    }

    p = {
      ...state.player,
      direction: (p.direction + 1) % 4
    }

    return {
      ...state,
      player: p
    }
  }

  case 'PAINT_WITH_COLOR': {
    // check color condition
    const p = state.player
    if (action.condition && state.board[p.y][p.x] % 4 !== action.condition) {
      return state
    }

    const color = action.color
    const board = _.cloneDeep(state.board)

    board[p.y][p.x] = hasStar(board[p.y][p.x]) ? 3 + color : color

    return {
      ...state,
      board
    }
  }

  case 'REPEAT_FUNCTION': {
    // check color condition
    const p = state.player
    if (action.condition && state.board[p.y][p.x] % 4 !== action.condition) {
      return state
    }

    const actions = state.functions[action.id - 1].actions

    return {
      ...state,
      actionsStack: [
        ...actions,
        ...state.actionsStack
      ]
    }
  }

  default:
    return state
  }

}

export default reducer
