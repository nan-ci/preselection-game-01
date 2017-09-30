import _ from 'lodash'
import { level3 as level } from '../levels'

const hasStar = cell => cell > 3
const pickupStar = cell => cell -= 4

const initialState = {
  ...level,
  speed: 1,
  currentInstruction: undefined,
  instructionsStack: [],
  selectedCell: undefined,
  paused: true,
  running: false,
  ended: false,
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

  case 'PLAY': {
    if (state.running) {
      return {
        ...state,
        paused: false
      }
    }

    const f0 = state.functions[0]

    return {
      ...state,
      instructionsStack: [ ...f0.instructions ],
      paused: false,
      running: true
    }
  }

  case 'PAUSE': {
    if (state.paused) {
      return state
    }

    return {
      ...state,
      paused: true
    }
  }

  case 'TOGGLE_PAUSE': {
    return {
      ...state,
      paused: !state.paused
    }
  }

  case 'RESTART': {
    const functions = _.cloneDeep(state.functions)
    // functions.forEach(f => f.instructions.forEach(i => { i.selected = false }))

    return {
      ...initialState, // TODO: rm dependency 'initialState'
      speed: state.speed,
      selectedCell: state.selectedCell,
      functions
    }
  }

  case 'CLEAR': {
    return {
      ...state,
      functions: _.cloneDeep(level.functions) // TODO: rm dependency 'level'
    }
  }

  case 'CHANGE_SPEED': {
    const maxSpeed = 8

    return {
      ...state,
      speed: state.speed * 2 > maxSpeed ? 1 : state.speed * 2
    }
  }

  case 'NEXT_INSTRUCTION': {
    const currentInstruction = state.instructionsStack.slice(0, 1)[0]

    return {
      ...state,
      currentInstruction,
      instructionsStack: [
        ...state.instructionsStack.slice(1)
      ],
      ended: !currentInstruction
    }
  }

  case 'SELECT_FUNCTION_INSTRUCTION': {
    const functions = _.cloneDeep(state.functions)
    functions.forEach(f => f.instructions.forEach(i => { i.selected = false }))
    const { functionId, instructionId } = action
    const instruction = functions[functionId].instructions[instructionId]
    instruction.selected = !instruction.selected

    return {
      ...state,
      functions,
      selectedCell: {
        functionId,
        instructionId,
        instruction
      }
    }
  }

  case 'SET_FUNCTION_INSTRUCTION': {
    const functions = _.cloneDeep(state.functions)
    const { functionId, instructionId, instruction } = action
    const toggle = (a, b) => Object.keys(b).forEach(key => {
      (a[key] === b[key]) ? delete a[key] : a[key] = b[key]
    })

    toggle(functions[functionId].instructions[instructionId], instruction)

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
      ended: !stars || !board[p.y][p.x]
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
