import _ from 'lodash'

const functions = [
  {
    id: 0,
    instructions: [
      { type: 'MOVE_FORWARD' },
      { type: 'ROTATE_RIGHT', condition: 2 },
      { type: 'PAINT_WITH_COLOR', color: 1, condition: 2 },
      { type: 'ROTATE_LEFT', condition: 3 },
      { type: 'ROTATE_LEFT', condition: 3 },
      { type: 'REPEAT_FUNCTION', id: 0 },
    ]
  }
]

// colors:     g, r, g, b
// colors:     0, 1, 2, 3
// with stars:    5, 6, 7
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
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

  stars: 2,

  delayBetweenInstructions: 100, // ms

  functions,

  currentInstruction: null,
  instructionsStack: functions[0].instructions,

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

  case 'NEXT_INSTRUCTION': {
    return {
      ...state,
      currentInstruction: state.instructionsStack.slice(0, 1)[0],
      instructionsStack: [
        ...state.instructionsStack.slice(1)
      ]
    }
  }

  case 'SET_INSTRUCTION_TO_FUNCTION': {
    const functions = _.cloneDeep(state.functions)
    functions[action.functionId]
      .instructions[action.instructionId] = action.instruction

    return {
      ...state,
      functions
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
    const instructions = state.functions[action.id].instructions

    return {
      ...state,
      instructionsStack: [
        ...instructions,
        ...state.instructionsStack
      ]
    }
  }

  default:
    return state
  }

}

export default reducer
