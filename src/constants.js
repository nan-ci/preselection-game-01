const maxDelayBetweenInstructions = 800

const stackMaxSize = 100

const allInstructions = {
  forward: { type: 'MOVE_FORWARD' },
  left: { type: 'ROTATE_LEFT' },
  right: { type: 'ROTATE_RIGHT' },
  C1: { condition: 1 },
  C2: { condition: 2 },
  C3: { condition: 3 },
  P1: { type: 'PAINT_WITH_COLOR', color: 1 },
  P2: { type: 'PAINT_WITH_COLOR', color: 2 },
  P3: { type: 'PAINT_WITH_COLOR', color: 3 },
  F0: { type: 'REPEAT_FUNCTION', id: 0 },
  F1: { type: 'REPEAT_FUNCTION', id: 1 },
  F2: { type: 'REPEAT_FUNCTION', id: 2 },
}

export {
  maxDelayBetweenInstructions,
  stackMaxSize,
  allInstructions,
}
