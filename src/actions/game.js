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

// TODO: fix test
export const next = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'NEXT_ACTION' })

    const currentAction = getState().game.currentAction
    if (currentAction) {
      dispatch(currentAction)
    }
  }
}
