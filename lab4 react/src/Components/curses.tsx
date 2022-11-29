import React, {useState} from 'react'
import {ICurses} from "../models";
import {useHistory} from 'react-router-dom';
interface CursesProps {
    curses: ICurses
}

export function Curses({curses}: CursesProps) {
    const [details, setDetails] = useState(false)
    const btnBgClasses = details ? 'bg-yellow-200': 'bg-blue-200'
    const btnClasses = ['py-1 px-4 border', btnBgClasses]
    const router = useHistory()
    return (
        <div
            className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <div  className="rounded flex flex-col items-center mb-2"
                  onClick={() => router.push(`/curses/${curses.id}`)}>
                <p>{curses.title}</p>
                <img src={curses.image} className="w-1/6" alt={curses.title}></img>
            </div>
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