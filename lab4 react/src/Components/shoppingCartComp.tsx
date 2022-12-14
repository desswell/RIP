import {ICurses} from "../models/models";
import React from "react";
import {useDispatch} from "react-redux";
import {DelOrderAction} from "../slices/shoppingCartSlice";

interface ShCartProps{
    curse: ICurses
}

export function ShCart({curse}: ShCartProps) {
    const dispatch = useDispatch()
    return(
        <div
            className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <div  className="rounded flex flex-col items-center mb-2"
                  >
                <p className="py-2 text-2xl">{curse.title}</p>
                <p className="py-2 text-2xl">{curse.price} Rub</p>
                <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() =>
                    dispatch(DelOrderAction(curse.id))
                }
                >
                    Убрать из корзины
                </button>
            </div>
        </div>
    )
}