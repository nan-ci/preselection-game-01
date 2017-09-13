export const moveForward = (/*color*/) => {
  return (dispatch, getState) => {
    dispatch({ type: 'MOVE_FORWARD' })
    dispatch({ type: 'LOOK_FOR_STAR' })
  }
}

export const next = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'NEXT_ACTION' })

    const state = getState()
    const currentAction = state.currentAction
    if (currentAction) {
      dispatch(currentAction())
    }
  }
}
