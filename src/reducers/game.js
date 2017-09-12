const newBoard = (width, heigth) => {
  return Array(heigth).fill(0).map(() => Array(width).fill(0))
}

const initialState = {
  board: newBoard(10, 10),

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

  default:
    return state
  }

}

export default reducer
