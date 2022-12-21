import axios from "axios";
import { useUserId } from "../slices/shoppingCartSlice";
import {useEffect, useState} from "react";
import {GetUser} from "./GetUser";

export function UserBought () {
    GetUser()
    const [resp, setResp] = useState([])
    const id_user = useUserId()
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Purchase/?id_user=${id_user}&id_curse=`).then((response) => {
        if (response.data.length !== 0) {
            setFlag(true)
        }
            setResp(response.data)
    })}, [])
    console.log(resp)
    return {flag, resp}
}