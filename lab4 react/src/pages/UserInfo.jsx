import {useEffect} from "react";
import {ChangeAuthAction} from "../slices/shoppingCartSlice";
import {useDispatch} from "react-redux";
import {SetCursesAction, useCursesPerUser} from "../slices/userSlice";


const UserInfo = () => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     fetch('api/curses/getForUser/',{method : "GET"})
    //         .then((res) => res.json())
    //         .then((data) => {
    //             dispatch(SetCursesAction(JSON.parse(data)))
    //             }
    //         );
    // }, [])
    const data = useCursesPerUser()
    console.log(data)
    return(
        <div>
            <div className="text-6xl"> Купленные курсы: </div>
            <div>

            </div>
        </div>
    )
}

export default UserInfo