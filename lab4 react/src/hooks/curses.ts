import {useEffect, useState} from "react";
import {ICurses} from "../models/models";
import axios, {AxiosError} from "axios";
import {setDataAction, useData} from "../slices/cursesSlice";
import { useDispatch } from "react-redux";

export function UseCurses() {
    const [curses, setCurses] = useState<ICurses[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const data = useData()
    async function fetchCurses() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<ICurses[]>("http://127.0.0.1:8000/curses/")
            setCurses(response.data)
            dispatch(setDataAction(response.data))
            setLoading(false)
        } catch (e: unknown){
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchCurses()

        setLoading(false)
    }, [])

    return {curses, error, loading}
}