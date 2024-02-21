import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LifeSelectors } from '../../store/life/life.selectors'
import { LifeSlice } from '../../store/life/life.slice'

import './LifeCell.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface LifeCellProperties {
  className?: string

  row: number
  column: number
}
export const LifeCell = ({
  className,

  row,
  column,
}: LifeCellProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const cell = useSelector(LifeSelectors.cell({ row, column }))

  // Callbacks //

  function handleClick() {
    dispatch(LifeSlice.actions.toggleCellStatus({
      row,
      column,
    }))
  }

  // Rendering //

  const classes = ['life-cell']
  if (className) classes.push(className)
  if(cell.status) classes.push('life-cell--alive')

  return (
    <div
      className={classes.join(' ')}
      style={{
        gridRow: `${cell.row} / span 1`,
        gridColumn: `${cell.column} / span 1`,
      }}
      onClick={handleClick}
    />
  )
}
