import {useEffect, useState} from "react";
import {ICurses} from "../models/models";
import axios, {AxiosError} from "axios";
import {setDataAction, useButton, usePrice} from "../slices/cursesSlice";
import { useDispatch } from "react-redux";

export function UseCurses() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const value = usePrice()
    const flag = useButton()
    async function fetchCurses() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<ICurses[]>(`http://127.0.0.1:8000/curses/?price_min=${value[0]}&price_max=${value[1]}`)
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
    }, [flag])


    return {error, loading}
}