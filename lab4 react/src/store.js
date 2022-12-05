import { combineReducers, configureStore } from "@reduxjs/toolkit"
import curseReducer from "./slices/cursesSlice"

export default configureStore({
    reducer: combineReducers({
        cur: curseReducer
    })
})