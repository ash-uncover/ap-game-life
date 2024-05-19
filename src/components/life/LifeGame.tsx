import React from 'react'
import { useSelector } from 'react-redux'
import { LifeSelectors } from '../../store/life/life.selectors'
import { LifeCell } from './LifeCell'

import { ICell } from '../../lib/LifeModel'

import './LifeGame.css'

// ---------------------------------------------------
// Create Component LifeGame
// ---------------------------------------------------

interface LifeGameProperties {
  className?: string
}
export const LifeGame = ({
  className,
}: LifeGameProperties) => {

  // Hooks //

  const turn = useSelector(LifeSelectors.turn)
  const width = useSelector(LifeSelectors.width)
  const height = useSelector(LifeSelectors.height)
  const cells = useSelector(LifeSelectors.cells)

  // Rendering //

  const classes = ['life-game']
  if (className) classes.push(className)

  return (
    <div
      className={classes.join(' ')}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
      }}
    >
      {cells.map((row: ICell[]) => {
        return row.map((cell: ICell) => {
          if (cell.status || turn === -1) {
            return (
              <LifeCell
                key={`${cell.row}-${cell.column}`}
                row={cell.row}
                column={cell.column}
              />
            )
          }
        })
      }).flat()}
    </div>
  )
}
