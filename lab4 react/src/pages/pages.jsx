import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { UseCurse } from "../hooks/IDCurses";
import { useDispatch } from "react-redux";
import { AddOrderAction, useIsAuth } from "../slices/shoppingCartSlice";
import {BoughtCurses} from "../hooks/boughtCurses";
import {GetUser} from "../hooks/GetUser";

const CurseId = () => {
    const params = useParams()
    GetUser()
    const { curse } = UseCurse(params.id)
    const dispatch = useDispatch()
    const isAuth = useIsAuth()
    const alreadyBought = BoughtCurses()
    const [bought, SetBought] = useState(false)
    const [onHover, setOnHover] = useState(true)
    const Hover = onHover ? 'Уже в корзине' : 'Перейти в корзину'
    return(
        <div className="flex-1">
            <p className=" text-1xl text-lg">Страница курса {curse.title} </p>
            <img src={curse.image} className="w-1/4"></img>
            <p>Цена курса {curse.price} rub</p>
            {!bought && isAuth && !alreadyBought && <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => {
                    dispatch(AddOrderAction(curse))
                    SetBought(!bought)
                }
                }
            >
                Приобрести
            </button>}
            {bought && <Link to="/ShCart">
                <button
                className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onMouseEnter={
                () => setOnHover(prev => !prev)
            }
                onMouseLeave={
                    () => setOnHover(prev => !prev)
            }
            >
                {Hover}
            </button>
            </Link>}
            {!isAuth && <div>
                <Link to="/SighIn">Сначала войдите</Link>
            </div>}
            {alreadyBought && <div className="text-2xl">
                Уже приобретено
            </div>}
        </div>
    );
}

export default CurseId;