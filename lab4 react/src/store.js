import { combineReducers, configureStore } from "@reduxjs/toolkit"
import curseReducer from "./slices/cursesSlice"
import SCartReducer from "./slices/shoppingCartSlice"
import UsersReducer from "./slices/userSlice"

export default configureStore({
    reducer: combineReducers({
        curses: curseReducer,
        SCart: SCartReducer,
        Users: UsersReducer
    })
})