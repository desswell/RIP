import {UserBought} from "../hooks/UserBought";


const UserInfo = () => {
    const {flag, boughCurses} = UserBought()
    console.log(boughCurses)
    return(
        <div>
            <div className="text-6xl"> Купленные курсы: </div>
            <div></div>
        </div>
    )
}

export default UserInfo