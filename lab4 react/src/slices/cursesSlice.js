import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const curseSlice = createSlice({
    name: "curses",
    initialState: {
        Data: [],
        price: [0, 10000000],
        button: true
    },
    reducers: {
        setData(state, {payload}) {
            state.Data = payload
        },
        setPrice(state, {payload}) {
            state.price = payload
        },
        setButton(state) {
            state.button = !state.button
        }
    }
})

export const useData = () =>
    useSelector((state) => state.curses.Data)

export const usePrice = () =>
    useSelector((state) => state.curses.price)

export const useButton = () =>
    useSelector((state) => state.curses.button)

export const {
    setData: setDataAction,
    setPrice: setPriceAction,
    setButton: setButtonAction
} = curseSlice.actions


export default curseSlice.reducer