import axios from "axios";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {ChangeUserIdAction} from "../slices/shoppingCartSlice";

export function GetUser()
{
    const dispatch = useDispatch()
    async function getUser(username) {
        const resp = await axios.get(`http://127.0.0.1:8000/User/?username=${username}`)
        dispatch(ChangeUserIdAction(resp.data[0]['id']))
    }
    useEffect(() => {
       getUser(localStorage.getItem('login'))
    }, [])
}