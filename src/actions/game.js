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

    if (!game.isRunning) {
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


export const loadLevel = level => ({
  type: 'LOAD_LEVEL',
  level
})

const config = {
 domain: 'http://localhost:8986',
 // domain: 'https://api.nan.ci',
}

export const startGame = () => {
  return (dispatch, getState) => {
    fetch(`${config.domain}/game01/start`, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(level => dispatch(loadLevel(level)))
    .catch(console.log)
  }
}

const NO = 0
const FW = 1
const TL = 2
const TR = 3
const P1 = 4
const P2 = 5
const P3 = 6
const F0 = 7
const F1 = 8
const F2 = 9
const C1 = 100
const C2 = 200
const C3 = 300

const allInstructions = { NO, FW, TL, TR, P1, P2, P3, F0, F1, F2, C1, C2, C3 }

const answerFromFunctions = functions => {
  const answer = functions.map(f =>
    f.instructions.map(instruction => {
      let value = NO

      switch (instruction.type) {
        case 'MOVE_FORWARD': value = FW; break
        case 'ROTATE_LEFT': value = TL; break
        case 'ROTATE_RIGHT': value = TR; break
        case 'PAINT_WITH_COLOR': value = 3 + instruction.color; break
        case 'REPEAT_FUNCTION': value = 7 + instruction.id; break
        default: value = NO; break
      }

      if (instruction.condition) {
        value += instruction.condition * 100
      }

      return value
    }))

  return answer
}

export const submitAnswer = () => {
  return (dispatch, getState) => {
    const { functions } = getState().game
    const answer = answerFromFunctions(functions)

    fetch(`${config.domain}/game01/next`, {
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
    .catch(console.log)
  }
}
