import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LifeGame } from './life/LifeGame'
import { LifeSlice } from '../store/life/life.slice'
import { LifeSelectors } from '../store/life/life.selectors'

import './App.css'

const TURN_SPEED = 250

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AppProperties {
}
export const App = ({
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const turn = useSelector(LifeSelectors.turn)

  const [turnInterval, setTurnInterval] = useState<any>()

  // Callbacks //

  function handleStartClick() {
    dispatch(LifeSlice.actions.next())
    const interval = setInterval(() => {
      dispatch(LifeSlice.actions.next())
    }, TURN_SPEED)
    setTurnInterval(interval)
  }

  function handleStopClick() {
    clearInterval(turnInterval)
    setTurnInterval(null)
  }

  function handleResetClick() {
    dispatch(LifeSlice.actions.reset())
  }

  function handleCheckBoxChange() {
    dispatch(LifeSlice.actions.toggleGridTore())
  }

  // Rendering //

  return (
    <div className='app'>
      <LifeGame />
      <div>
        <button
          onClick={handleStartClick}
        >
          Start
        </button>
        <button
          onClick={handleStopClick}
        >
          Stop
        </button>
        <button
          onClick={handleResetClick}
        >
          Reset
        </button>
        <input
          type='checkbox'
          onChange={handleCheckBoxChange}
        />
        <span>
          Turn #{turn}
        </span>
      </div>
    </div>
  )
}
