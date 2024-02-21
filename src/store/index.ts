import { configureStore } from '@reduxjs/toolkit'
import { LifeSlice } from './life/life.slice'

export default configureStore({
  reducer: {
    life: LifeSlice.reducer,
  }
})
