import { configureStore } from '@reduxjs/toolkit'
import projectSlice from './projectSlice'

export const store = configureStore({
  reducer: {
// Action creators are generated for each case reducer function
    project: projectSlice
  },
})