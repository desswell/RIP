import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { UseCurse } from "../hooks/IDCurses";
import { useDispatch } from "react-redux";
import { AddOrderAction, useOrder } from "../slices/shoppingCartSlice";
import { useUsers } from "../slices/userSlice";

const CurseId = () => {
    const params = useParams()
    const { curse } = UseCurse(params.id)
    const dispatch = useDispatch()
    // const data = useOrder()
    const [bought, SetBought] = useState(false)
    // if (params.id === data) SetBought(true)
    const [onHover, setOnHover] = useState(true)
    const logToken = useUsers()
    const Hover = onHover ? 'Уже в корзине' : 'Перейти в корзину'
    return(
        <div className="flex-1">
            <p className=" text-1xl text-lg">Страница курса {curse.title} </p>
            <img src={curse.image} className="w-1/4"></img>
            <p>Цена курса {curse.price} rub</p>
            {!bought && logToken && <button
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
            {!logToken && <div>
                Сначала войдите
            </div>}
        </div>
    );
}

export default CurseId;