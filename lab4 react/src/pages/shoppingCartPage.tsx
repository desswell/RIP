import React, { useState } from "react";
import { useOrder } from "../slices/shoppingCartSlice";
import {ICurses} from "../models/models";
import { ShCart } from "../Components/shoppingCartComp";

const ShoppingCartPage = () => {
    const data = useOrder()
    const [emptyCart, setEmptyCart] = useState(false)
    if (data.length === 0 && !emptyCart) setEmptyCart(true)
    return(
        <div className="flex-1">
            {emptyCart && <p>
                Корзина пуста
            </p>}
            {!emptyCart && data.map((curse: ICurses) => <ShCart curse={curse} key={curse.id}/>)}
            {!emptyCart && <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                   // onClick={() => {
                                   //  data.map((curse: ICurses) => {
                                   //
                                   //  })
                                   // }}
            >
            Купить
            </button>}
        </div>
    );
}

export default ShoppingCartPage;