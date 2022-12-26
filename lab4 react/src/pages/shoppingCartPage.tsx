import React, { useState } from "react";
import {DelAllOrderAction, useOrder} from "../slices/shoppingCartSlice";
import {ICurses} from "../models/models";
import { ShCart } from "../Components/shoppingCartComp";
import {GetUser} from "../hooks/GetUser";
import {useDispatch} from "react-redux";

const ShoppingCartPage = () => {
    const data = useOrder()
    const dispatch = useDispatch()
    const [emptyCart, setEmptyCart] = useState(false)
    if (data.length === 0 && !emptyCart) setEmptyCart(true)
    const curse_id = data.map((curse: ICurses) => {
        return curse.id
    })
    const price = data.map((curse: ICurses) => {
        return curse.price
    })
    const price_sum = price.reduce((partialSum: any, a: any) => partialSum + a, 0)
    GetUser()
    const HandleClick = () => {
        fetch('/api/Purchase/add/',{
            method : "POST",
            body: JSON.stringify({id_curse: curse_id[0], sum: price_sum})
        })
            .then((res) => res.json())
            .then(() => {
                    dispatch(DelAllOrderAction())
            });
    };
    return(
        <div className="flex-1">
            {emptyCart && <p className="text-4xl align-baseline flex-auto">
                Корзина пуста
            </p>}
            {!emptyCart && data.map((curse: ICurses) => <ShCart curse={curse} key={curse.id}/>)}
            {!emptyCart && <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                   onClick={HandleClick}
            >
            Купить
            </button>}
        </div>
    );
}

export default ShoppingCartPage;