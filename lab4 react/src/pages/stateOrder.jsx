import React, {useEffect} from "react";
import {SOC} from "../Components/stateOrderComp";
import axios from "axios";
import {useDispatch} from "react-redux";
import {SetCursesAction, useCursesPerUser} from "../slices/userSlice";

const StateOrder = () => {
    const dispatch = useDispatch()
    async function fetchPurchase () {
        const response = await axios.get('http://127.0.0.1:8000/Purchase/')
        dispatch(SetCursesAction(response.data))
    }
    useEffect(() => {
        fetchPurchase()
    }, [])
    const data = useCursesPerUser()
    return(
        <div className="flex-1">
            {data.map((props) => <SOC props={props} key={props.id}/>)}
        </div>
    );
}

export default StateOrder;