import React from 'react'
import {useDispatch} from "react-redux";
import {ChangeAuthAction} from "../slices/shoppingCartSlice";

export function LogOut() {
    const dispatch = useDispatch()
    const HandleClick = () => {
        fetch('/api/logout/')
            .then(response => response.json())
            .then(data => {
                dispatch(ChangeAuthAction())
                console.log(data.length)
                localStorage.removeItem('login')
            })
    };
    return(
        <button onClick={HandleClick}
        > Выйти </button>
)
}