import cloneDeep from 'lodash/cloneDeep'
import { levelClear } from '../levels'
import {
  stackMaxSize,
  NO, FW, TL, TR, P1, P2, P3, F0, F1, F2
} from '../constants'

const hasStar = cell => cell > 3
const pickupStar = cell => cell - 4
const isPlayerOutOfBounds = p => p.x < 0 || p.x > 9 || p.y < 0 || p.y > 9
const isPlayerDead = (p, board) => isPlayerOutOfBounds(p) || !board[p.y][p.x]

const initFunctions = functions => functions.map(f =>
  ({ ...f, instructions: Array(f.length).fill(NO) }))

export const init = (level = levelClear) => ({
  level,
  ...cloneDeep(level),
  functions: initFunctions(level.functions),
  speed: 1,
  currentInstruction: undefined,
  instructionsStack: [],
  selectedCell: undefined,
  paused: true,
  isRunning: false,
  ended: false,
  message: '',
  error: '',
  startedAt: 0,
  duration: 0,
  progress: 1.0,
})

const initialState = init()

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL': {
      return {
        ...init(action.level),
        speed: state.speed
      }
    }

    case 'SET_TIMES': {
      return {
        ...state,
        startedAt: action.startedAt,
        duration: action.duration,
        endsAt: action.startedAt + action.duration,
      }
    }

    case 'SET_PROGRESS': {
      if (action.progress < 0) {
        return {
          ...state,
          error: { message: 'Game has ended!' }
        }
      }

      return {
        ...state,
        progress: action.progress,
      }
    }

    case 'PLAY': {
      if (state.isRunning) {
        return {
          ...state,
          paused: false,
          selectedCell: undefined
        }
      }

      const f0 = state.functions[0]
      if (!f0) return state

      return {
        ...state,
        instructionsStack: [ ...f0.instructions ],
        paused: false,
        isRunning: true,
        selectedCell: undefined
      }
    }

    case 'PAUSE': {
      if (state.paused) return { ...state, selectedCell: undefined }
      return { ...state, paused: true, selectedCell: undefined }
    }

    case 'TOGGLE_PAUSE': return {
      ...state,
      paused: !state.paused,
      selectedCell: undefined
    }

    case 'RESTART': {
      return {
        ...init(state.level),
        functions: state.functions,
        speed: state.speed
      }
    }

    case 'CLEAR': {
      return {
        ...state,
        functions: initFunctions(state.functions),
        selectedCell: undefined
      }
    }

    case 'CHANGE_SPEED': {
      const maxSpeed = 8

      return {
        ...state,
        speed: state.speed * 2 > maxSpeed ? 1 : state.speed * 2,
        selectedCell: undefined
      }
    }

    case 'NEXT_INSTRUCTION': {
      const currentInstruction = state.instructionsStack.slice(0, 1)[0]

      const newState = {
        ...state,
        currentInstruction,
        instructionsStack: state.instructionsStack.slice(1),
        selectedCell: undefined
      }

      if (currentInstruction === undefined) {
        return {
          ...newState,
          ended: true,
          message: 'EMPTY STACK'
        }
      }

      const instruction = currentInstruction % 100
      const condition = Math.floor(currentInstruction / 100)

      const p = state.player
      const currentCell = state.board[p.y][p.x]
      const currentCellColor = currentCell % 4

      if (condition && condition !== currentCellColor) {
        return newState
      }

      return applyInstruction(newState, instruction)
    }

    case 'SELECT_FUNCTION_INSTRUCTION': {
      const { functionId, instructionId } = action
      const selected = state.selectedCell

      if (selected &&
      selected.functionId === functionId &&
      selected.instructionId === instructionId) {
        return { ...state, selectedCell: undefined }
      }

      return {
        ...state,
        selectedCell: {
          functionId,
          instructionId
        }
      }
    }

    case 'DESELECT_FUNCTION_INSTRUCTION': {
      return {
        ...state,
        selectedCell: undefined
      }
    }

    case 'SET_FUNCTION_INSTRUCTION': {
      const { functionId, instructionId, instruction } = action
      const functions = cloneDeep(state.functions)
      const prev = functions[functionId].instructions[instructionId]

      const prevCondition = Math.floor(prev / 100) * 100
      const prevType = prev % 100

      const nextCondition = Math.floor(instruction / 100) * 100
      const nextType = instruction % 100

      const condition = nextCondition ? (prevCondition === nextCondition ? 0 : nextCondition) : prevCondition
      const type = nextType ? (prevType === nextType ? 0 : nextType) : prevType

      functions[functionId].instructions[instructionId] = type + condition

      return { ...state, functions }
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.error
      }
    }

    default:
      return state
  }
}

export default reducer

/* Helpers */

const paint = (state, color) => {
  const board = cloneDeep(state.board)
  const p = state.player
  const currentColor = board[p.y][p.x] % 4
  board[p.y][p.x] = board[p.y][p.x] - currentColor + color

  return {
    ...state,
    board
  }
}

const repeatFunction = (state, id) => {
  const instructions = state.functions[id].instructions

  const stack = [
    ...instructions,
    ...state.instructionsStack
  ]

  return {
    ...state,
    instructionsStack: stack,
    ended: stack.length > stackMaxSize,
    message: stack.length > stackMaxSize ? 'MAXIMUM CALL STACK REACHED' : ''
  }
}

// should not mutate state
const applyInstruction = (state, instruction) => {
  switch (instruction) {
    case NO: return state

    case FW: {
      let board = state.board
      let stars = state.stars

      // move
      const p = { ...state.player }
      if (p.direction === 0) { p.x -= 1 }
      if (p.direction === 1) { p.y -= 1 }
      if (p.direction === 2) { p.x += 1 }
      if (p.direction === 3) { p.y += 1 }

      // check for star
      const playerIsDead = isPlayerDead(p, board)
      if (!playerIsDead && hasStar(board[p.y][p.x])) {
        board = cloneDeep(board)
        board[p.y][p.x] = pickupStar(board[p.y][p.x])
        stars -= 1
      }

      return {
        ...state,
        board,
        player: p,
        stars,
        ended: !stars || playerIsDead,
        message: !stars ? 'YOU WON!' : playerIsDead ? 'YOU DIED!' : ''
      }
    }

    case TL: {
      return {
        ...state,
        player: {
          ...state.player,
          direction: (state.player.direction + 3) % 4
        }
      }
    }

    case TR: {
      return {
        ...state,
        player: {
          ...state.player,
          direction: (state.player.direction + 1) % 4
        }
      }
    }

    case P1: return paint(state, 1)
    case P2: return paint(state, 2)
    case P3: return paint(state, 3)

    case F0: return repeatFunction(state, 0)
    case F1: return repeatFunction(state, 1)
    case F2: return repeatFunction(state, 2)

    default: return state
  }
}
