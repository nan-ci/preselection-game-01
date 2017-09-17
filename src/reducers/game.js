import _ from 'lodash'
import level0 from '../levels/level0'

const level = level0

const initialState = {
  ...level,
  delayBetweenInstructions: 100, // ms
  currentInstruction: null,
  instructionsStack: [],
  selectedCell: null,
  paused: true,
  running: false,
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

  case 'SELECT_FUNCTION_INSTRUCTION': {
    const functions = _.cloneDeep(state.functions)
    // deselect all
    functions.forEach(f => f.instructions.forEach(i => { i.selected = false }))
    const instruction = functions[action.functionId]
      .instructions[action.instructionId]
    instruction.selected = !instruction.selected

    return {
      ...state,
      functions,
      selectedInstruction: instruction
    }
  }

  case 'SET_FUNCTION_INSTRUCTION': {
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
