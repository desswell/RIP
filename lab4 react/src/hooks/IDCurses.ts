import {useEffect, useState} from "react";
import {ICurses} from "../models/models";
import axios from "axios";

interface IDCurses{
    ICurse: number
}

export function UseCurse(Props: IDCurses) {
    const [curse, setCurse] = useState<ICurses[]>([])
    async function fetchCurse(){
        const response = await axios.get<ICurses[]>(`http://127.0.0.1:8000/curses/${Props}/`)
        setCurse(response.data)
    }
    useEffect(() => {
        fetchCurse()
    }, [])
    return {curse}
}