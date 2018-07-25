const maxDelayBetweenInstructions = 800

const stackMaxSize = 100

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

const allInstructions = Object.entries({ NO, FW, TL, TR, P1, P2, P3, F0, F1, F2, C1, C2, C3 })
  .reduce((o, [k, v]) => ({ ...o, [v]: k }), allInstructions)

export {
  maxDelayBetweenInstructions,
  stackMaxSize,
  NO,
  FW,
  TL,
  TR,
  P1,
  P2,
  P3,
  F0,
  F1,
  F2,
  C1,
  C2,
  C3,
  allInstructions
}
