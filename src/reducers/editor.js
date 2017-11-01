import { level2 as level } from '../levels'
import { saveAs } from 'file-saver'

const hasStar = cell => cell > 3

const initialState = {
  level,
  ...level,
  isSelecting: false,
  selectedCells: []
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

  case 'START_SELECTING': {
    return {
      ...state,
      isSelecting: true
    }
  }

  case 'STOP_SELECTING': {
    return {
      ...state,
      isSelecting: false
    }
  }

  case 'SELECT_CELL': {
    const selectedCells = [...state.selectedCells]
    selectedCells[action.index] = !selectedCells[action.index]

    return {
      ...state,
      selectedCells
    }
  }

  case 'DESELECT_ALL': {
    return {
      ...state,
      selectedCells: []
    }
  }

  case 'PAINT': {
    const color = action.color
    const board = state.board.map((row, y) =>
      row.map((cell, x) =>
        state.selectedCells[y * 10 + x] ? (hasStar(cell) ? 4 + color : color) : cell))

    return {
      ...state,
      board
    }
  }

  case 'SET_PLAYER': {
    const index = state.selectedCells.indexOf(true)

    if (index === -1) {
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
      row.map((cell, x) =>
        state.selectedCells[y * 10 + x] ? (hasStar(cell) ? cell - 4 : cell + 4) : cell))

    return {
      ...state,
      board
    }
  }


  case 'SAVE_LEVEL': {
    saveLevel(state.level)

    return state
  }

  default:
    return state
  }

}

export default reducer

const saveLevel = level => {
  const text = JSON.stringify(level, null, 2)
  const blob = new Blob([text], {type: "text/plain;charset=utf-8"})

  saveAs(blob, `level.json`)
}
