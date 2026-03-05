import { configureStore } from '@reduxjs/toolkit'
import AutheSliceReducer from "./slices/AuthSlice"

export const store = () => {
  return configureStore({
    reducer: {
        auth:AutheSliceReducer
    },
  })
}