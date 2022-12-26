import React, {useState} from 'react'
import {ICurses} from "../models/models";
import {useHistory} from 'react-router-dom';
import {ChangeAuthAction, useIsAuth} from "../slices/shoppingCartSlice";


interface CursesProps {
    curse: ICurses
}

export function Curses({curse}: CursesProps) {
    const [details, setDetails] = useState(false)
    const btnBgClasses = details ? 'bg-yellow-200': 'bg-blue-200'
    const btnClasses = ['py-2 px-4 border text-2xl', btnBgClasses]
    const router = useHistory()
    return (
        <div
            className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <div  className="rounded flex flex-col items-center mb-2"
                  onClick={() => router.push(`/curses/${curse.id}`)}>
                <p className="py-2 text-2xl">{curse.title}</p>
                <img src={curse.image} className="w-1/3" alt={curse.title}>
                </img>
            </div>
            <div className="text-2xl">
                {curse.price} рублей
            </div>
            <button
                className={btnClasses.join(' ')}
                onClick={() => setDetails(prev => !prev)}
            >
                {details ? "Hide Details" : "More Details"}</button>
            {details && <div>
                <p className="text-2xl">{curse.description}</p>
            </div> }
        </div>
    )
}