import { RootState } from '../state'

const root = (state: RootState) => state.life

const life = (state: RootState) => root(state).life
const width = (state: RootState) => life(state).width
const height = (state: RootState) => life(state).height

const turn = (state: RootState) => root(state).turn

const cells = (state: RootState) => life(state).cells
const cell = ({ row, column }) => (state: RootState) => {
  return life(state).cells[row - 1][column - 1]
}

export const LifeSelectors = {
  width,
  height,
  turn,
  cells,
  cell,
}
