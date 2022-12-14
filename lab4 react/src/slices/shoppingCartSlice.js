import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const SCartSlice = createSlice({
    name: "SCart",
    initialState: {
        Order: []
    },
    reducers: {
        AddOrder(state, {payload}) {
            state.Order.push(payload)
        },
        DelOrder(state, {payload}){
            state.Order = state.Order.filter(item => item.id !== payload)
        }
    }
})

export const useOrder = () =>
    useSelector((state) => state.SCart.Order)


export const {
    AddOrder: AddOrderAction,
    DelOrder: DelOrderAction
} = SCartSlice.actions


export default SCartSlice.reducer