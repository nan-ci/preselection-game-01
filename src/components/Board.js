import React from 'react'
import './Board.css'

const Controls = () => {
  return (
    <div className='Controls'>
      <button>Play</button>
      <button>Pause</button>
      <button>Step</button>
      <button>Stop</button>
      <button>Clear</button>
    </div>
  )
}

const Actions = () => {
  return (
    <div className='Actions'>
      <button>Forward</button>
      <button>Left</button>
      <button>Right</button>
      <button>Color 1</button>
      <button>Color 2</button>
      <button>Color 3</button>
      <button>Paint 1</button>
      <button>Paint 2</button>
      <button>Paint 3</button>
      <button>F1</button>
      <button>F2</button>
      <button>F3</button>
      <button>F4</button>
      <button>F5</button>
      <button>F6</button>
    </div>
  )
}

const Functions = () => {
  return (
    <div className='Functions'>
      <div>F1</div>
      <div>F2</div>
      <div>F3</div>
      <div>F4</div>
      <div>F5</div>
      <div>F6</div>
    </div>
  )
}

class Board extends React.Component {

  componentDidMount() {
    // this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    // this.unsubscribe()
  }

  render() {
    return (
      <div className='Wrapper'>
        <div className='Stack'>Stack</div>
        <div className='Board'>Board</div>
        <Controls />
        <Actions />
        <Functions />
      </div>
    )
  }

}

export default Board
