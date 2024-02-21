export interface IGrid {
  width: number
  height: number
  cells: ICell[][]
  tore: boolean
}

export interface ICell {
  row: number
  column: number
  status: boolean
}
