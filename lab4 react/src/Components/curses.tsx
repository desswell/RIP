import React, {useState} from 'react'
import {ICurses} from "../models";
interface CursesProps {
    curses: ICurses
}

export function Curses({curses}: CursesProps) {
    const [details, setDetails] = useState(false)
    const btnBgClasses = details ? 'bg-yellow-200': 'bg-blue-200'
    const btnClasses = ['py-1 px-4 border', btnBgClasses]
    return (
        <div
            className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <p>{curses.title}</p>
            <img src={curses.image} className="w-1/6" alt={curses.title}></img>
            <button
                className={btnClasses.join(' ')}
                onClick={() => setDetails(prev => !prev)}
            >
                {details ? "Hide Details" : "More Details"}</button>
            {details && <div>
                <p>{curses.description}</p>
            </div> }
        </div>
    )
}