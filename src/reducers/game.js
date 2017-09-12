import _ from 'lodash'

const newBoard = (width, heigth) => {
  return Array(heigth).fill(0).map(() => Array(width).fill(0))
}

const actions = [
  'MOVE_FORWARD',
  'ROTATE_LEFT',
  'ROTATE_RIGHT',
  'PAINT_WITH_COLOR', // arg: color
  'REPEAT_FUNCTION' // arg: function_index
]

// colors:     1, 2, 3
// with stars: 4, 5, 6
const level1 = [
  [0, 0, 0],
  [1, 1, 4],
  [0, 0, 0],
]

// directions:
//   1
// 0   2
//   3

const initialState = {
  board: newBoard(3, 3),

  player: { x: 0, y: 1, direction: 2 },

  actionsStack: [],

  paused: true,
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

  case 'TOGGLE_PAUSE': {
    return {
      ...state,
      paused: !state.paused,
    }
  }

  case 'MOVE_FORWARD': {
    const p = { ...state.player }

    if (p.direction === 0) { p.x -= 1 }
    if (p.direction === 1) { p.y -= 1 }
    if (p.direction === 2) { p.x += 1 }
    if (p.direction === 3) { p.y += 1 }

    return {
      ...state,
      player: p
    }
  }

  case 'ROTATE_LEFT': {
    const p = {
      ...state.player,
      direction: (state.player.direction + 3) % 4
    }

    return {
      ...state,
      player: p
    }
  }

  case 'ROTATE_RIGHT': {
    const p = {
      ...state.player,
      direction: (state.player.direction + 1) % 4
    }

    return {
      ...state,
      player: p
    }
  }

  case 'PAINT_WITH_COLOR': {
    const color = action.color
    const board = _.cloneDeep(state.board)
    const p = state.player

    board[p.y][p.x] = board[p.y][p.x] > 3 ? 3 + color : color

    return {
      ...state,
      board
    }
  }

  default:
    return state
  }

}

export default reducer
