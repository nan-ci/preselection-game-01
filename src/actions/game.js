export const moveForward = (condition = 0) => {
  return {
    type: 'MOVE_FORWARD',
    condition
  }
}

export const rotateLeft = (condition = 0) => {
  return {
    type: 'ROTATE_LEFT',
    condition
  }
}

export const rotateRight = (condition = 0) => {
  return {
    type: 'ROTATE_RIGHT',
    condition
  }
}

export const paintWithColor = (color, condition = 0) => {
  return {
    type: 'PAINT_WITH_COLOR',
    color,
    condition
  }
}

export const repeatFunction = (id, condition = 0) => {
  return {
    type: 'REPEAT_FUNCTION',
    id,
    condition
  }
}

export const selectFunctionInstruction = ({ functionId, instructionId }) => {
  return {
    type: 'SELECT_FUNCTION_INSTRUCTION',
    functionId,
    instructionId
  }
}

export const setFunctionInstruction = ({ functionId, instructionId, instruction }) => {
  return {
    type: 'SET_FUNCTION_INSTRUCTION',
    functionId,
    instructionId,
    instruction
  }
}


// TODO: fix test
export const next = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'NEXT_INSTRUCTION' })
    const currentInstruction = getState().game.currentInstruction
    if (currentInstruction && currentInstruction.type) {
      dispatch(currentInstruction)
    }
  }
}

export const step = () => {
  return (dispatch, getState) => {
    const game = getState().game

    if (!game.running) {
      dispatch(play())
      game.paused && dispatch(pause())
    } else {
      game.paused && dispatch(pause())
      dispatch(next())
    }
  }
}

export const play = () => ({ type: 'PLAY' })
export const pause = () => ({ type: 'PAUSE' })
export const restart = () => ({ type: 'RESTART' })
export const clear = () => ({ type: 'CLEAR' })
export const changeSpeed = () => ({ type: 'CHANGE_SPEED' })
