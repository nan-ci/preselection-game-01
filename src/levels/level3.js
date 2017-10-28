const level0 = {
  board: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  player: { x: 3, y: 4, direction: 2 },
  stars: 2,
  functions: [
    {
      id: 0,
      instructions: [],
      correctInstructions: [
        { type: 'MOVE_FORWARD' },
        { type: 'ROTATE_RIGHT', condition: 2 },
        { type: 'PAINT_WITH_COLOR', color: 1, condition: 2 },
        { type: 'ROTATE_LEFT', condition: 3 },
        { type: 'ROTATE_LEFT', condition: 3 },
        { type: 'REPEAT_FUNCTION', id: 0 },
      ],
      length: 6
    }
  ],
  activeInstructions: [
    'left',
    'forward',
    'right',
    'C1',
    'C2',
    'C3',
    'P1',
    'P2',
    'P3',
    'F0',
  ],
}

export default level0