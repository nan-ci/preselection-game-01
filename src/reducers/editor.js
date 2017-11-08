import flatMap from 'lodash/flatMap'
import { levelClear as level } from '../levels'
import { saveAs } from 'file-saver'
import stringify from 'json-stringify-pretty-compact'

import { Array2d } from '../lib/utils'

const clearBoard = () => Array2d(10, 10, 0)
const clearPlayer = () => ({ x: -1, y: -1, direction: 0 })
const clearFunction = (length = 1) => ({instructions: [], length })

const hasStar = cell => cell > 3
const addStar = cell => cell + 4
const delStar = cell => cell - 4
const toggleStar = cell => hasStar(cell) ? delStar(cell) : addStar(cell)
const countStars = board => flatMap(board, _ => _).filter(hasStar).length

const toggle = (array, value) => {
  const i = array.indexOf(value)
  return i !== -1 ? [...array.slice(0, i), ...array.slice(i + 1)] : [...array, value]
}

const saveLevel = level => {
  const text = stringify(level)
  const blob = new Blob([text], {type: "text/plain;charset=utf-8"})

  saveAs(blob, `level.json`)
}


const initialState = {
  ...level,
  isSelecting: false,
  toggleShouldDeselect: false,
  selectedCellsIndexes: [],
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

  case 'START_SELECTION': {
    return {
      ...state,
      isSelecting: true,
      toggleShouldDeselect: state.selectedCellsIndexes.includes(action.index)
    }
  }

  case 'STOP_SELECTION': {
    return {
      ...state,
      isSelecting: false
    }
  }

  case 'TOGGLE_CELL': {
    const selected = state.selectedCellsIndexes.includes(action.index)

    if (selected !== state.toggleShouldDeselect) {
      return state
    }

    return {
      ...state,
      selectedCellsIndexes: toggle(state.selectedCellsIndexes, action.index)
    }
  }

  case 'TOGGLE_INSTRUCTION': {
    return {
      ...state,
      activeInstructions: toggle(state.activeInstructions, action.instructionId)
    }
  }

  case 'DESELECT_ALL': {
    return {
      ...state,
      selectedCellsIndexes: []
    }
  }

  case 'CLEAR_BOARD': {
    return {
      ...state,
      board: clearBoard(),
      player: clearPlayer(),
      stars: 0,
    }
  }

  case 'RESET': {
    return {
      ...initialState
    }
  }

  case 'PAINT': {
    const color = action.color
    const board = state.board.map((row, y) =>
      row.map((cell, x) => {
        const index = y * 10 + x
        return state.selectedCellsIndexes.includes(index) ? (hasStar(cell) ? 4 + color : color) : cell
      }))

    return {
      ...state,
      board
    }
  }

  case 'SET_PLAYER': {
    const index = state.selectedCellsIndexes[0]

    if (!index) {
      return state
    }

    const y = Math.floor(index / 10)
    const x = index % 10
    const direction = (state.player.x === x && state.player.y === y) ? (state.player.direction + 1) % 4 : 0

    return {
      ...state,
      player: { y, x, direction }
    }
  }

  case 'SET_STAR': {
    const board = state.board.map((row, y) =>
      row.map((cell, x) => cell && state.selectedCellsIndexes.includes(y * 10 + x)
        ? toggleStar(cell) : cell))

    return {
      ...state,
      board,
      stars: countStars(board)
    }
  }

  case 'SET_FUNCTION_LENGTH': {
    const { functionId: id, length } = action
    const functions = [...state.functions]

    if (length > 0) {
      functions[id] = clearFunction(action.length)
    } else {
      functions.splice(id, 1)
    }

    return {
      ...state,
      functions
    }
  }

  case 'SAVE_LEVEL': {
    const { board, player, stars, functions, activeInstructions } = state
    const level = { board, player, stars, functions, activeInstructions }

    saveLevel(level)

    return state
  }

  default:
    return state
  }

}

export default reducer
