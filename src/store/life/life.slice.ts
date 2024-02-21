import {
  CaseReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  ILifeState
} from './life.state'
import { ICell } from 'src/lib/LifeModel'

// STATE //

const WIDTH = 100
const HEIGHT = 100

const getInitialState = (): ILifeState => {
  const state = {
    life: {
      width: WIDTH,
      height: HEIGHT,
      cells: [],
      tore: false,
    },
    turn: -1,
  }
  for (let row = 0; row < state.life.width; row++) {
    const rowCells = []
    for (let column = 0; column < state.life.height; column++) {
      rowCells.push({
        row: row + 1,
        column: column + 1,
        status:
          row === WIDTH / 2 && column === HEIGHT /2 ||
          row === WIDTH / 2 - 1 && column === HEIGHT /2 ||
          row === WIDTH / 2 + 1 && column === HEIGHT /2 ||
          row === WIDTH / 2 && column === HEIGHT /2 + 1 ||
          row === WIDTH / 2 + 1 && column === HEIGHT /2 - 1
      })
    }
    state.life.cells.push(rowCells)
  }
  return state
}

// REDUCERS //

export const toggleGridTore: CaseReducer<ILifeState, PayloadAction<void>> = (state, action) => {
  state.life.tore = !state.life.tore
}

interface ToggleCellStatusPayload {
  row: number
  column: number
}
export const toggleCellStatus: CaseReducer<ILifeState, PayloadAction<ToggleCellStatusPayload>> = (state, action) => {
  const {
    row,
    column
  } = action.payload
  const cell = state.life.cells[row - 1][column - 1]
  cell.status = !cell.status
}

function cellId(cell: ICell) {
  return `${cell.row}-${cell.column}`
}

function cellNeighbours(cells: ICell[][], cell: ICell, tore: boolean) {
  const row = cell.row - 1
  const column = cell.column - 1

  const validRows = [row]
  if (tore) {
    validRows.push(row - 1 >= 0 ? row - 1 : cells.length - 1)
  } else if (row - 1 >= 0) {
    validRows.push(row - 1)
  }
  if (tore) {
    validRows.push(row + 1 < cells.length ? row + 1 : 0)
  } else if (row + 1 < cells.length) {
    validRows.push(row + 1)
  }

  const validColumns = [column]
  if (tore) {
    validColumns.push(column - 1 >= 0 ? column - 1 : cells[0].length - 1)
  } else if (column - 1 >= 0) {
    validColumns.push(column - 1)
  }
  if (tore) {
    validColumns.push(column + 1 < cells[0].length ? column + 1 : 0)
  } else if (column + 1 < cells[0].length) {
    validColumns.push(column + 1)
  }

  const result = []
  validRows.forEach(r => {
    validColumns.forEach(c => {
      if (r !== row || c !== column) [
        result.push(cells[r][c])
      ]
    })
  })

  return result
}

export const next: CaseReducer<ILifeState, PayloadAction<void>> = (state, action) => {
  state.turn++
  const cellsStatus = state.life.cells.slice().flat().reduce((acc, cell) => {
    acc[cellId(cell)] = cell.status
    return acc
  }, {})
  for (let row = 0; row < state.life.width; row++) {
    for (let column = 0; column < state.life.height; column++) {
      const cell = state.life.cells[row][column]
      const neighbours = cellNeighbours(state.life.cells, cell, state.life.tore)
      const neighbourIds = neighbours.map(cellId)
      const aliveNeighbours = neighbourIds.filter(id => cellsStatus[id]).length
      if (cell.status) {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          cell.status = false
        }
      } else {
        if (aliveNeighbours === 3) {
          cell.status = true
        }
      }
    }
  }
}

export const reset: CaseReducer<ILifeState, PayloadAction<void>> = (state, action) => {
  const base = getInitialState()
  state.life = base.life
  state.turn = base.turn
}

// Export SLICE //

export const LifeSlice = createSlice({
  name: 'life',
  initialState: getInitialState(),

  reducers: {
    toggleGridTore,
    toggleCellStatus,
    next,
    reset,
  }
})
