import React from 'react'
import './EditorFunctionsPanel.css'

import store from '../store'

const EditorFunctionsPanel = ({ functions : f }) => {

  const onChange = e => {
    const { id, value } = e.target
    store.dispatch({type: 'SET_FUNCTION_LENGTH', functionId: id, length: Number(value)})
  }

  const functionInputs = [0, 1, 2].map(i => (
    <label key={i}>F{i}
      <input id={i} type='number' value={f[i] ? f[i].length : 0} min='0' max='10' onChange={onChange} />
    </label>
  ))

  return (
    <div className='EditorFunctionsPanel'>
      {functionInputs}
    </div>
  )
}

export default EditorFunctionsPanel
