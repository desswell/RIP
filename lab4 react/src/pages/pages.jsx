import React from "react";
import {useParams} from 'react-router-dom'
import {UseCurse} from "../hooks/IDCurses";



const CurseId = () => {
    const params = useParams()
    const {curse} = UseCurse(params.id)
    return(
        <div className="flex-1">
            <p className=" text-1xl text-lg">Страница курса {curse.title} </p>
            <img src={curse.image} className="w-1/4"></img>
        </div>
    );
}

export default CurseId;