import _ from 'lodash'
import { contain } from '../lib/utils'
import { level3 as level } from '../levels'
import { stackMaxSize } from '../constants'

const hasStar = cell => cell > 3
const pickupStar = cell => cell -= 4
const isPlayerOutOfBounds = p => p.x < 0 || p.x > 9 || p.y < 0 || p.y > 9
const isPlayerDead = (p, board) => isPlayerOutOfBounds(p) || !board[p.y][p.x]


const initialState = {
  ...level,
  speed: 1,
  currentInstruction: undefined,
  instructionsStack: [],
  selectedCell: undefined,
  paused: true,
  isRunning: false,
  ended: false,
  message: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'PLAY': {
    if (state.isRunning) return {
      ...state,
      paused: false,
      selectedCell: undefined,
    }

    const f0 = state.functions[0]

    return {
      ...state,
      instructionsStack: [ ...f0.instructions ],
      paused: false,
      isRunning: true,
      selectedCell: undefined,
    }
  }

  case 'PAUSE': {
    if (state.paused) return { ...state, selectedCell: undefined }
    return { ...state, paused: true, selectedCell: undefined }
  }

  case 'TOGGLE_PAUSE': return {
    ...state,
    paused: !state.paused,
    selectedCell: undefined,
  }

  case 'RESTART': {
    return {
      ...initialState,
      speed: state.speed,
      functions: state.functions,
      selectedCell: undefined,
    }
  }
  // TODO: rm dependency 'initialState'
  case 'CLEAR': return {
    ...state,
    instructionsStack: [],
    functions: level.functions,
    selectedCell: undefined,
  }

  case 'CHANGE_SPEED': {
    const maxSpeed = 8

    return {
      ...state,
      speed: state.speed * 2 > maxSpeed ? 1 : state.speed * 2,
      selectedCell: undefined,
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
      ended: !currentInstruction,
      message: !currentInstruction ? 'EMPTY STACK' : '',
      selectedCell: undefined,
    }
  }

  case 'SELECT_FUNCTION_INSTRUCTION': {
    const functions = _.cloneDeep(state.functions)
    const selected = state.selectedCell
    const { functionId, instructionId } = action
    const instruction = functions[functionId].instructions[instructionId]

    if (selected
      && selected.functionId === functionId
      && selected.instructionId === instructionId) {
      return { ...state, functions, selectedCell: undefined }
    }

    return {
      ...state,
      functions,
      selectedCell: {
        functionId,
        instructionId,
        instruction,
      },
    }
  }

  case 'DESELECT_FUNCTION_INSTRUCTION': return { ...state, selectedCell: undefined }
  case 'SET_FUNCTION_INSTRUCTION': {
    const functions = _.cloneDeep(state.functions)
    const { functionId, instructionId, instruction } = action
    const instructions = functions[functionId].instructions
    if (instruction.condition === undefined) {
      if (contain(instruction, instructions[instructionId])) {
        instructions[instructionId] = {
          condition: instructions[instructionId].condition,
        }
      } else {
        instructions[instructionId] = {
          condition: instructions[instructionId].condition,
          ...instruction,
        }
      }
    } else if (instructions[instructionId].condition === instruction.condition) {
      instructions[instructionId].condition = undefined
    } else {
      instructions[instructionId] = {
        ...instructions[instructionId],
        condition: instruction.condition,
      }
    }
    return { ...state, functions }
  }

  case 'MOVE_FORWARD': {
    let p = state.player
    let board = state.board
    let stars = state.stars

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

    // out of bounds
    if (p.x < 0 || p.x > 9 || p.y < 0 || p.y > 9) {
      console.log('out of bounds')
      return {
        ...state,
        player: p,
        ended: true
      }
    }

    // check for star
    const playerIsDead = isPlayerDead(p, state.board)
    if (!playerIsDead && hasStar(state.board[p.y][p.x])) {
      board = _.cloneDeep(state.board)
      board[p.y][p.x] = pickupStar(board[p.y][p.x])
      stars -= 1
    }

    return {
      ...state,
      board,
      player: p,
      stars,
      ended: !stars || playerIsDead,
      message: !stars ? 'WIN' : playerIsDead ? 'DEAD' : ''
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

    const stack = [
      ...instructions,
      ...state.instructionsStack
    ]

    return {
      ...state,
      instructionsStack: stack,
      ended: stack.length > stackMaxSize,
      message: stack.length > stackMaxSize ? 'MAX CALL STACK' : ''
    }
  }

  default:
    return state
  }

}

export default reducer
