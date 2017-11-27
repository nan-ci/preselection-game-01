/* Our svg Icons */
import React from 'react'
import './Block.css'

const objMap = require('../lib/objMap')
const P = color =>
  `<path stroke-width="4" stroke="#000" fill="#${color}" d="M23 10h14v13h13v14H37v13H23V37H10V23h13z" />`

const speed = n => [
  '<path fill="#FF7" d="M45.79 20.526l-1.755 4.386L30 20l-14.035 4.912-1.754-4.386L30 15l15.79 5.526z"',
  '<path fill="#FF7" d="M43.333 26.667l-1.754 4.386L30 27l-11.58 4.053-1.753-4.386L30 22l13.333 4.667z"',
  '<path fill="#FF7" d="M40.877 32.807l-1.754 4.386L30 34l-9.123 3.193-1.754-4.386L30 29l10.877 3.807z"',
  '<path fill="#FF7" d="M38.42 38.947l-1.753 4.386L30 41l-6.667 2.333-1.754-4.386L30 36l8.42 2.947z"'
].map((base, i) => base + (i < n ? ' fill-opacity=".2" />' : ' />'))
 .join('')

const typeImage = objMap(d => ({
  backgroundImage: `url('data:image/svg+xml;utf8,` +
      `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">${d}</svg>')`
}), {
  FW: '<path d="M30 15l20 20-10 10-10-10-10 10-10-10" />',
  TL: '<path d="M15 30l20-20 10 10-10 10 10 10-10 10" />',
  TR: '<path d="M45 30L25 50 15 40l10-10-10-10 10-10" />',
  P1: P('bf7'),
  P2: P('f7b'),
  P3: P('7bf'),
  F0: '<path d="M15 18h5v-5h20v5h5v25h-5v5H20v-5h-5V18zm10 0v25h10V18H25z" />',
  F1: '<path d="M25 13v5h-5v5h5v25h10V13" />',
  F2: '<path d="M15 18h5v-5h20v5h5v10h-5v5H30v5h-5v5h20v5H15V38h5v-5h5v-5h10V18H25v5H15" />',
  F0label: '<path fill="#AAA" d="M15 18h5v-5h20v5h5v25h-5v5H20v-5h-5V18zm10 0v25h10V18H25z" />',
  F1label: '<path fill="#AAA" d="M25 13v5h-5v5h5v25h10V13" />',
  F2label: '<path fill="#AAA" d="M15 18h5v-5h20v5h5v10h-5v5H30v5h-5v5h20v5H15V38h5v-5h5v-5h10V18H25v5H15" />',
  player0: '<path d="M37 43L10 30l27-13 13 13" />',
  player1: '<path d="M17 37l13-27 13 27-13 13" />',
  player2: '<path d="M23 17l27 13-27 13-13-13" />',
  player3: '<path d="M43 23L30 50 17 23l13-13" />',
  star: '<path d="M10 30l20-20 20 20-20 20" />',
  play: '<path fill="#FF7" d="M15 45V15l30 15" />',
  step: '<path fill="#FF7" d="M45 30L25 50 15 40l10-10-10-10 10-10" />',
  pause: '<path fill="#FF7" d="M15 45h10V15H15M35 45V15h10v30" />',
  restart: '<path fill="#FF7" d="M19.393 19.393C22.108 16.68 25.858 15 30 15c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-4.142 0-7.892-1.68-10.607-4.393l6.364-6.364C26.843 35.328 28.343 36 30 36c3.314 0 6-2.686 6-6s-2.686-6-6-6c-1.657 0-3.157.672-4.243 1.757L30 30H15V15l4.393 4.393z" />',
  clear: '<path fill="#FF7" d="M30 22.93l-7.07-7.072-7.072 7.07L22.928 30l-7.07 7.07 7.07 7.072L30 37.072l7.07 7.07 7.072-7.07L37.072 30l7.07-7.07-7.07-7.072L30 22.928z" />',
  X1: speed(3),
  X2: speed(2),
  X4: speed(1),
  X8: speed(0)
})
typeImage.NO = {}

const Block = ({ type = 'NO', color = 0, onClick, className = '', ...props } = {}) => (
  <div
    className={`block ${type} color-${color} ${className} ${onClick ? 'interactive' : ''}`}
    onClick={onClick}
    style={typeImage[type]}
    {...props} />
)

export default Block
