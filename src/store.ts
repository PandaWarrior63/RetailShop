import {configureStore} from '@reduxjs/toolkit'
import { appSliceReducer } from './slices/app'

export const store = configureStore({
    reducer: {
        app: appSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch