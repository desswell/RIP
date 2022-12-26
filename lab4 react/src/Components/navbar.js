import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import Breadcrumbs from "../BreadCrumbs";
import {useIsAuth} from "../slices/shoppingCartSlice";
import {LogOut} from "../hooks/LogOut";

export function NavigationBar() {
    let login = localStorage.getItem('login')
    const flag = useIsAuth()
    useEffect(() => {
        login = localStorage.getItem('login')
    }, [flag])
    return(login === null ?
    <div className="h-50 p-100">
        <ul className="menu-main">
            <Link to="/">Главная </Link>
            <Link to="/curses">Курсы </Link>
            <Link to="/about">О сайте </Link>
            <Link to='/SighIn'> Войти или зарегистрироваться</Link>
        </ul>
        <div className="breadcrumbs">
            {<Breadcrumbs/>}
        </div>
    </div> :
            <div className="h-50 p-100 flex-auto">
                <ul className="menu-main">
                    <Link to="/">Главная </Link>
                    <Link to="/curses">Курсы </Link>
                    <Link to="/about">О сайте </Link>
                        <Link to="/userinfo">
                        Аккаунт
                        </Link>
                    {login === "admin" && <Link to="/stateOrder">
                        Состояния заказов
                    </Link>}
                    <div className="float-right text-2xl text-red-500">
                        <LogOut/>
                    </div>
                    <div className="float-right">
                        <Link to="/ShCart">
                            <FaShoppingCart size={20}/>
                        </Link>
                    </div>
                </ul>
                <div className="breadcrumbs">
                    {<Breadcrumbs/>}
                </div>
            </div>
    )
}