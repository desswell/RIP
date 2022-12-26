import axios from "axios";
import {useUserId} from "../slices/shoppingCartSlice";
import {useParams} from "react-router-dom";
import { useState } from "react";

export function BoughtCurses () {
    const id_user = useUserId()
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState([])
    const params = useParams()
        axios.get(`http://127.0.0.1:8000/Purchase/?id_user=${id_user}&id_curse=${params.id}`).then((response) => {
            if (response.data.length !== 0) {
                setFlag(true)
                setData(response.data[0]["status"])
            }
        })
    console.log(data)
    return {flag, data}
}
