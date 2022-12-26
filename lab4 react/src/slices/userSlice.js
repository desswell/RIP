import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const UserSlice = createSlice({
    name: "Users",
    initialState: {
        active: false,
        cursesPerUser: []
    },
    reducers: {
        SetActive(state) {
            state.active = true
        },
        DelActive(state){
            state.active = false
        },
        SetCurses(state, {payload}) {
            state.cursesPerUser = payload
        }
    }
})

export const useUsers = () =>
    useSelector((state) => state.Users.active)

export const useCursesPerUser = () =>
    useSelector((state) => state.Users.cursesPerUser)

export const {
    SetActive: SetActiveAction,
    DelActive: DelActiveAction,
    SetCurses: SetCursesAction
} = UserSlice.actions

export default UserSlice.reducer