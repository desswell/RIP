import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';



import '../style css/RegPage.css';

export const Registration = () => {


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()
    const HandleClick = () => {
        fetch('http://127.0.0.1:8000/api/user/create',{
            method : "POST",
            body: JSON.stringify({username: login, password : password})
        })
            .then((res) => res.json())
            .then((data) => {
                if(data["status"] === "ok"){
                    history.push("/SighIn")
                }
            });
    };
        return  <div>
            <div className='RegWrapper'>
                <div className='RegCard'>
                    <div className="text1wrapper">
                        <div className="text1">
                            Регистрация
                        </div>
                    </div>
                    <input onChange={(event) => setLogin(event.target.value)} placeholder='Логин' type="text" className='InputField' />
                    <input onChange={(event) => setPassword(event.target.value)} placeholder='Пароль' type="password" className='InputField' />
                    <button className='buttonStyle'  onClick={HandleClick}>Зарегистрироваться</button>
                    <div className="text2wrapper">
                        <div className="text21">
                            Уже есть аккаунт?
                        </div>
                        <div className="text22">
                            <Link to={{pathname:"/SighIn"}} className="linkStyle">
                                Войти
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
};