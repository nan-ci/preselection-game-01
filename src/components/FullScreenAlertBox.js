import React from 'react'
import './FullScreenAlertBox.css'

const FullScreenAlertBox = ({ show = false, message, buttons = [], ...props }) => {
  const buttonBlocks = buttons.map((b, i) =>
    <div key={i} className='button' onClick={b.onClick}>{b.text}</div>)

  return (
    <div id='FullScreenAlertBoxWrapper' className={show?'':'hidden'} {...props} >
      <div id='FullScreenAlertBox'>
        <div className='message'>{message}</div>
        <div className='buttons'>{buttonBlocks}</div>
      </div>
    </div>
  )
}

export default FullScreenAlertBox
