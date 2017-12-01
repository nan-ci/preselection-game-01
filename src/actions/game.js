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

export const setProgress = progress => ({
  type: 'SET_PROGRESS',
  progress
})

export const setError = error => ({
  type: 'SET_ERROR',
  error
})

const handleResponse = response => {
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    throw Error('ops, something went wrong: expected JSON response')
  }

  if (!response.ok) {
    return response.json()
      .then(error => { throw error })
  }

  return response.json()
}

const handleError = (error, dispatch) => dispatch(setError(error))

const handleJson = (json, dispatch) => {
  if (json.done) {
    dispatch(setError({ message: "Congratulation, you have finished all levels!" }))
    return
  }

  if (!json.level /* || !isValidLevel(...) */) throw Error('invalid level')

  dispatch(loadLevel(json.level))

  dispatch({
    type: 'SET_TIMES',
    startedAt: json.startedAt,
    duration: json.duration,
  })
}

const domain = process.env.REACT_APP_API_HOST
const fetch = window.fetch

export const startGame = () => {
  return (dispatch, getState) => {
    fetch(`${domain}/game01/start`, {
      credentials: 'include'
    })
    .then(res => handleResponse(res))
    .then(json => handleJson(json, dispatch))
    .catch(error => handleError(error, dispatch))
  }
}

const formatAnswer = functions => functions.map(f => f.instructions)

export const submitAnswer = () => {
  return (dispatch, getState) => {
    const { functions } = getState().game
    const answer = formatAnswer(functions)

    fetch(`${domain}/game01/next`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ answer })
    })
    .then(res => handleResponse(res))
    .then(json => handleJson(json, dispatch))
    .catch(error => handleError(error, dispatch))
  }
}
