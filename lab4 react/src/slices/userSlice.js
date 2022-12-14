import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const UserSlice = createSlice({
    name: "Users",
    initialState: {
        active: false
    },
    reducers: {
        SetActive(state) {
            state.active = true
        },
        DelActive(state){
            state.active = false
        }
    }
})

export const useUsers = () =>
    useSelector((state) => state.Users.active)


export const {
    SetActive: SetActiveAction,
    DelActive: DelActiveAction
} = UserSlice.actions

export default UserSlice.reducer