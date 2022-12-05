import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const curseSlice = createSlice({
    name: "curses",
    initialState: {
        Data: []
    },
    reducers: {
        setData(state, {payload}) {
            state.Data = payload
        }
    }
})

export const useData = () =>
    useSelector((state) => state.curses.Data)


export const {
    setData: setDataAction
} = curseSlice.actions


export default curseSlice.reducer