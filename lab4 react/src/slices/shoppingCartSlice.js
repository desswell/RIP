import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const SCartSlice = createSlice({
    name: "SCart",
    initialState: {
        Order: [],
        isAuth: false,
        UserId: 0,
    },
    reducers: {
        AddOrder(state, {payload}) {
            state.Order.push(payload)
        },
        DelOrder(state, {payload}){
            state.Order = state.Order.filter(item => item.id !== payload)
        },
        ChangeAuth(state){
            state.isAuth = !state.isAuth
        },
        ChangeUserId(state, {payload}){
            state.UserId = payload
        },
        DelAllOrder(state){
            state.Order = []
        }
    }
})

export const useOrder = () =>
    useSelector((state) => state.SCart.Order)

export const useIsAuth = () =>
    useSelector((state) => state.SCart.isAuth)

export const useUserId = () =>
    useSelector((state) => state.SCart.UserId)

export const {
    AddOrder: AddOrderAction,
    DelOrder: DelOrderAction,
    ChangeAuth: ChangeAuthAction,
    ChangeUserId: ChangeUserIdAction,
    DelAllOrder: DelAllOrderAction,
} = SCartSlice.actions


export default SCartSlice.reducer