export const selectFunctionInstruction = ({ functionId, instructionId }) => {
  return (dispatch, getState) => {
    if (getState().game.isRunning) {
      dispatch(restart())
    }
    dispatch({
      type: 'SELECT_FUNCTION_INSTRUCTION',
      functionId,
      instructionId
    })
  }
}

export const setFunctionInstruction = ({ functionId, instructionId, instruction }) => ({
  type: 'SET_FUNCTION_INSTRUCTION',
  functionId,
  instructionId,
  instruction
})

export const next = () => ({ type: 'NEXT_INSTRUCTION' })

export const step = () => {
  return (dispatch, getState) => {
    const game = getState().game

    if (!game.isRunning) {
      dispatch(play())
      dispatch(pause())
    } else {
      dispatch(pause())
      dispatch(next())
    }
  }
}

export const play = () => ({ type: 'PLAY' })

export const pause = () => ({ type: 'PAUSE' })

export const restart = () => ({ type: 'RESTART' })

export const clear = () => {
  return (dispatch, getState) => {
    if (getState().game.isRunning) {
      dispatch(restart())
    }
    dispatch({ type: 'CLEAR' })
  }
}

export const changeSpeed = () => ({ type: 'CHANGE_SPEED' })

export const loadLevel = level => ({
  type: 'LOAD_LEVEL',
  level
})

const domain = process.env.REACT_APP_API_HOST

export const startGame = () => {
  return (dispatch, getState) => {
    fetch(`${domain}/game01/start`, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(level => dispatch(loadLevel(level)))
    .catch(console.log) // TODO: handle redirect if not authorized
  }
}

export const submitAnswer = () => {
  return (dispatch, getState) => {
    const { functions } = getState().game
    const answer = functions.map(f => f.instructions)

    fetch(`${domain}/game01/next`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ answer }),
    })
    .then(res => res.json())
    .then(level => dispatch(loadLevel(level)))
    .catch(console.log) // TODO: handle redirect if not authorized
  }
}
