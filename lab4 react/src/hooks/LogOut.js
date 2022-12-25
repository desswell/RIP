import React from 'react'
import {useDispatch} from "react-redux";
import {ChangeAuthAction, useIsAuth} from "../slices/shoppingCartSlice";

export function LogOut() {
    const dispatch = useDispatch()
    const isAuth = useIsAuth()
    const HandleClick = () => {
        fetch('/api/logout/')
            .then(response => response.json())
            .then(data => {
                if (isAuth) {
                    dispatch(ChangeAuthAction())
                }
                console.log(data.length)
                localStorage.removeItem('login')
                window.location.reload()
            })
    };
    return(
        <button onClick={HandleClick}
        > Выйти </button>
)
}