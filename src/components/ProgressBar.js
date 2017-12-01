import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ progress }) => {
  const { min, max, floor } = Math
  const progressPercent = max(0, min(floor(progress * 100), 100))
  const style = {
    width: `${progressPercent}%`
  }

  return <div id='ProgressBar' style={style}></div>
}

export default ProgressBar
