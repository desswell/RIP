import React from "react";
import {useParams} from 'react-router-dom'
import {curses_data} from "../data/curses";
const CurseId = () => {
    const params = useParams()
    const UniqData = curses_data[params.id - 1]
    return(
        <div className="flex-1">
            <p className=" text-1xl text-lg">Страница курса {params.id} </p>
            <img src={UniqData.image} className="w-1/4"></img>
        </div>
    );
}

export default CurseId;