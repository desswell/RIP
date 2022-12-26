import React, { useState} from 'react';
import '../style css/LogIn.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIsAuth, ChangeAuthAction } from '../slices/shoppingCartSlice';


export const AuthPage = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()
    const HandleClick = () => {
        fetch('/api/authorize/',{method : "POST", body: JSON.stringify({"username": login, "password": password})})
            .then((res) => res.json())
            .then((data) => {
                if(JSON.parse(data)["status"] === "ok"){
                    dispatch(ChangeAuthAction())
                    localStorage.setItem('login', login)
                    history.push('/')
                }
            });
    };
    if (!useIsAuth()) {
        return <div>
            <div className='RegWrapper'>
                <div className='RegCard'>
                    <div className="text1wrapper">
                        <div className="text1">
                            Вход
                        </div>
                    </div>
                    <input onChange={(event) => setLogin(event.target.value)} placeholder='Логин' type="text" className='InputField' />
                    <input onChange={(event) => setPassword(event.target.value)} placeholder='Пароль' type="password" className='InputField' />
                    <button className='buttonStyle'  onClick={HandleClick}>Войти</button>
                    <div className="text2wrapper">
                        <div className="text21">
                            У вас нет аккаунта?
                        </div>
                        <div className="text22">
                            <Link to={{pathname:"/registration"}} className="linkStyle">
                                Зарегистрироваться
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <div></div>
    }
};