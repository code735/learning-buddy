import { configureStore } from '@reduxjs/toolkit'
import htmlElementSliceReducer from './features/htmlElementSlice'

export const store = configureStore({
  reducer: {
    htmlElement: htmlElementSliceReducer
  },
})

export type CurrentRootState = ReturnType<typeof store.getState>;
